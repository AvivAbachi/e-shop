import { createContext, useReducer } from 'react';

export const Store = createContext();

export const storeTypes = {
	ADD_TO_CART: 'ADD_TO_CART',
	REMOVE_FROM_CART: 'REMOVE_FROM_CART',
	USER_SIGNIN: 'USER_SIGNIN',
};

const initialState = {
	cart: {
		cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
	},
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case storeTypes.ADD_TO_CART:
			const newItem = payload;
			const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id);
			const cartItems = existingItem
				? state.cart.cartItems.map((item) => (item._id === existingItem._id ? newItem : item))
				: [...state.cart.cartItems, newItem];
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };

		case storeTypes.REMOVE_FROM_CART: {
			const cartItems = state.cart.cartItems.filter((item) => item._id !== payload._id);
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}

		default:
			return state;
	}
};

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}
