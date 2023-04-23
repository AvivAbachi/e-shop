import { createContext, useReducer } from 'react';

export const Store = createContext();

export const actions = {
	ADD_TO_CART: 'ADD_TO_CART',
	REMOVE_FROM_CART: 'REMOVE_FROM_CART',
	CLEAR_CART: 'CLEAR_CART',
	USER_SIGNIN: 'USER_SIGNIN',
	USER_SIGNOUT: 'USER_SIGNOUT',
	SAVE_SHIPPING_ADDRESS: 'SAVE_SHIPPING_ADDRESS',
	SAVE_PAYMENT_METHOD: 'SAVE_PAYMENT_METHOD',
};

const initialState = {
	cart: {
		shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
		cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
		paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : '',
	},
	userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_TO_CART: {
			const existingItem = state.cart.cartItems.find((item) => item._id === payload._id);
			const cartItems = existingItem
				? state.cart.cartItems.map((item) => (item._id === existingItem._id ? payload : item))
				: [...state.cart.cartItems, payload];
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}

		case actions.REMOVE_FROM_CART: {
			const cartItems = state.cart.cartItems.filter((item) => item._id !== payload._id);
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case actions.CLEAR_CART: {
			localStorage.removeItem('cartItems');
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		}
		case actions.USER_SIGNIN: {
			localStorage.setItem('userInfo', JSON.stringify(payload));
			return { ...state, userInfo: payload };
		}

		case actions.USER_SIGNOUT: {
			localStorage.removeItem('userInfo');
			localStorage.removeItem('shippingAddress');
			localStorage.removeItem('paymentMethod');
			return { ...state, userInfo: null, cart: { cartItems: [], shippingAddress: {} } };
		}

		case actions.SAVE_SHIPPING_ADDRESS: {
			localStorage.setItem('shippingAddress', JSON.stringify(payload));
			return { ...state, cart: { ...state.cart, shippingAddress: payload } };
		}

		case actions.SAVE_PAYMENT_METHOD: {
			localStorage.setItem('paymentMethod', payload);
			return { ...state, cart: { ...state.cart, paymentMethod: payload } };
		}

		default: {
			return state;
		}
	}
};

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}
