import axios from 'axios'
import { toast } from 'react-toastify';
import * as types from './actionTypes'

const errorMessage = (message) => ({
    type: types.ERROR_MESSAGE,
    payload: message.err
})

export const addProduct = (product) => {
    return async (dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/`, product)
            .then(product => {
                dispatch({
                    type: types.ADD_PRODUCTS,
                    payload: product
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const updateProduct = (id, stock) => {
    return async (dispatch) => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/product/${id}`, { stock: stock })
            .then(product => {
                dispatch({
                    type: types.UPDATE_PRODUCT,
                    payload: product
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const viewProducts = () => {
    return async (dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/`)
            .then(product => {
                dispatch({
                    type: types.VIEW_PRODUCTS,
                    payload: product.data
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const viewProductTypes = () => {
    return async (dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/types/pro`)
            .then(product => {
                dispatch({
                    type: types.VIEW_PRODUCT_TYPES,
                    payload: product.data
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const viewFilteredProducts = (productType) => {
    return async (dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/filteredProducts`, { productType: productType })
            .then(product => {
                dispatch({
                    type: types.VIEW_PRODUCTS,
                    payload: product.data
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const viewIndividualProduct = (id) => {
    return async (dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`)
            .then(product => {
                dispatch({
                    type: types.VIEW_PRODUCT,
                    payload: product.data.product
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const addToCart = (product) => {
    return async (dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/`, product)
            .then(cart => {
                dispatch({
                    type: types.ADD_TO_CART,
                    payload: cart
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const viewCart = (id) => {
    return async (dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/${id}`)
            .then(cart => {
                dispatch({
                    type: types.VIEW_CART,
                    payload: cart.data
                })
            })
            .catch(err => {
                dispatch(errorMessage(err.response.data))
            })
    }
}

export const updateCart = (product, id) => {
    return async (dispatch) => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/${id}`, product)
            .then(cart => {
                dispatch({
                    type: types.UPDATE_CART,
                    payload: cart
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const removeFromCart = (id) => {
    return async (dispatch) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/${id}`)
            .then(cart => {
                dispatch({
                    type: types.REMOVE_FROM_CART,
                    payload: cart.data
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const order = (order) => {
    return async (dispatch) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/order/`, order)
            .then(order => {
                dispatch({
                    type: types.MAKE_ORDER,
                    payload: order
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}

export const viewOrder = (id) => {
    return async (dispatch) => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/order/${id}`)
            .then(order => {
                dispatch({
                    type: types.VIEW_ORDER,
                    payload: order.data
                })
            })
            .catch(err => {
                dispatch(errorMessage(err.response.data))
            })
    }
}

export const cancelOrder = (id) => {
    return async (dispatch) => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/order/${id}`)
            .then(order => {
                dispatch({
                    type: types.CANCEL_ORDER,
                    payload: order
                })
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }
}