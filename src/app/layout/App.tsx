import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import {
	Route,
	withRouter,
	RouteComponentProps,
	Switch,
} from 'react-router-dom';
import NotFound from '../layout/NotFound';
import { ToastContainer } from 'react-toastify';
import PostsLayout from '../../features/posts/list/PostsLayout';
import CommentsLayout from '../../features/comments/CommentsLayout';

const App: React.FC<RouteComponentProps> = ({ location }) => {
	return (
		<Fragment>
			<ToastContainer position="bottom-right" />
			<Route exact path="/" component={PostsLayout} />
			<Route
				path={'/(.+)'}
				render={() => (
					<Fragment>
						<Grid divided="vertically" relaxed>
							<Grid.Column className="main-content" width={16}>
								<Switch>
									<Route path="/comments" exact component={CommentsLayout} />

									<Route component={NotFound} />
								</Switch>
							</Grid.Column>
						</Grid>
					</Fragment>
				)}
			/>
		</Fragment>
	);
};

export default withRouter(observer(App));
