import { SET_USER, LOGIN_ACTION_STATUS } from '../actions/types'

const init = {
    time: {},
    user: {},
    isAuth: false,
    status: 0 //0=Before submit, 1=Submit, 2=Success, 3=Failed
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case SET_USER:
            {
                return {
                    ...state,
                    user: action.payload || {},
                    isAuth: Object.keys(action.payload).length !== 0,
                    status: Object.keys(action.payload).length !== 0 ? 2 : 0,
                }
            }
        case LOGIN_ACTION_STATUS:
            {
                return {
                    ...state,
                    status: action.payload || 0,
                }
            }
        default:
            return state
    }
}
export default authReducer
