import { RootStore } from './rootStore';
import { IPost } from '../models/post';
import { observable, action, runInAction, computed } from 'mobx';
import { IComment } from '../models/comment';
import agent from '../api/agent';
import { IUserComment } from '../models/userComment';

export default class commentStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable commentsRegistry = new Map<number, IComment>();
	@observable post: IPost | undefined = undefined;
	@observable loadingCommentsInitial = false;
	@observable commentCount = 0;
	@observable submitting = false;
	@observable userComments: IUserComment[] | undefined = undefined;

	@computed get listComments() {
		return Array.from(this.commentsRegistry.values());
	}

	@action getCurrentUserCommentCount = (userId: number) => {
		const comments = this.listComments;
		if (comments) {
			this.commentCount = 0;
			comments.forEach((comment) => {
				if (comment.userId === userId) this.commentCount += 1;
			});
		}
		return this.commentCount;
	};

	@action postComment = (comment: IComment) => {
		this.submitting = true;
		const id = this.listComments.length + 1;
		this.commentsRegistry.set(id, comment);
		this.getCurrentUserCommentCount(comment.userId);
		this.submitting = false;

		const post = this.rootStore.postStore.getPost(comment.postId);

		if (post) {
			post.comments.push(comment);
		}
	};

	@action updateComments = (comments: IComment[]) => {
		comments.forEach((comment) => {
			this.commentsRegistry.set(comment.id, comment);
			this.loadingCommentsInitial = false;
		});
	};

	@action loadComments = async () => {
		this.loadingCommentsInitial = true;
		try {
			const posts = await agent.Posts.list();

			runInAction('Loading comments', () => {
				posts.forEach((post) => {
					if (post.comments) this.updateComments(post.comments);
					this.getCurrentUserCommentCount(
						this.rootStore.userStore.currentUserId
					);
				});
				this.loadUserComments();
			});
		} catch (error) {
			runInAction('Loading posts error', () => {
				this.loadingCommentsInitial = false;
			});
			console.log(error);
		}
	};

	@action setUserComments = (comments: IComment[]) => {
		let userComments: IUserComment[] = [];

		comments.forEach((c) => {
			if (c.userId === this.rootStore.userStore.currentUserId)
				userComments.push({
					id: c.id,
					text: c.text,
					created: c.created,
					postName: this.rootStore.postStore.getPost(c.postId)!.title,
				});
		});

		this.userComments = userComments;
	};

	@action loadUserComments = async () => {
		this.loadingCommentsInitial = true;
		const comments = this.listComments;
		if (comments.length > 0) {
			this.setUserComments(comments);
		}
	};
}
