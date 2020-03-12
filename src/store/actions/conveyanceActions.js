import { SET_MESSAGE, API_URL, CONVEYANCE_STATUS } from './types'
import Axios from 'axios'

// Data Store
export const storeData = data => dispatch => {
    dispatch({
        type: CONVEYANCE_STATUS,
        payload: 1
    })
    Axios.post(`${API_URL}api/conveyance`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: CONVEYANCE_STATUS,
                payload: 2
            })

            setTimeout(() => {
                dispatch({
                    type: CONVEYANCE_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: CONVEYANCE_STATUS,
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
        type: CONVEYANCE_STATUS,
        payload: 1
    })
    Axios.put(`${API_URL}api/conveyance/${id}`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: CONVEYANCE_STATUS,
                payload: 2
            })
            setTimeout(() => {
                dispatch({
                    type: CONVEYANCE_STATUS,
                    payload: 0
                })
            }, 100)
        })
        .catch(err => {
            dispatch({
                type: CONVEYANCE_STATUS,
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
    Axios.delete(`${API_URL}api/conveyance/${id}`)
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

// Data approve
export const approveData = id => dispatch => {
    Axios.get(`${API_URL}api/conveyance-approve/${id}`)
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
// Data reject
export const rejectData = id => dispatch => {
    Axios.get(`${API_URL}api/conveyance-reject/${id}`)
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
