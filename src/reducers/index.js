import { combineReducers } from "redux";
import jobDayReducer from './jobDay'
import userReducer from './user'

 const rootReducer = combineReducers({
     jobDayReducer, 
     userReducer
 })

 export default rootReducer