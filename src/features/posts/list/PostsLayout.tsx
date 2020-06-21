import React, { useContext, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Grid, Button } from 'semantic-ui-react';
import PostsCard from './PostsCard';
import Navigation from '../../navigation/Navigation';

const PostsLayout = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		loadPosts,
		loadingInitial,
		listPosts,
		requiredPostsUpdate,
		loadPostRepeatedly,
		postsLikesCount,
	} = rootStore.postStore;
	const {
		loadComments,
		loadingCommentsInitial,
		commentCount,
	} = rootStore.commentStore;

	useEffect(() => {
		loadPosts();
		loadComments();
		loadPostRepeatedly(5000);
	}, [loadPosts, loadComments, loadPostRepeatedly]);

	if (loadingInitial) return <LoadingComponent content="Loading posts..." />;

	return (
		<Fragment>
			<Grid className="primary-section-heading">
				<Grid.Column width={16}>
					<Navigation />
				</Grid.Column>
				<Grid.Column width={6}>
					{requiredPostsUpdate && (
						<Button color="green" content="Reload" onClick={loadComments} />
					)}
				</Grid.Column>
				<Grid.Column width={5}>
					Likes: {!loadingCommentsInitial && postsLikesCount}
				</Grid.Column>
				<Grid.Column width={5}>
					Current User Comments: {!loadingCommentsInitial && commentCount}
				</Grid.Column>
				<Grid.Column width={16}>
					<PostsCard posts={listPosts} />
				</Grid.Column>
			</Grid>
		</Fragment>
	);
};

export default observer(PostsLayout);
