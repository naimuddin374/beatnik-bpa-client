import { SET_MESSAGE, API_URL, MESSAGE_STATUS } from './types'
import Axios from 'axios'

// Data Store
export const storeData = data => dispatch => {
    dispatch({
        type: MESSAGE_STATUS,
        payload: 1
    })
    Axios.post(`${API_URL}api/message`, data)
        .then(res => {
            // dispatch({
            //     type: SET_MESSAGE,
            //     payload: {
            //         message: res.data.message,
            //     }
            // })
            dispatch({
                type: MESSAGE_STATUS,
                payload: 2
            })

            setTimeout(() => {
                dispatch({
                    type: MESSAGE_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            console.log('err', err.response)
            dispatch({
                type: MESSAGE_STATUS,
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
        type: MESSAGE_STATUS,
        payload: 1
    })
    Axios.put(`${API_URL}api/message/${id}`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: MESSAGE_STATUS,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: MESSAGE_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: MESSAGE_STATUS,
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
    Axios.delete(`${API_URL}api/message/${id}`)
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
