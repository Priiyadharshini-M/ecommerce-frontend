import { Route, Routes } from 'react-router-dom'
import { Register } from './components/Register'
import { Login } from './components/Login'
import axios from 'axios'
import { Header } from './components/Header'
import { Product } from './components/Product';
import { Home } from './components/Home';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { ProtectedRoute } from './components/ProtectedRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from './components/Footer'

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return config;
  },
  error => {
    alert(error)
    return Promise.reject(error);
  }
)

function App() {
  return (
    <>
    <Header />
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
    <Footer />
    </>
  );
}

export default App;
