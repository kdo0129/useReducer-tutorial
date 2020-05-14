import React, { useContext, useRef } from 'react';
import useInput from './useInput';
import { UserDispatch } from './App';

const CreateUser = () => {
	console.log('createUser 렌더링');
	const [{ username, age }, onChange, reset] = useInput({
		username: '',
		age: '',
	});
	const nextId = useRef(4);
	const dispatch = useContext(UserDispatch);
	const onCreate = () => {
		dispatch({
			type: 'CREATE_USER',
			user: {
				username,
				age,
				id: nextId.current,
			},
		});
		reset();
		nextId.current += 1;
	};
	return (
		<>
			<input onChange={onChange} value={username} name="username" type="text" />
			<input onChange={onChange} value={age} name="age" type="number" />
			<button onClick={onCreate}>추가</button>
		</>
	);
};

export default React.memo(CreateUser);
