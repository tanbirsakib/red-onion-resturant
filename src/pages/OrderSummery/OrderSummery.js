import React from "react";
import "./OrderSummery-page.style.css";
import maps from "../../assets/maps.png";
import deliveryman from "../../assets/diliveryman.png";
import { connect } from "react-redux";

const OrderSummery = ({ currentUser, cart }) => {
	const { displayName, email, photoURL } = currentUser;
	const { houseName, roadNo, policeStation, city } = cart.deliveryDetails;
	return (
		<div className="order-summery-page">
			<div className="container">
				<div className="row">
					<div className="col-md-7">
						<div className="payment-info">
							<div className="alert alert-success" role="alert">
								Your Order successfully accepted
							</div>
							<div className="alert alert-info" role="alert">
								#Order ID : {cart.paymentInfo && cart.paymentInfo.id}
							</div>
						</div>
						<div className="map">
							<img src={maps} alt="" />
						</div>
					</div>
					<div className="col-md-5">
						<div className="order-summery">
							<div className="delivery-man-icon">
								<img src={deliveryman} alt="" />
							</div>
							<div className="order-address">
								<div className="client-location">
									<h5>
										Your Location{" "}
										<span>{`${roadNo} ${houseName} ${policeStation} ${city}`}</span>
									</h5>
								</div>
								<div className="shop-location">
									<h5>
										Shop Location <span>Gulistan Rd no 8</span>
									</h5>
								</div>
							</div>
							<div className="delivery-time">
								<h1>09.30</h1>
								<p>Estimate delivery time</p>
							</div>
							<div className="client-profile">
								<img
									src={photoURL ? photoURL : "https://placehold.it/50x50"}
									alt=""
								/>
								<h4>
									{displayName} <span>{email}</span>
								</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	cart: state.cart,
});

export default connect(mapStateToProps)(OrderSummery);
