import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import styles from '../styles/ProductDetails.module.css'
import { logout } from '../redux/action/userAction'
import { viewCart } from '../redux/action/productAction';

export const Header = () => {
  const user = useSelector(state => state.user.role)
  const userId = useSelector(state => state.user.userId)
  const { cartCount } = useSelector(state => state.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  let decodedToken
  if (token !== null) {
    decodedToken = jwtDecode(token)
  }

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/home')
    window.location.reload()
  }

  useEffect(() => {
    if (userId !== '' && user === 'user') {
      dispatch(viewCart(userId))
    }
  }, [dispatch, userId, user, cartCount])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-0 mb-5" aria-label="Fifth navbar example">
        <div className="container-fluid">
          <a className="navbar-brand fs-1" href="/home">e-Shoppy</a>
          <button className="navbar-toggler collapsed ms-auto" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbar-content-top" aria-controls="navbar-content-top" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="fa fa-bars"></span>
          </button>

          <div className="navbar-collapse collapse" id="navbar-content-top">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item  p-3 h2" title="Go to Home">
                <a className="nav-link mx-3 text-white" href='/home'>Home</a>
              </li>
              {user === 'user' && <li className="nav-item p-3 h2" title="View cart">
                <a className="nav-link mx-3 text-white " href='/orders'>My orders</a>
              </li>}
              {user === 'admin' && <><li className="nav-item p-3 h2" title=" Add new product">
                <a className="nav-link mx-3 text-white " href='/product/add'>Add Product</a>
              </li>
                <li className="nav-item p-3 h2" title="View all orders">
                  <a className="nav-link mx-3 text-white " href='/orders'>All orders</a>
                </li> </>}
              {userId === '' && <li className="nav-item p-3 h2"> <a className="nav-link mx-3 text-white " href='/login'>Login
                &nbsp;&nbsp;<i className="bi bi-box-arrow-in-left"></i></a></li>}
            </ul>


            {user === 'user' && <span className="nav-item me-5 float-end text-white "><span className="ms-3 fs-1 "><a
              aria-disabled="true" className='text-decoration-none' title="View cart" href='/cart'><span className="bi bi-cart fs-1 text-white me-3"> <span className=''><sup id={styles.cart}>{cartCount}</sup></span></span></a></span></span>}
            {userId !== '' && <><span className="nav-item me-5 float-end text-white " ><span className="ms-3 fs-1 " ><a
              aria-disabled="true" title="View profile" href='/profile' id={styles.link}><i className="bi bi-person-circle fs-1 text-white me-3"></i><span
                className="text-white fs-3 me-3">{decodedToken.userName}</span></a></span>
            </span> <li className="nav-item p-3 h2"><button className="nav-link mx-3 text-white bg-dark border border-0" aria-disabled="false" onClick={logoutHandler}>Logout &nbsp;&nbsp;<i className="bi bi-box-arrow-right"></i></button></li></>}
            {userId === '' && <span className="nav-item me-5 float-end text-white pb-4"><span className="ms-3 fs-1 "><a
              aria-disabled="true" title="Click to login" href='/login'><i
                className="bi bi-person-circle fs-1 text-white me-3 "></i><span
                  className="text-white fs-3 me-3">Guest</span></a></span>
            </span>}
          </div>
        </div>
      </nav>
    </div>
  )
}