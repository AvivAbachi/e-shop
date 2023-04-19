import { useEffect, useReducer } from 'react';

const initState = {
	data: undefined,
	error: '',
	loading: false,
};

const actions = {
	GET_REQUEST: 'GET_REQUEST',
	GET_SUCCESS: 'GET_SUCCESS',
	GET_FAIL: 'GET_FAIL',
};

const reducer = (state = initState, { type, payload }) => {
	switch (type) {
		case actions.GET_REQUEST:
			return { ...state, loading: true };
		case actions.GET_SUCCESS:
			return { ...state, data: payload, loading: false };
		case actions.GET_FAIL:
			return { ...state, error: String(payload), loading: false };
		default:
			return state;
	}
};

function useFecth(onFetch, params) {
	const [state, dispatch] = useReducer(reducer, initState);

	useEffect(() => {
		const getData = async () => {
			dispatch({ type: actions.GET_REQUEST });
			try {
				const res = await onFetch(params);
				dispatch({ type: actions.GET_SUCCESS, payload: res.data });
			} catch (error) {
				dispatch({ type: actions.GET_FAIL, payload: error.message });
			}
		};
		if (onFetch) getData();
	}, [onFetch, params]);

	return state;
}

export default useFecth;
