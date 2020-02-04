import { API_URL, SET_MESSAGE, ACTION_STATUS } from './types';
import Axios from 'axios'

// Update action status 
export const updateActionStatus = status => dispatch => {
    dispatch({
        type: ACTION_STATUS,
        payload: status
    })
}


// Update profile picture 
export const storeSubscribe = data => dispatch => {
    Axios.post(`${API_URL}api/subscribe/`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: 'Thank you for connected with us.',
                }
            })
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data,
                    type: 'error',
                }
            })
        })
}