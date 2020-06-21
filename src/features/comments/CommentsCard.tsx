import React from 'react';
import { observer } from 'mobx-react-lite';
import { IUserComment } from '../../app/models/userComment';
import { Card } from 'semantic-ui-react';

interface IProps {
	userComments: IUserComment[];
}

const CommentsCard: React.FC<IProps> = ({ userComments }) => {
	return (
		<Card.Group>
			{userComments &&
				userComments.map((uc) => (
					<Card key={uc.id}>
						<Card.Content>
							<Card.Description>
								<b>comment:</b> <br />
								{uc.text}
							</Card.Description>
							<Card.Description>
								<b>post:</b> <br />
								{uc.postName}
							</Card.Description>
							<Card.Description>
								<b>created:</b> <br />
								{uc.created}
							</Card.Description>
						</Card.Content>
					</Card>
				))}
		</Card.Group>
	);
};

export default observer(CommentsCard);
