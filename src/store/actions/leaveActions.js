import { SET_MESSAGE, API_URL, LEAVE_MAN_STATUS } from './types'
import Axios from 'axios'

// Data Store
export const storeData = data => dispatch => {
    dispatch({
        type: LEAVE_MAN_STATUS,
        payload: 1
    })
    Axios.post(`${API_URL}api/leave`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: LEAVE_MAN_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 3
            })
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}


// Data Update
export const updateData = (data, id) => dispatch => {
    dispatch({
        type: LEAVE_MAN_STATUS,
        payload: 1
    })
    Axios.put(`${API_URL}api/leave/${id}`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: LEAVE_MAN_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 3
            })
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}

// Data Delete
export const deleteData = id => dispatch => {
    Axios.delete(`${API_URL}api/leave/${id}`)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}

// Leave Approved
export const leaveApprove = id => dispatch => {
    dispatch({
        type: LEAVE_MAN_STATUS,
        payload: 1
    })
    Axios.get(`${API_URL}api/leave-approve/${id}`)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: LEAVE_MAN_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 3
            })
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}

// Leave Reject
export const leaveReject = (data, id) => dispatch => {
    dispatch({
        type: LEAVE_MAN_STATUS,
        payload: 1
    })
    Axios.put(`${API_URL}api/leave-reject/${id}`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: LEAVE_MAN_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: LEAVE_MAN_STATUS,
                payload: 3
            })
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}
