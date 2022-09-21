import * as types from '../action/actionTypes'
import jwtDecode from 'jwt-decode'

const token = sessionStorage.getItem('token')
let user
if(!token){
    user={
        id:'',
        role:''
    }
}
else{
    user = jwtDecode(token)
}

const initialState = {
    token: sessionStorage.getItem('token') || null,
    errorMessage: '',
    successMessage: '',
    success:false,
    loading: true,
    userId:user.id,
    role:user.role
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ADD_USER:
            return{
            ...state,
            successMessage:action.payload.data.message,
            success:true,
            loading:false
            }
        case types.LOGIN_USER:
            console.log("token",action.payload)
            const userToken = sessionStorage.getItem('token')
            user = jwtDecode(userToken)
            return{
                ...state,
                token:action.token,
                userId:user.id,
                role:user.role,
                successMessage:action.payload.data.message,
                success:true,
                loading:false
            } 
        case types.ERROR_MESSAGE:
            return{
                ...state,
                errorMessage:action.payload,
                loading:false
            }
        case types.LOG_OUT:
            sessionStorage.removeItem("token")
            return{
                ...state,
                token:'',
                userId:'',
                role:'',
                successMessage:'Successfully logged out'
            }
        default:
            return{
                ...initialState
            }
    }
}