import { createContext } from 'react';
import { configure } from 'mobx';
import PostStore from './postStore';
import CommentStore from './commentStore';
import UserStore from './userStore';

configure({ enforceActions: 'always' });

export class RootStore {
	postStore: PostStore;
	commentStore: CommentStore;
	userStore: UserStore;

	constructor() {
		this.postStore = new PostStore(this);
		this.commentStore = new CommentStore(this);
		this.userStore = new UserStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
