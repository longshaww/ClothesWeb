module.exports = {
    getCartUtil: (thisSession) => {
        const cart = thisSession.cart;
        const cartQty = cart.reduce((a, b) => {
            return a + b.qty;
        }, 0);
        const cartTotal = cart.reduce((a, b) => {
            return a + b.price * b.qty;
        }, 0);
        return { success: true, cart, cartTotal, cartQty };
    },
    calculateOrderAmount: (items) => {
        const reduce =
            items.reduce((a, b) => {
                return a + b.sum;
            }, 0) / 23;
        const total = parseInt(reduce.toFixed(2).replace('.', ''));
        return total;
    }
};
