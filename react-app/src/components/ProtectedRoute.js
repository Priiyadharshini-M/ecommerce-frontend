import jwtDecode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, isAdmin=false }) => {
  let user

  const userToken = sessionStorage.getItem('token')
  if (userToken) {
    user = jwtDecode(userToken)
    if ((user.id)){
        if(isAdmin){
            if(user.role === process.env.REACT_APP_ADMIN){
                return children
            }
            else{
                return <Navigate to='/login' replace />
            }
        }
        else{
            return children
        }
    }
    else{
        return <Navigate to='/login' replace />
    }
  }

  if (userToken === null) {
    return <Navigate to='/login' replace />
  }
}