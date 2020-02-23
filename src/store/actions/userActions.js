import { SET_MESSAGE, API_URL, EMP_ADD_STATUS } from './types'
import Axios from 'axios'

// Data Store
export const storeData = data => dispatch => {
    dispatch({
        type: EMP_ADD_STATUS,
        payload: 1
    })
    Axios.post(`${API_URL}api/user`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: EMP_ADD_STATUS,
                payload: 2
            })

            setTimeout(() => {
                dispatch({
                    type: EMP_ADD_STATUS,
                    payload: 0
                })
            }, 1000)
        })
        .catch(err => {
            dispatch({
                type: EMP_ADD_STATUS,
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
        type: EMP_ADD_STATUS,
        payload: 1
    })
    Axios.put(`${API_URL}api/user/${id}`, data)
        .then(res => {
            dispatch({
                type: EMP_ADD_STATUS,
                payload: 2
            })
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })

            setTimeout(() => {
                dispatch({
                    type: EMP_ADD_STATUS,
                    payload: 0
                })
            }, 1000)
        })
        .catch(err => {
            dispatch({
                type: EMP_ADD_STATUS,
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
    Axios.delete(`${API_URL}api/user/${id}`)
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
