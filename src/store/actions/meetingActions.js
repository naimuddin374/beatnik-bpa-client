import { SET_MESSAGE, API_URL, MEETING_ROOM_BOOK } from './types'
import Axios from 'axios'

// Data Store
export const storeData = data => dispatch => {
    dispatch({
        type: MEETING_ROOM_BOOK,
        payload: 1
    })

    Axios.post(`${API_URL}api/meeting`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: MEETING_ROOM_BOOK,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: MEETING_ROOM_BOOK,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: MEETING_ROOM_BOOK,
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
        type: MEETING_ROOM_BOOK,
        payload: 1
    })
    Axios.put(`${API_URL}api/meeting/${id}`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: MEETING_ROOM_BOOK,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: MEETING_ROOM_BOOK,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: MEETING_ROOM_BOOK,
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
    Axios.delete(`${API_URL}api/meeting/${id}`)
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

// Meeting completed
export const completeMeeting = id => dispatch => {
    Axios.put(`${API_URL}api/meeting-complete/${id}`)
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
