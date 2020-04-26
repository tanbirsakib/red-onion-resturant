import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./product-detail.style.css";
import { useParams } from "react-router-dom";
import { addItem, removeItem } from "../../redux/cart/cart.action";
import { PulseLoaderSpinner } from "../../components/utilis/Spinner";

const ProductDetail = ({ cart, addToCart, minusItem }) => {
	const { productID } = useParams();
	const [product, setProduct] = useState({
		loading: true,
		productInfo: [],
	});

	//GET TARGET ITEM
	useEffect(() => {
		fetch(
			`https://node-mongo-for-readonion.herokuapp.com/api/product/${productID}`
		)
			.then((res) => res.json())
			.then((data) => {
				setProduct({ loading: false, productInfo: data });
			});
	}, [productID]);

	const updateQty = cart.find((x) => x.id.toString() === productID.toString());

	const { name, imageUrl, description, price } = product.productInfo;

	return product.loading === true ? (
		<PulseLoaderSpinner loading={product.loading} />
	) : (
		<div className="product-details-page">
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="product-detail-content">
							<h1>{name}</h1>
							<p>{description}</p>
							<div className="product-detail-price">
								<h2>
									$ <span>{price}</span>
								</h2>
								<div className="product-detail-qty">
									<button
										onClick={() => minusItem(product.productInfo)}
										disabled={!updateQty ? true : false}>
										-
									</button>
									<span>
										{updateQty && updateQty.quantity ? updateQty.quantity : 0}
									</span>
									<button onClick={() => addToCart(product.productInfo)}>
										+
									</button>
								</div>
							</div>
							<div className="add-cart">
								<button onClick={() => addToCart(product.productInfo)}>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="product-detail-thumbnail">
							<img src={imageUrl} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
	addToCart: (item) => dispatch(addItem(item)),
	minusItem: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
