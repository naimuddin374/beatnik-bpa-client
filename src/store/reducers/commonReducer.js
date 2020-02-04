import { SET_MESSAGE, ACTION_STATUS } from '../actions/types'

const init = {
    message: null,
    type: null,
    time: null,
    actionStatus: 1 /* 1=Able to submit, 2=Pending, 3=Failed,4=Success */
}

const commonReducer = (state = init, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            {
                return {
                    ...state,
                    message: action.payload.message,
                    type: action.payload.type || 'success',
                    time: new Date().toLocaleString(),
                    actionStatus: action.payload.type === "error" ? 3 : 4
                }
            }
        case ACTION_STATUS:
            {
                return {
                    ...state,
                    actionStatus: action.payload,
                    message: null,
                }
            }
        default:
            return state
    }
}
export default commonReducer
