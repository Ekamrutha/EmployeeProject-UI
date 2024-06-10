import {combineReducers} from 'redux'
import employeeDataReducer from './employeeDataReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
login: loginReducer,
employeeData: employeeDataReducer, 
})
export default rootReducer;