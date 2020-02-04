import { SET_MESSAGE, API_URL, SET_USER, BASE_URL, ACTION_STATUS } from './types'
import Axios from 'axios'

// Login
export const login = data => dispatch => {
    dispatch({
        type: ACTION_STATUS,
        payload: 2
    })
    Axios.post(`${API_URL}api/login`, data)
        .then(res => {
            let user = res.data.user
            localStorage.setItem('auth', JSON.stringify(user))
            dispatch({
                type: SET_USER,
                payload: user
            })
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                    type: 'success',
                }
            })
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response && err.response.data.message,
                    type: 'error',
                }
            })
        })
}


// Logout
export const logout = history => dispatch => {
    localStorage.removeItem('auth')
    history.push(`${BASE_URL}/`)
    window.location.reload();
    dispatch({
        type: SET_USER,
        payload: {
            token: {},
            user: {}
        }
    })
    dispatch({
        type: SET_MESSAGE,
        payload: {
            message: 'Logout Successful',
            type: 'success',
        }
    })
}


