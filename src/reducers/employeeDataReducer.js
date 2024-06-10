import { FETCH_EMP_DATA, FETCH_EMP_DATA_FAILURE, FETCH_EMP_DATA_SUCCESS } from "../constants/ActionTypes";

const initialState = {
    empData : [],
    isEmpDataLoading : false,
    error: null,
}

const employeeDataReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_EMP_DATA:
            return{
                ...state,
                isEmpDataLoading: true,
            }
        case FETCH_EMP_DATA_SUCCESS:
            return{
                ...state,
                isEmpDataLoading: false,
                empData: action.payload,
            }
        case FETCH_EMP_DATA_FAILURE:
            return{
                ...state,
                isEmpDataLoading: false,
                error: action.payload,
            }
        default:
           return state
            
    };
}
export default employeeDataReducer;