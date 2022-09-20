import * as types from '../action/actionTypes'

const initialState = {
    successMessage:'',
    success:false,
    loading:true,
    products:[]
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
                products:action.payload
            }
        default:
            return{
                ...initialState
            }
    }
}