import styles from "./Cart.module.css";

export const Footer = () => {
  return (
    <footer className="text-center sticky-md-bottom mt-5 conatiner" id={styles.footer}>
              <p className="text-black h4 text-align-center d-flex justify-content-center my-4">
              <small className="ml-2 fs-4 text-black">&copy; e-Shoppy, {new Date().getFullYear()}. All rights reserved.</small>
                <i className="bi bi-envelope ms-5 p-2 fs-4"></i>
                e-shoppy@gmail.com</p>
    </footer>
  )
}