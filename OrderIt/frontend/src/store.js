import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from "redux";
import thunk from "redux-thunk";
import { restaurantReducer } from "./reducer/restaurantReducer";
import { authReducer } from "./reducer/userReducer";
import { menuReducer } from "./reducer/menuReducer";
import { userReducer, forgotPasswordReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";

const reducer = combineReducers({
	// your reducers here
	restaurants: restaurantReducer,
	menus : menuReducer,
	auth: authReducer,
	user: userReducer,
	forgotPassword: forgotPasswordReducer,
	cart : cartReducer,
});
const composeenhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export const store = createStore(
	reducer,
	composeenhancer(applyMiddleware(...middleware))
);
export default store;
