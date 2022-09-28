import styles from '../styles/Cart.module.css'

export const Footer = () => {

  return (
    <footer className="text-center conatiner" id={styles.footer}>
      <p className="text-black h4 text-align-center d-flex justify-content-center my-4">
        <small className="ml-2 fs-4 text-black mt-2">&copy; e-Shoppy, {new Date().getFullYear()}. All rights reserved.</small>
        <i className="bi bi-envelope ms-5 p-2 fs-4 "></i>
        <b className='mt-2'>e-shoppy@gmail.com</b></p>
    </footer>
  )
}