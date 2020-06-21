import React, { useContext, useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Card, Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { IPost } from '../../../app/models/post';
import { IComment, CommentFormValues } from '../../../app/models/comment';

const validate = combineValidators({
	text: isRequired('Comment'),
});

interface IProps {
	post: IPost;
}

const PostComment: React.FC<IProps> = ({ post }) => {
	const rootStore = useContext(RootStoreContext);
	const { submitting, postComment } = rootStore.commentStore;
	const { currentUserId } = rootStore.userStore;

	const [comment, setComment] = useState(new CommentFormValues());

	const handleFinalFormSubmit = (values: any) => {
		const { ...comment } = values;
		let newComment: IComment = {
			...comment,
			userId: currentUserId,
			postId: post.id,
		};
		postComment(newComment);
		setComment({});
	};

	return (
		<Fragment>
			<Card key={post.id} className="card-item">
				<Card.Content>
					<FinalForm
						validate={validate}
						initialValues={comment}
						onSubmit={handleFinalFormSubmit}
						render={({ handleSubmit, invalid, pristine }) => (
							<Form onSubmit={handleSubmit}>
								<Field
									placeholder="Text"
									name="text"
									value={comment.text}
									component={TextInput}
								/>

								<Button
									loading={submitting}
									disabled={pristine || invalid}
									floated="right"
									positive
									type="submit"
									content="Submit"
								/>
							</Form>
						)}
					/>
				</Card.Content>
			</Card>
		</Fragment>
	);
};

export default observer(PostComment);
