import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Register } from './components/Register'
import { Login } from './components/Login'
import axios from 'axios'
import { Header } from './components/Header'
import { Product } from './components/Product';
import { Home } from './components/Home';
import { ProductDetails } from './components/ProductDetails';
// import { Footer } from './components/Footer'

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
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/product/add' element={<Product />} />
      <Route path='/home' element={<Home />} />
      <Route path='/product/:id' element={<ProductDetails />} />
    </Routes>
    {/* <Footer /> */}
    </>
  );
}

export default App;
