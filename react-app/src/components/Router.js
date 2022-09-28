import { Route, Routes } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { Product } from './Product';
import { Home } from './Home';
import { ProductDetails } from './ProductDetails';
import { Cart } from './Cart';
import { Orders } from './Orders';
import { ProtectedRoute } from './ProtectedRoute';

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/product/add' element={<ProtectedRoute isAdmin={true}><Product /></ProtectedRoute>} />
                <Route path='/home' element={<Home />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path='*' element={<Home />} />
            </Routes>
        </>
    )
}