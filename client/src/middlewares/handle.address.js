export function handleAddress(address) {
	const indexP = address.indexOf("Phường");
	const indexX = address.indexOf("Xã");
	if (indexP !== -1) {
		return address.slice(0, indexP).trim();
	}
	if (indexX !== -1) {
		return address.slice(0, indexX).trim();
	}
}
