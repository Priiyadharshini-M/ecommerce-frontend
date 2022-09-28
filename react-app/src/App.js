import axios from 'axios'
import { Header } from './components/Header'
import { Router } from './components/Router'
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
      <Router />
      <Footer />
    </>
  );
}

export default App;
