import axios from 'axios'
import * as types from './actionTypes'

export const addProduct = (product) => {
    return async(dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/`,product)
        .then(product => {
            dispatch({
                type: types.ADD_PRODUCTS,
                payload: product
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}

export const viewProducts = (product) => {
    return async(dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/`)
        .then(product => {
            console.log(product)
            dispatch({
                type: types.VIEW_PRODUCTS,
                payload: product.data.product
            })
        })
    }
}