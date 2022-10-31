import { SET_NAV_HEIGHT } from '../../src/constants/constants';
const initialState = {
    height: 0,
};

export const heightReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAV_HEIGHT:
            return {
                ...state,
                height: action.payload,
            };

        default:
            return { ...state };
    }
};
