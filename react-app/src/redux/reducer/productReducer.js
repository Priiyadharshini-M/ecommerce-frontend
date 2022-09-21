import * as types from '../action/actionTypes'

const initialState = {
    successMessage:'',
    success:false,
    loading:true,
    products:[],
    productTypes:[],
    productDetail:'',
    productCount:0
}

export const productReducer = (state=initialState, action) => {
    switch(action.type){
        case types.ADD_PRODUCTS:
            return{
            ...state,
            successMessage:action.payload.data.message,
            loading:false
            }
        case types.VIEW_PRODUCTS:
            return{
                ...state,
                products:action.payload.product,
                productCount:action.payload.productCount
            }
        case types.VIEW_PRODUCT:
            return{
                ...state,
                productDetail:action.payload
            }
        case types.VIEW_PRODUCT_TYPES:
            console.log("productttttt typessss",action.payload.productType)
            return{
                ...state,
                productTypes:action.payload.productType
            }
        default:
            return{
                ...initialState
            }
    }
}