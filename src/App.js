import React, { useMemo, useReducer, createContext } from 'react';
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

//UserDispatch Context 생성
export const UserDispatch = createContext(null);

export default function App() {
	// const [{ username, age }, onChange, reset] = useInput({
	// 	username: '',
	// 	age: '',
	// });

	const [state, dispatch] = useReducer(reducer, initialState);

	const { users } = state;

	// const nextId = useRef(4);

	// const onCreate = useCallback(
	// 	(id) => {
	// 		dispatch({
	// 			type: 'CREATE_USER',
	// 			user: { id: nextId.current, username, age },
	// 		});
	// 		nextId.current += 1;
	// 		reset();
	// 	},
	// 	[username, age, reset],
	// );

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		// provider로 감싸고 내부 컴포넌트에서 context 값 사용
		<UserDispatch.Provider value={dispatch}>
			<CreateUser />
			<div>activeUser : {count}</div>
			<UserList users={users} />
		</UserDispatch.Provider>
	);
}
