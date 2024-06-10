import axios from "axios";
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_EMP_ID } from "../constants/ActionTypes";

const fetchingData = () => {
    return {
        type : FETCH_DATA,
    };
};

const fetchDataSuccess = (payload) => {
    return {
        type : FETCH_DATA_SUCCESS,
        payload : payload,
    };
};

const fetchDataFailure = (error) => {
    return {
        type : FETCH_DATA_FAILURE,
        payload : error,
    };
};
const fetchEmpID = (payload) => {
    return {
        type : FETCH_EMP_ID,
        payload : payload,
    }
}
export const fetchDataRequest = () => {
    return (dispatch) => {
        dispatch(fetchingData());
        axios.get('http://localhost:8080/',{headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST'}}).then(res => dispatch(fetchDataSuccess(res.data)))
        .catch(error => dispatch(fetchDataFailure(error.message)));
    };
};

export const fetchEmployeeID = (payload) => {
    return (dispatch) => {
        dispatch(fetchEmpID(payload));
    }
}

