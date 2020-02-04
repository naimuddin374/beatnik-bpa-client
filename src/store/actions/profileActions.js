import { SET_MESSAGE, API_URL, ACTION_STATUS } from './types'
import Axios from 'axios'

// Update profile picture 
export const updateProfileInfo = (data, id) => dispatch => {
    dispatch({
        type: ACTION_STATUS,
        payload: 2
    })
    Axios.put(`${API_URL}api/update-user-info/${id}`, data)
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

// Change Password 
export const updatePassword = (data, id) => dispatch => {
    dispatch({
        type: ACTION_STATUS,
        payload: 2
    })
    Axios.put(`${API_URL}api/update-password/${id}`, data)
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
