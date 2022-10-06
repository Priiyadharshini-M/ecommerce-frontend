import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { Header } from './components/Header'
import { Router } from './components/Router'
import { Footer } from './components/Footer'

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

function App() {
  return (
    <>
    <Provider store={store}>
      <Header />
      <ToastContainer />
      <Router />
      <Footer />
      </Provider>
    </>
  );
}

export default App;
