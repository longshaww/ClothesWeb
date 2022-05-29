import {
    SET_DATA_DASHBOARD
} from "../../src/constants/constants";
const initialState = {
	listDashBoard: {},

};

export const adminReducer = (state = initialState, action) =>{

    switch (action.type) {
        
		case SET_DATA_DASHBOARD : 

       return {
            ...state,
            listDashBoard : action.payload
          }
    
      
		default:
			return { ...state };
	}

}