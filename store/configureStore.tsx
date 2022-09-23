import {createStore  , combineReducers} from 'redux'
import locationReducer from '../Reducer/locationReducer'
 const configureStore=()=>{

     const store = createStore(combineReducers({
        location : locationReducer
     }))
     return store 
 }

 export default configureStore