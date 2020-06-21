import { RootStore } from './rootStore';
import { observable } from 'mobx';

export default class userStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable currentUserId = 20;
}
