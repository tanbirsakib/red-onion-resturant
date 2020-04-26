import {
	GET_DELIVERY_DETAILS,
	ADD_ITEM,
	REMOVE_ITEM,
	CLEAR_ITEM_FROM_CART,
	PAYMENT_INFO,
} from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";
const INITIAL_STATE = {
	deliveryDetails: null,
	cartItems: [],
	paymentInfo: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_DELIVERY_DETAILS:
			return {
				...state,
				deliveryDetails: action.payload,
			};
		case ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload),
			};
		case REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload),
			};
		case CLEAR_ITEM_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.id !== action.payload.id),
			};
		case PAYMENT_INFO:
			return {
				...state,
				paymentInfo: action.payload,
			};
		default:
			return state;
	}
};

export default cartReducer;
