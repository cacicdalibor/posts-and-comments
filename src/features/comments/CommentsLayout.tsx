import React, { Fragment, useEffect, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import Navigation from '../navigation/Navigation';
import { observer } from 'mobx-react-lite';
import CommentsCard from './CommentsCard';
import { RootStoreContext } from '../../app/stores/rootStore';

const CommentsLayout = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadPosts, loadPostRepeatedly } = rootStore.postStore;
	const {
		loadComments,
		loadUserComments,
		userComments,
	} = rootStore.commentStore;

	useEffect(() => {
		loadPosts();
		loadComments();
		loadUserComments();
	}, [loadPosts, loadComments, loadPostRepeatedly, loadUserComments]);

	return (
		<Fragment>
			<Grid className="primary-section-heading">
				<Grid.Column width={16}>
					<Navigation />
				</Grid.Column>

				<Grid.Column width={16}>
					{userComments && <CommentsCard userComments={userComments} />}
				</Grid.Column>
			</Grid>
		</Fragment>
	);
};

export default observer(CommentsLayout);
