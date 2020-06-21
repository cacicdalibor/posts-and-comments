import { RootStore } from './rootStore';
import { IPost } from '../models/post';
import { observable, action, runInAction, computed } from 'mobx';
import agent from '../api/agent';

export default class postStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable postsRegistry = new Map<number, IPost>();
	@observable post: IPost | undefined = undefined;
	@observable loadingInitial = false;
	@observable postsCount = 0;
	@observable requiredPostsUpdate = false;
	@observable postsLikesCount = 0;

	@computed get listPosts() {
		return Array.from(this.postsRegistry.values());
	}

	@action getLikeCount = () => {
		const posts = this.listPosts;
		if (posts) {
			this.postsLikesCount = 0;
			posts.forEach((post) => {
				this.postsLikesCount += post.likes;
			});
		}
		return this.postsLikesCount;
	};

	@action likeComment = (id: number) => {
		const post = this.getPost(id);
		if (post) {
			post.liked = true;
			post.likes += 1;
			this.postsRegistry.set(id, post);
			this.getLikeCount();
		}
	};

	@action updatePosts = (posts: IPost[]) => {
		posts.forEach((post) => {
			this.postsRegistry.set(post.id, post);
			this.loadingInitial = false;
		});
	};

	@action loadPostRepeatedly = async (period: number) => {
		await agent.Posts.list().then((posts) => {
			if (this.postsCount !== posts.length) {
				this.requiredPostsUpdate = true;
			}

			setTimeout(() => this.loadPostRepeatedly(period), period);
		});
	};

	@action loadPosts = async () => {
		this.loadingInitial = true;
		try {
			const posts = await agent.Posts.list();

			runInAction('Loading posts', () => {
				this.postsCount = posts.length;
				this.updatePosts(posts);
				this.getLikeCount();
			});
		} catch (error) {
			runInAction('Loading posts error', () => {
				this.loadingInitial = false;
			});
			console.log(error);
		}
	};

	@action loadPost = async (id: number) => {
		this.loadingInitial = true;
		let post = this.getPost(id);
		if (post) {
			this.post = post;
			this.loadingInitial = false;
			return post;
		} else {
			try {
				const posts = await agent.Posts.list();
				runInAction('getting post', () => {
					this.post = posts.find((p) => p.id === id);
					this.loadingInitial = false;
				});
				return post;
			} catch (error) {
				runInAction('get post error', () => {
					this.loadingInitial = false;
				});
				console.log(error);
			}
		}
	};

	getPost = (id: number) => {
		return this.postsRegistry.get(id);
	};
}
