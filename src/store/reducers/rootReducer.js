import { combineReducers } from 'redux';
import commonReducer from './commonReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    common: commonReducer,
    auth: authReducer,
})
export default rootReducer
