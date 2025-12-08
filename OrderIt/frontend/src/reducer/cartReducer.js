import {
	ADD_TO_CART,
	FETCH_CART,
	REMOVE_ITEM_CART,
	UPDATE_CART_ITEM,
	CLEAR_CART,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				restaurant: action.payload.restaurant,
				cartItems: action.payload.items,
			};

		case FETCH_CART:
			return {
				...state,
				restaurant: action.payload.restaurant,
				cartItems: action.payload.items,
			};

		case REMOVE_ITEM_CART:
			if (action.payload.cart === undefined) {
				return { ...state, cartItems: [] };
			} else {
				return {
					...state,
					restaurant: action.payload.restaurant,
					cartItems: action.payload.items,
				};
			}
		case UPDATE_CART_ITEM:
			return {
				...state,
			};
		case CLEAR_CART:
			return {
				...state,
				cartItems: [],
			};
		default:
			return state;
	}
};
