import { format } from 'date-fns';

export interface IComment {
	id: number;
	text: string;
	created: string;
	postId: number;
	userId: number;
}

export interface ICommentFormValues extends Partial<IComment> {}

export class CommentFormValues implements ICommentFormValues {
	text?: string = undefined;
	created?: string = format(new Date(), 'yyyy/mm/dd');
	postId?: number = undefined;
	userId?: number = undefined;

	constructor(init?: ICommentFormValues) {
		Object.assign(this, init);
	}
}
