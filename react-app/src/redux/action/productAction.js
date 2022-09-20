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
            console.log(err)
            alert(err.response.data.err)
        })
    }
}

export const viewProducts = () => {
    return async(dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/`)
        .then(product => {
            console.log(product)
            dispatch({
                type: types.VIEW_PRODUCTS,
                payload: product.data
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}

export const viewFilteredProducts = (productType) => {
    console.log("product type",productType)
    return async(dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/filteredProducts`,productType)
        .then(product => {
            console.log(product)
            dispatch({
                type: types.VIEW_PRODUCTS,
                payload: product.data
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}

export const viewIndividualProduct = (id) => {
    return async(dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`)
        .then(product => {
            console.log("individual product",product)
            dispatch({
                type: types.VIEW_PRODUCT,
                payload: product.data.product
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}