import React, { useEffect } from "react";
import "./cart.style.css";
import { connect } from "react-redux";
import CartItem from "../cart-item/CartItem";
import StripeCheckoutButton from "../utilis/StripeCheckoutButton";

const Cart = ({ cart, address }) => {
	// Calculate
	const subTotal = Math.floor(
		cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
	);
	const tax = Math.floor((subTotal * 10) / 100);
	const deliveryFee = Math.floor((subTotal * 20) / 100);
	const total = Math.floor(subTotal + tax + deliveryFee);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className="cart-wrapper">
			<div className="shipment-address">
				<p>
					To <span>{address && address.houseName}</span>
				</p>
				<p>
					{address && address.roadNo}
					{address && address.policeStation}
				</p>
				<p>{address && address.city}</p>
			</div>
			<div className="cart-items">
				{cart && cart.map((item, i) => <CartItem key={i} item={item} />)}
			</div>
			<div className="cart-calculate">
				<ul>
					<li>
						<span>Subtotal {cart && cart.length} item</span>
						<span>$ {subTotal}</span>
					</li>
					<li>
						<span>Tax 10% </span>
						<span>$ {tax}</span>
					</li>
					<li>
						<span>Delivery fee </span>
						<span>$ {deliveryFee}</span>
					</li>
					<li className="highlight">
						<span>Total</span>
						<span>$ {total}</span>
					</li>
				</ul>
			</div>
			{!address ? (
				<button className="place-order-btn" disabled={true}>
					Enter Your Address
				</button>
			) : (
				<button className="inCartActive place-order-btn" disabled={false}>
					<StripeCheckoutButton price={total} />
				</button>
			)}

			<div className="test-warning">
				* Please use the following test credit card for payments*
				<br />
				4242 4242 4242 4242 -Exp : 01/2022 -CW:123
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart.cartItems,
	address: state.cart.deliveryDetails,
});

export default connect(mapStateToProps)(Cart);
