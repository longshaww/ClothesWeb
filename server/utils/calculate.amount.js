module.exports = calculateOrderAmount = (items) => {
	const reduce =
		items.reduce((a, b) => {
			return a + b.sum;
		}, 0) / 23;
	const total = parseInt(reduce.toFixed(2).replace(".", ""));
	return total;
};
