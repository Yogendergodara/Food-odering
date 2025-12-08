import React from "react";
import Search from "./Search";
import {Link} from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";

const Header = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state) => state.auth);
	const logoutHandler = () => {
		dispatch(logout());
		alert.success("logged Out Successfully");
	};
	const {cartItems} = useSelector(state=>state.cart);

	return (
		<nav className="navbar row sticky-top">
			<div className="col-12 col-md-3">
				<div className="navbar-brand">
					<Link to="/">
						<img className="logo" src="/images/logo.webp" alt="OrderIT" />
					</Link>
				</div>
			</div>
			{/* Search Bar and Search Icon */}
			<div className="col-12 col-md-6 mt-2 mt-md-0">
				<Search />
			</div>
			<div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
				<Link to={"/cart"} style={{textDecoration:"none"}} >
				
				<span id="cart" className="ml-3">
					Cart
				</span>
				<span className="ml-1" id="cart_count">
					{cartItems.length}
				</span>
				</Link>
				{/* Login Button */}
				{user ? (
					<>
						<div className="ml-4 dropdown d-inline">
							<Link
								className="btn dropdown-toggle text-white mr-4"
								type="button"
								id="dropDownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<figure className="avatar avatar-nav">
									<img
										src={user.avatar && user.avatar.url}
										alt="avatar"
										className="rounded-circle"
									/>
								</figure>
								<span>{user && user.name}</span>
							</Link>

							<div
								className="dropdown-menu"
								aria-labelledby="dropDownMenuButton"
							>
								<Link className="dropdown-item" to="/eats/orders/me/myOrders">
									order
								</Link>
								<Link className="dropdown-item" to="/users/me">
									Profile
								</Link>
								<Link className="dropdown-item" to="/" onClick={logoutHandler}>
									Logout
								</Link>
							</div>

							{/* <figure className="avatar avatar-nav">
								<img
									src="/images/images.png"
									alt="Avatar"
									className="rounded-circle"
								/>
							</figure>
                            <span style={{color:"white",fontWeight:"bolder"}}>Harsh</span> */}
						</div>
					</>
				) : !loading ? (
					<Link to="/users/login" className="btn ml-4" id="login_btn">
						Login
					</Link>
				) : null}
			</div>
		</nav>
	);
};

export default Header;
