import axios from "axios";
import { FETCH_EMP_DATA, FETCH_EMP_DATA_FAILURE, FETCH_EMP_DATA_SUCCESS } from "../constants/ActionTypes"

const fetchEmpData = () => {
    return {
        type: FETCH_EMP_DATA,
    }
};

const fetchEmpDataSuccess = (payload) => {
    return {
        type: FETCH_EMP_DATA_SUCCESS,
        payload: payload,
    }
}

const fetchEmpDataFailure = (error) => {
    return {
        type: FETCH_EMP_DATA_FAILURE,
        payload: error,
    }
}

export const fetchEmployeeData = (empID) => {
    return (dispatch) => {
        dispatch(fetchEmpData());
        axios.post('http://localhost:8080/employeeData', empID ,{headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Methods':'GET,PUT,POST'}
          },).then(res => dispatch(fetchEmpDataSuccess(res.data)))
          .catch(error => dispatch(fetchEmpDataFailure(error.message)));
    };
};