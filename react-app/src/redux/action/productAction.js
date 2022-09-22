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

export const viewProductTypes = () => {
    return async(dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/types/pro`)
        .then(product => {
            console.log(product)
            dispatch({
                type: types.VIEW_PRODUCT_TYPES,
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
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/filteredProducts`,{productType:productType})
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

export const addToCart = (product) => {
    console.log("add to cart send product",product)
    return async(dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/`,product)
        .then(cart => {
            console.log("add to cart",cart)
            dispatch({
                type: types.ADD_TO_CART,
                payload: cart
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}

export const viewCart = (id) => {
    return async(dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/${id}`)
        .then(cart => {
            console.log(cart)
            dispatch({
                type: types.VIEW_CART,
                payload: cart.data
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}

export const updateCart = (product, id) => {
    console.log("update cart send product",product)
    return async(dispatch) => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/${id}`,product)
        .then(cart => {
            console.log("add to cart",cart)
            dispatch({
                type: types.UPDATE_CART,
                payload: cart
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}

export const removeFromCart = (id) => {
    return async(dispatch) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/${id}`)
        .then(cart => {
            console.log(cart)
            dispatch({
                type: types.REMOVE_FROM_CART,
                payload: cart.data
            })
        })
        .catch(err => {
            alert(err.response.data.err)
        })
    }
}