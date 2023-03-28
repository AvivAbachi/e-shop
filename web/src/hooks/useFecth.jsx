import { useReducer } from 'react';

const types = {
	GET_REQUEST: 'GET_REQUEST',
	GET_SUCCESS: 'GET_SUCCESS',
	GET_FAIL: 'GET_FAIL',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case types.GET_REQUEST:
			return { ...state, loading: true };
		case types.GET_SUCCESS:
			return { ...state, data: payload, loading: false };
		case types.GET_FAIL:
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
};

function useFecth() {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		error: '',
		data: null,
	});

	const getData = async (onFetch) => {
		dispatch({ type: types.GET_REQUEST });
		try {
			const res = await onFetch();
			dispatch({ type: types.GET_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: types.GET_FAIL, payload: error.message });
		}
	};

	return [state, getData];
}

export default useFecth;
