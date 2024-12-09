import {combineReducers} from 'redux'
import attendanceReducer from './attendanceReducer';
import employeeDataReducer from './employeeDataReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
login: loginReducer,
employeeData: employeeDataReducer, 
attendance: attendanceReducer,
})
export default rootReducer;