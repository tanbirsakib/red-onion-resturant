import React, { Fragment, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import logo2 from "../../assets/logo2.png";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { addPaymentInfo } from "../../redux/cart/cart.action";

const StripeCheckoutButton = ({
	price,
	addInfo,
	cardInfo,
	cartItems,
	address,
}) => {
	const [token, setToken] = useState(null);
	const priceForStripe = price * 100;
	const publishableKey = "pk_test_UJgimWFlD8dpdPZsSJtE6CIu00Uy6IFRpZ";
	const onToken = (token) => {
		setToken(token);
		addInfo(token);
		const orderDetails = {
			userEmail: cardInfo && cardInfo.email,
			cart: cartItems,
			shipment: address,
			payment: cardInfo,
		};
		fetch("https://node-mongo-for-readonion.herokuapp.com/api/placeOrder", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderDetails),
		});
	};

	return (
		<Fragment>
			{token ? <Redirect to="/order-summery" /> : " "}
			<StripeCheckout
				label="Pay Now"
				name="Red Onion"
				billingAddress
				shippingAddress
				image={logo2}
				description={`Your Total is $${price}`}
				amount={priceForStripe}
				panelLabel="Pay Now"
				token={onToken}
				stripeKey={publishableKey}
			/>
		</Fragment>
	);
};
const mapStateToProps = (state) => ({
	cardInfo: state.cart.paymentInfo,
	cartItems: state.cart.cartItems,
	address: state.cart.deliveryDetails,
});
const mapDispatchToProps = (dispatch) => ({
	addInfo: (info) => dispatch(addPaymentInfo(info)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StripeCheckoutButton);
