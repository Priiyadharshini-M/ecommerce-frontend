import * as types from '../action/actionTypes'

const initialState = {
    successMessage:'',
    success:false,
    loading:true,
    products:[],
    productDetail:'',
    productCount:0
}

export const productReducer = (state=initialState, action) => {
    switch(action.type){
        case types.ADD_PRODUCTS:
            return{
            ...initialState,
            successMessage:action.payload.data.message,
            loading:false
            }
        case types.VIEW_PRODUCTS:
            return{
                ...initialState,
                products:action.payload.product,
                productCount:action.payload.productCount
            }
        case types.VIEW_PRODUCT:
            return{
                ...initialState,
                productDetail:action.payload
            }
        default:
            return{
                ...initialState
            }
    }
}