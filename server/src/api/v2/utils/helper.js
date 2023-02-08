const { BOTTOMS, ACCESSORIES, NEWARRIVALS, OUTERWEARS, TOPS } = require('../../../config/env');
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
    },
    returnIdCollection: (nameCollection) => {
        switch (nameCollection) {
            case 'new-arrivals':
                return NEWARRIVALS;
            case 'tops':
                return TOPS;
            case 'bottoms':
                return BOTTOMS;
            case 'outerwears':
                return OUTERWEARS;
            case 'accessories':
                return ACCESSORIES;

            default:
                return null;
        }
    },
    filterQty: async (listProduct) => {
        const list = [];
        await listProduct.forEach(async (el) => {
            if (el.size[0].qty === 0 && el.size[1].qty === 0 && el.size[2].qty === 0) {
                return;
            } else {
                await list.push(el);
            }
        });
        return list;
    },
    analystVip: async (moneyPayed) => {
        const money = moneyPayed;
        switch (true) {
            case money < 500:
                return 'Bronze';
            case (money >= 500) & (money < 1000):
                return 'Silver';
            case money >= 1000 && money < 5000:
                return 'Gold';
            case money > 5000:
                return 'Platinum';
            default:
                return 'Bronze';
        }
    },
};
