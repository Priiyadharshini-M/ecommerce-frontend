import * as types from '../action/actionTypes'

const initialState = {
    successMessage: '',
    success: false,
    loading: true,
    products: [],
    productTypes: [],
    productDetail: '',
    productCount: 0,
    cart: [],
    order: [],
    orderCount: 0,
    cartCount: 0,
    errorMessage:''
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_PRODUCTS:
            return {
                ...state,
                successMessage: action.payload.data.message,
                loading: false
            }
        case types.VIEW_PRODUCTS:
            return {
                ...state,
                successMessage: '',
                products: action.payload.product,
                productCount: action.payload.productCount
            }
        case types.VIEW_PRODUCT:
            return {
                ...state,
                successMessage: '',
                productDetail: action.payload
            }
        case types.VIEW_PRODUCT_TYPES:
            return {
                ...state,
                successMessage: '',
                productTypes: action.payload.productType
            }
        case types.ADD_TO_CART:
            return {
                ...state,
                successMessage: action.payload.data.message,
                loading: false
            }
        case types.VIEW_CART:
            return {
                ...state,
                successMessage: '',
                cart: action.payload.cart,
                cartCount: action.payload.cartCount
            }
        case types.UPDATE_CART:
            return {
                ...state,
                successMessage: action.payload.data.message
            }
        case types.REMOVE_FROM_CART:
            return {
                ...state,
                successMessage: action.payload.message
            }
        case types.MAKE_ORDER:
            return {
                ...state,
                successMessage: action.payload.data.message
            }
        case types.VIEW_ORDER:
            return {
                ...state,
                successMessage: '',
                order: action.payload.order,
                orderCount: action.payload.orderCount
            }
        case types.ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return {
                ...initialState
            }
    }
}