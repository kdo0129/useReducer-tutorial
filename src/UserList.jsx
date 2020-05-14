import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(({ user }) => {
	const dispatch = useContext(UserDispatch);
	const { active, age, username, id } = user;
	return (
		<>
			<div>
				<span
					style={{
						cursor: 'pointer',
						color: active ? 'red' : '#000',
					}}
					onClick={() => dispatch({ type: 'TOGGLE_USER', id })}
				>
					username: {username}, age: {age}
				</span>
				<button
					onClick={() => {
						dispatch({
							type: 'REMOVE_USER',
							id,
						});
					}}
				>
					삭제
				</button>
			</div>
		</>
	);
});

const UserList = ({ users }) => {
	console.log('UserList 렌더링');
	return (
		<>
			{users.map((user) => {
				return <User user={user} key={user.id} />;
			})}
		</>
	);
};

export default React.memo(UserList);
