export const loaded = () => ({
	type: "LOADING",
	payload: false,
});

export const loading = () => ({
	type: "FINISH",
	payload: true,
});
