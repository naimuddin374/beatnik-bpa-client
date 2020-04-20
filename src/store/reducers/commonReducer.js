import * as Types from '../actions/types'

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
    conveyanceStatus: 0,
    updateProfilePhoto: 0,
    projectStatus: 0,
    messageStatus: 0,
}

const commonReducer = (state = init, action) => {
    switch (action.type) {
        case Types.SET_MESSAGE:
            {
                return {
                    ...state,
                    message: action.payload.message,
                    type: action.payload.type || 'success',
                    time: new Date().toLocaleString(),
                    actionStatus: action.payload.type === "error" ? 3 : 4
                }
            }
        case Types.ACTION_STATUS:
            {
                return {
                    ...state,
                    actionStatus: action.payload,
                    message: null,
                }
            }
        case Types.PROFILE_EDIT_STATUS:
            {
                return {
                    ...state,
                    profileEditStatus: action.payload || 0,
                }
            }
        case Types.EDIT_PROFILE_PHOTO:
            {
                return {
                    ...state,
                    updateProfilePhoto: action.payload || 0,
                }
            }
        case Types.PASS_UPDATE_STATUS:
            {
                return {
                    ...state,
                    passUpdateStatus: action.payload || 0,
                }
            }
        case Types.EMP_ADD_STATUS:
            {
                return {
                    ...state,
                    employeeStatus: action.payload || 0,
                }
            }
        case Types.DEPARTMENT_ADD_STATUS:
            {
                return {
                    ...state,
                    departmentStatus: action.payload || 0,
                }
            }
        case Types.LEAVE_MAN_STATUS:
            {
                return {
                    ...state,
                    leaveStatus: action.payload || 0,
                }
            }
        case Types.MEETING_ROOM_BOOK:
            {
                return {
                    ...state,
                    meetingRoomStatus: action.payload || 0,
                }
            }
        case Types.CONVEYANCE_STATUS:
            {
                return {
                    ...state,
                    conveyanceStatus: action.payload || 0,
                }
            }
        case Types.PROJECT_STATUS:
            {
                return {
                    ...state,
                    projectStatus: action.payload || 0,
                }
            }
        case Types.MESSAGE_STATUS:
            {
                return {
                    ...state,
                    messageStatus: action.payload || 0,
                }
            }
        default:
            return state
    }
}
export default commonReducer
