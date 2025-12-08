import axios from "axios";
import {
	ADD_TO_CART,
	UPDATE_CART_ITEM,
	REMOVE_ITEM_CART,
	FETCH_CART,
	CLEAR_CART,
} from "../constants/cartConstant";



export const fetchCartItems = (alert) => async (dispatch) => {

	try {
		const response = await axios.get("/api/v1/eats/cart/get-cart");
		dispatch({
			type: FETCH_CART,
			payload: response.data.data,
		});
	} catch (err) {
		console.error("Fetch Cart Error", err);
		if (alert) {
			alert.info("Cart is hungry, please add some items to it");
		}
	}
};

//Add to Cart

export const addItemToCart =
	(foodItemId, restaurant, quantity, alert) => async (dispatch, getState) => {
		try {
			const { user } = getState().auth;
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await axios.post(
				"/api/v1/eats/cart/add-to-cart",
				{ userId: user._id, foodItemId, restaurantId: restaurant, quantity },
				config
			);
			alert.success("Item added to cart successfully", response.data.cart);
			dispatch({
				type: ADD_TO_CART,
				payload: response.data.cart,
			});
		} catch (err) {
			console.error("Add to Cart Error", err);
			alert.error(err.response?err.response.data.message:err.message);
		}
	};

//Update Cart Item
export const updateCartQuantity =
	(fooditemId, quantity, alert) => async (dispatch, getState) => {
		try {
			const { user } = getState().auth;
            if(typeof(fooditemId)==='object'){
                fooditemId = fooditemId._id;
            }
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await axios.post(
				`/api/v1/eats/cart/update-cart-item`,
				{ userId: user._id, foodItemId: fooditemId, quantity },
				config
			);
			alert.success("Cart updated successfully", response.data.cart);
			dispatch({
				type: UPDATE_CART_ITEM,
				payload: response.data.cart,
			});
		} catch (err) {
			console.error("Update Cart Item Error", err);
			alert.error(err.response?err.response.data.message:err.message);
		}
	};

//Remove Item from Cart

export const removeItemFromCart = (foodItemId) => async (dispatch, getState) => {
  
	try {
        const { user } = getState().auth;
        if(typeof(fooditemId)==='object'){
            foodItemId = foodItemId._id;
        }
        const response = await axios.delete(
            `/api/v1/eats/cart/delete-cart-item/`,
            { data: { userId: user._id, foodItemId: foodItemId }, }
        );
        alert.success("Item removed from cart successfully", response.data.cart);
        dispatch({
            type: REMOVE_ITEM_CART,
            payload: response.data.cart,
        });
    } catch (err) {
        console.error("Remove Item Error", err);
        alert.error(err.response?err.response.data.message:err.message);
    }
}

export const clearCart = () => async (dispatch, getState) => {
	try {
		const { user } = getState().auth;
		const response = await axios.delete(
			`/api/v1/eats/cart/clear-cart/`,
			{ data: { userId: user._id } }
		);
		alert("Cart cleared successfully", response.data.cart);
		dispatch({
			type: CLEAR_CART,
			payload: response.data.cart,
		});
	} catch (err) {
		console.error("Clear Cart Error", err);
		alert(err.response?err.response.data.message:err.message);
	}
};