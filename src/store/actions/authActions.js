import { SET_MESSAGE, API_URL, SET_USER, BASE_URL } from './types'
import Axios from 'axios'

// Login
export const Login = (data, history) => dispatch => {
    Axios.post(`${API_URL}api/login`, data)
        .then(res => {
            let user = res.data.user
            if (Object.keys(user).length !== 0) {
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
                history.push(`${BASE_URL}/`)
            } else {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: "Invalid email or password.",
                        type: 'error',
                    }
                })
            }
            // window.location.reload();
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


