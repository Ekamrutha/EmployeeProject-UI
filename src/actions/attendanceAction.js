import axios from "axios"
import { FETCH_ATTENDANCE_DATA, FETCH_ATTENDANCE_DATA_FAILURE, FETCH_ATTENDANCE_DATA_SUCCESS } from "../constants/ActionTypes"

const fetchdata = () => {
return {
    type: FETCH_ATTENDANCE_DATA
}
}

const fetchDataSuccess = (payload) => {
return {
    type: FETCH_ATTENDANCE_DATA_SUCCESS,
    payload: payload
}
}

const fetchDataFailure = (error) => {
return {
    type: FETCH_ATTENDANCE_DATA_FAILURE,
    payload: error,
}
}

export const fetchAttendanceDetails = (empId) => {
    return (dispatch) => {
        dispatch(fetchdata());
        axios.post('http://localhost:8080/attendance', empId, {headers: {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Methods':'GET,PUT,POST'
        }}).then(res => dispatch(fetchDataSuccess(res.data))).catch(err => dispatch(fetchDataFailure(err.message)));
    }

}