export function formatPrice(price) {
	if (price.toString().includes(".")) {
		return price.toLocaleString() + "00 VND";
	}
	if (price === 0) {
		return price.toLocaleString() + " VNĐ";
	}
	return price.toLocaleString() + ".000 VNĐ";
}
