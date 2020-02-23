import { SET_MESSAGE, API_URL, SET_USER, LOGIN_ACTION_STATUS } from './types'
import Axios from 'axios'

// Login
export const login = data => dispatch => {
    dispatch({
        type: LOGIN_ACTION_STATUS,
        payload: 1
    })
    Axios.post(`${API_URL}api/login`, data)
        .then(res => {
            let user = res.data.user
            localStorage.setItem('auth_user', JSON.stringify(user))
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

            setTimeout(() => {
                dispatch({
                    type: LOGIN_ACTION_STATUS,
                    payload: 0
                })
            }, 1000)
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ACTION_STATUS,
                payload: 3
            })
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
    localStorage.removeItem('auth_user')
    history.push(`/`)
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


