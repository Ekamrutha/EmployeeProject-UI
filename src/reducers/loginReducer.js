import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_EMP_ID } from "../constants/ActionTypes";

const initialState = {
    data: [],
    isLoading : false,
    error : null,
    empID : '',
}

const loginReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                isLoading : true,
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                isLoading : false,
                data : action.payload,
            }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                isLoading : false,
                error : action.payload,
            }
        case FETCH_EMP_ID:
            return{
                ...state,
                empID : action.payload,
            }
        default:
            return state
    };
}

export default loginReducer;