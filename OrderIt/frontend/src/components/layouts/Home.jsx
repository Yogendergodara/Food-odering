/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect } from "react";
import CountRestaurant from "./CountRestaurant";
import Restaurant from "./Restaurant";
import {getRestaurants,sortByReviews, sortByRatings,toggleVegOnly} from "../../actions/restaurantAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import Message from "../layouts/Message";

const Home = () => {
	const dispatch = useDispatch();
	const {
		loading: restauranstsLoading,
		error: restaurantsError,
		restaurants,
		showVegOnly,
	} = useSelector((state) => state.restaurants);

	useEffect(() => {
		dispatch(getRestaurants());
	}, [dispatch]);

	const handleSortByReview = () => {	
		dispatch(sortByReviews());
	};
	const handleSortByRating = () => {	
		dispatch(sortByRatings());
	};
	const handleToggleVegOnly = () => {
		dispatch(toggleVegOnly	());	
	};

	return (
		<div>
			<CountRestaurant />
			{restauranstsLoading ? (
				<Loader />
			) : restaurantsError ? (
				<Message variant="danger">{restaurantsError}</Message>
			) : (
				<>
					<section>
						<div className="sort">
							<button className="sort_veg p-3" onClick={handleToggleVegOnly}>
								{showVegOnly ? "Show All" : "Pure Veg"}
							</button>
							<button className="sort_rev p-3" onClick={handleSortByReview}>Sort By Review</button>
							<button className="sort_rate p-3" onClick={handleSortByRating}>Sort By Rating</button>
						</div>
						<div className="row mt-4">
							{restaurants
								? restaurants.map((restaurant) => (
									!showVegOnly || (showVegOnly && restaurant.isVeg) ? (
										<Restaurant key={restaurant._id} restaurant={restaurant} />
								  )
								: null)):(<Message variant="info">No Restaurants Found</Message>)}
								
						</div>
					</section>
				</>
			)}
		</div>
	);
};

export default Home;
