import { combineReducers } from "redux";
import userDataReducer from './userReducer'

export default combineReducers({user: userDataReducer})