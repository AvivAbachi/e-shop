import { useReducer, useRef } from 'react';

const initState = {
	data: null,
	error: '',
	loading: false,
};

const actions = {
	GET_REQUEST: 'GET_REQUEST',
	GET_SUCCESS: 'GET_SUCCESS',
	GET_FAIL: 'GET_FAIL',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case actions.GET_REQUEST:
			return { ...state, loading: true };
		case actions.GET_SUCCESS:
			return { ...state, data: payload, loading: false };
		case actions.GET_FAIL:
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
};

function useRequest() {
	const [state, dispatch] = useReducer(reducer, initState);

	const _onRequest = useRef(() => dispatch({ type: actions.GET_REQUEST }));
	const _onSuccess = useRef((data) => dispatch({ type: actions.GET_SUCCESS, payload: data }));
	const _onFail = useRef((error) => dispatch({ type: actions.GET_FAIL, payload: error }));

	return {
		...state,
		onRequest: _onRequest.current,
		onSuccess: _onSuccess.current,
		onFail: _onFail.current,
	};
}

export default useRequest;
