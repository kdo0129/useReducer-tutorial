import React, { useRef, useMemo, useCallback, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

const countActiveUsers = (users) => {
	console.log('카운트');
	return users.filter((user) => user.active).length;
};

const initialState = {
	users: [
		{
			id: 1,
			username: 'Kim',
			age: 20,
			active: false,
		},
		{
			id: 2,
			username: 'Lee',
			age: '30',
			active: false,
		},
		{
			id: 3,
			username: 'Choi',
			age: '50',
			active: false,
		},
	],
	inputs: {
		username: '',
		age: '',
	},
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_INPUT':
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.name]: action.value,
				},
			};
		case 'CREATE_USER':
			return {
				inputs: initialState.inputs,
				users: [...state.users, action.user],
			};
		case 'REMOVE_USER':
			return {
				...state,
				users: state.users.filter((user) => {
					return user.id !== action.id;
				}),
			};
		case 'TOGGLE_USER':
			return {
				...state,
				users: state.users.map((user) => {
					return user.id === action.id
						? { ...user, active: !user.active }
						: user;
				}),
			};
		default:
			return state;
	}
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { users } = state;
	const { username, age } = state.inputs;

	const nextId = useRef(4);

	const onInputChange = useCallback((e) => {
		const { name, value } = e.target;
		dispatch({ type: 'CHANGE_INPUT', name, value });
	}, []);

	const onCreate = useCallback(
		(id) => {
			dispatch({
				type: 'CREATE_USER',
				user: { id: nextId.current, username, age },
			});
			nextId.current += 1;
		},
		[username, age],
	);

	const onRemove = useCallback((id) => {
		dispatch({ type: 'REMOVE_USER', id });
	}, []);

	const onToggle = useCallback((id) => {
		dispatch({ type: 'TOGGLE_USER', id });
	}, []);

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<div>
			<CreateUser
				username={username}
				age={age}
				onChange={onInputChange}
				onCreate={onCreate}
			/>
			<div>activeUser : {count}</div>
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
		</div>
	);
}
