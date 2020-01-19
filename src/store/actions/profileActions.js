import { SET_MESSAGE, API_URL} from './types'
import Axios from 'axios'

// Update profile picture 
export const updateProfileInfo = (data, id) => dispatch => {
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
            console.log(err.response)
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
            console.log(err.response)
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}
