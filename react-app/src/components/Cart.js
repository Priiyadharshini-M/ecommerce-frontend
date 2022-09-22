import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateCart, viewCart } from "../redux/action/productAction"
import styles from "./Cart.module.css";

export const Cart = () => {
    const dispatch = useDispatch()
    const { userId } = useSelector(state => state.user)
    const { cart, successMessage } = useSelector(state => state.product)
    console.log("cart in redux",cart)

    const increase = (id, quantity) => {
        quantity=quantity+1
        dispatch(updateCart({
            quantity
        },id))
    }
    const decrease = (id, quantity) => {
         quantity=quantity-1
         dispatch(updateCart({
            quantity
        },id))
    }

    useEffect(() => {
        dispatch(viewCart(userId))
    },[dispatch, userId])

    useEffect(() => {
        if (successMessage !== '') {
            alert(successMessage)
            window.location.reload()
        }
        // eslint-disable-next-line
    }, [successMessage])

    return(
        <>
        <div className="container h-100 mt-5 mb-5 w-50 float-left" id={styles.container}>
        { cart && cart.map((cart,i) => {
            return(
                <div key={cart._id}>
                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 rounded-lg mb-5 mt-5 ml-3">
                    <div className="col-6">
                    <div className='row'>
            <img src={cart.productId.productImage} alt="Not found" className="w-50"/>
            </div>
            <div className="row mt-4">
                {/* <div className="col-3"> */}
                    <span className="font-weight-bold"><button className="border border-0 bg-transparent" onClick={() => decrease(cart._id, cart.quantity)}><i className="bi bi-dash-circle font-weight-bold fs-1"></i></button>
                    <span className="fs-2">{cart.quantity}</span> 
                    <button className="border border-0 bg-transparent" onClick={() => increase(cart._id, cart.quantity)}><i className="bi bi-plus-circle font-weight-bold fs-1"></i></button></span>

                {/* </div> */}
            </div>
            </div>
            </div>
            </div>
            )
        })}
        </div>
        </>
    )
}