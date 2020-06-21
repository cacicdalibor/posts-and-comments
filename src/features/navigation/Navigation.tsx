import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useLocation, Link } from 'react-router-dom';

const Navigation = () => {
	const [location] = useState(useLocation());

	return (
		<div style={{ paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>
			<Button
				content="Posts"
				active={location.pathname === '/'}
				as={Link}
				to="/"
			/>
			<Button
				content="Comments"
				active={location.pathname === '/comments'}
				as={Link}
				to="/comments"
			/>
		</div>
	);
};

export default Navigation;
