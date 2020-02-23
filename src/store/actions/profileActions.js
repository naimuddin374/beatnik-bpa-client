import { SET_MESSAGE, API_URL, PROFILE_EDIT_STATUS, PASS_UPDATE_STATUS } from './types'
import Axios from 'axios'

// Update profile picture 
export const updateProfileInfo = (data, id) => dispatch => {
    dispatch({
        type: PROFILE_EDIT_STATUS,
        payload: 1
    })
    Axios.put(`${API_URL}api/update-user-info/${id}`, data)
        .then(res => {
            dispatch({
                type: PROFILE_EDIT_STATUS,
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
                    type: PROFILE_EDIT_STATUS,
                    payload: 0
                })
            }, 1000)
        })
        .catch(err => {
            dispatch({
                type: PROFILE_EDIT_STATUS,
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

// Change Password 
export const updatePassword = (data, id) => dispatch => {
    dispatch({
        type: PASS_UPDATE_STATUS,
        payload: 1
    })
    Axios.put(`${API_URL}api/update-password/${id}`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: PASS_UPDATE_STATUS,
                payload: 2
            })

            setTimeout(() => {
                dispatch({
                    type: PASS_UPDATE_STATUS,
                    payload: 0
                })
            }, 1000)
        })
        .catch(err => {
            dispatch({
                type: PASS_UPDATE_STATUS,
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
