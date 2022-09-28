import {createStore  , combineReducers} from 'redux'
import locationReducer from '../Reducer/locationReducer'
import singleLocation from '../Reducer/singleLocation'
 const configureStore=()=>{

     const store = createStore(combineReducers({
        location : locationReducer,
        single : singleLocation
     }))
     return store 
 }

 export default configureStore