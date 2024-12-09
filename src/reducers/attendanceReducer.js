import { FETCH_ATTENDANCE_DATA, FETCH_ATTENDANCE_DATA_FAILURE, FETCH_ATTENDANCE_DATA_SUCCESS, FETCH_DATA } from "../constants/ActionTypes";

const initialState = {
    attendanceDetailsLoading: false,
    attendanceData: [],
    error: null,
}

const attendanceReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_ATTENDANCE_DATA:
            return {
                ...state,
                attendanceDetailsLoading: true,
            }
        case FETCH_ATTENDANCE_DATA_SUCCESS:
            return {
                ...state,
                attendanceDetailsLoading: false,
                attendanceData: action.payload,
            }
        case FETCH_ATTENDANCE_DATA_FAILURE:
            return {
                ...state,
                attendanceDetailsLoading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
export default attendanceReducer;