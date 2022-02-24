const initialState = {
	loading: true,
};

export const loadingState = (state = initialState, action) => {
	switch (action.type) {
		case "LOADING":
			return {
				loading: action.payload,
			};
		case "FINISH":
			return {
				loading: action.payload,
			};
		default:
			return state;
	}
};
