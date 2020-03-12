import * as Types from './types'
import Axios from 'axios'

// Update profile picture 
export const updateUserProfilePhoto = (data, id) => dispatch => {
    dispatch({
        type: Types.EDIT_PROFILE_PHOTO,
        payload: 1
    })
    Axios.put(`${Types.API_URL}api/update-profile-photo/${id}`, data)
        .then(res => {
            dispatch({
                type: Types.EDIT_PROFILE_PHOTO,
                payload: 2
            })
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })

            setTimeout(() => {
                dispatch({
                    type: Types.EDIT_PROFILE_PHOTO,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: Types.EDIT_PROFILE_PHOTO,
                payload: 3
            })
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}

// Update profile info 
export const updateProfileInfo = (data, id) => dispatch => {
    dispatch({
        type: Types.PROFILE_EDIT_STATUS,
        payload: 1
    })
    Axios.put(`${Types.API_URL}api/update-user-info/${id}`, data)
        .then(res => {
            dispatch({
                type: Types.PROFILE_EDIT_STATUS,
                payload: 2
            })
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })

            setTimeout(() => {
                dispatch({
                    type: Types.PROFILE_EDIT_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: Types.PROFILE_EDIT_STATUS,
                payload: 3
            })
            dispatch({
                type: Types.SET_MESSAGE,
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
        type: Types.PASS_UPDATE_STATUS,
        payload: 1
    })
    Axios.put(`${Types.API_URL}api/update-password/${id}`, data)
        .then(res => {
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: Types.PASS_UPDATE_STATUS,
                payload: 2
            })

            setTimeout(() => {
                dispatch({
                    type: Types.PASS_UPDATE_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: Types.PASS_UPDATE_STATUS,
                payload: 3
            })
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}
