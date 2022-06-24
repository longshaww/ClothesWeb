module.exports = function getCartUtil(thisSession) {
	const cart = thisSession.cart;
	const cartQty = cart.reduce((a, b) => {
		return a + b.qty;
	}, 0);
	const cartTotal = cart.reduce((a, b) => {
		return a + b._id.price * b.qty;
	}, 0);
	return { success: true, cart, cartTotal, cartQty };
};
