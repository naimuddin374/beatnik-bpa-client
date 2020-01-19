import { SET_USER } from '../actions/types'

const init = {
    time: {},
    user: {},
    isAuth: false,
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case SET_USER:
            {
                return {
                    ...state,
                    user: action.payload || {},
                    isAuth: Object.keys(action.payload).length !== 0,
                }
            }
        default:
            return state
    }
}
export default authReducer
