import { IComment } from './comment';

export interface IPost {
	id: number;
	title: string;
	description: string;
	likes: number;
	liked: boolean;
	comments: IComment[];
}
