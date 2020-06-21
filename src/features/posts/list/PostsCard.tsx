import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button } from 'semantic-ui-react';
import { IPost } from '../../../app/models/post';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PostComment from './PostComment';

interface IProps {
	posts: IPost[];
}

const PostsCard: React.FC<IProps> = ({ posts }) => {
	const rootStore = useContext(RootStoreContext);
	const { likeComment } = rootStore.postStore;

	return (
		<Card.Group>
			{posts.map((post) => (
				<Card key={post.id} fluid>
					<Card.Content>
						<Card.Header>{post.title}</Card.Header>
						<div style={{ float: 'right' }}>
							{post.likes}
							<Button
								color="blue"
								content="Like"
								disabled={post.liked}
								onClick={() => likeComment(post.id)}
								style={{ marginLeft: '22px' }}
							/>
						</div>
					</Card.Content>
					<Card.Content>
						<Card.Description>{post.description}</Card.Description>
						<Card.Description>
							<br />
							<br />
							<PostComment post={post} />
						</Card.Description>
						<Card.Description>
							<br />
							<br />
							<br />
							Comments:
							{post.comments &&
								post.comments.map((c) => (
									<Fragment key={c.id + c.text}>
										<div>{c.text}</div>
										<div>Date: {c.created}</div>
										<hr />
									</Fragment>
								))}
						</Card.Description>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	);
};

export default observer(PostsCard);
