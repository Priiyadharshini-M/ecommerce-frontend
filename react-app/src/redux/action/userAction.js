import axios from 'axios'
import * as types from './actionTypes'

const errorMessage = (message) => ({
    type: types.ERROR_MESSAGE,
    payload: message.err
})

export const signup = (user) => {
    return async(dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/user/`,user)
        .then(user => {
            dispatch({
                type: types.ADD_USER,
                payload: user
            })
        })
        .catch(err => {
            alert(err.response.data.err)
            dispatch(errorMessage(err.response.data))
        })
    }
}

export const login = (user) => {
    return async(dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`,user)
        .then(user => {
            sessionStorage.setItem('token',user.data.token)
            dispatch({
                type: types.LOGIN_USER,
                payload: user,
                token: user.data.token
            })
        })
        .catch(err => {
            alert(err.response.data.err)
            dispatch(errorMessage(err.response.data))
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: types.LOG_OUT
        })
    }
}