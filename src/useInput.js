import { useState, useCallback } from 'react';

const useInput = (initialInputState) => {
	const [inputState, setInputState] = useState(initialInputState);

	const onChange = useCallback((e) => {
		const { name, value } = e.target;
		setInputState((inputState) => ({
			...inputState,
			[name]: value,
		}));
	}, []);

	const reset = useCallback(() => {
		setInputState(initialInputState);
	}, [initialInputState]);
	return [inputState, onChange, reset];
};

export default useInput;
