import { SET_MESSAGE, ACTION_STATUS, PROFILE_EDIT_STATUS, EMP_ADD_STATUS, PASS_UPDATE_STATUS, DEPARTMENT_ADD_STATUS, LEAVE_MAN_STATUS, MEETING_ROOM_BOOK } from '../actions/types'

const init = {
    message: null,
    type: null,
    time: null,
    actionStatus: 0, //0=Before submit, 1=Submit, 2=Success, 3=Failed
    profileEditStatus: 0,
    passUpdateStatus: 0,
    employeeStatus: 0,
    departmentStatus: 0,
    leaveStatus: 0,
    meetingRoomStatus: 0,
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
        case PROFILE_EDIT_STATUS:
            {
                return {
                    ...state,
                    profileEditStatus: action.payload || 0,
                }
            }
        case PASS_UPDATE_STATUS:
            {
                return {
                    ...state,
                    passUpdateStatus: action.payload || 0,
                }
            }
        case EMP_ADD_STATUS:
            {
                return {
                    ...state,
                    employeeStatus: action.payload || 0,
                }
            }
        case DEPARTMENT_ADD_STATUS:
            {
                return {
                    ...state,
                    departmentStatus: action.payload || 0,
                }
            }
        case LEAVE_MAN_STATUS:
            {
                return {
                    ...state,
                    leaveStatus: action.payload || 0,
                }
            }
        case MEETING_ROOM_BOOK:
            {
                return {
                    ...state,
                    meetingRoomStatus: action.payload || 0,
                }
            }
        default:
            return state
    }
}
export default commonReducer
