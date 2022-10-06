import axios from 'axios'
import { toast } from 'react-toastify';
import * as types from './actionTypes'

export const signup = (user) => {
    return async (dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/user/`, user)
            .then(user => {
                dispatch({
                    type: types.ADD_USER,
                    payload: user
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const login = (user) => {
    return async (dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, user)
            .then(user => {
                sessionStorage.setItem('token', user.data.token)
                dispatch({
                    type: types.LOGIN_USER,
                    payload: user,
                    token: user.data.token
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
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