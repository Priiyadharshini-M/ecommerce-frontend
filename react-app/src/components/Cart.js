import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, updateCart, viewCart } from "../redux/action/productAction"
import styles from "./Cart.module.css";
import CurrencyFormat from 'react-currency-format';

export const Cart = () => {
    const dispatch = useDispatch()
    const { userId, errorMessage } = useSelector(state => state.user)
    const { cart, successMessage, cartCount } = useSelector(state => state.product)
    var sum = 0
    console.log("cart in redux", cart)

    const increase = (id, quantity) => {
        quantity = quantity + 1
        dispatch(updateCart({
            quantity
        }, id))
    }
    const decrease = (id, quantity) => {
        quantity = quantity - 1
        dispatch(updateCart({
            quantity
        }, id))
    }
    const remove = (id) => {
        dispatch(removeFromCart(id))
    }

    useEffect(() => {
        dispatch(viewCart(userId))
    }, [dispatch, userId])

    useEffect(() => {
        if (successMessage === 'Updated quantity' || successMessage === 'Removed from cart') {
            alert(successMessage)
            window.location.reload()
        }
        // eslint-disable-next-line
    }, [successMessage])

    return (
        <>
            <div className="row">
                <div className="col-7">
                    <div className="container h-100 w-100" id={styles.container}>
                        {cart && cart.map((cart, i) => {
                            return (
                                <div key={cart._id}>
                                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 rounded-lg mb-5 mt-5 ml-3">
                                        <div className="col-6">
                                            <div className='row'>
                                                <img src={cart.productId.productImage} alt="Not found" className={styles.image} />
                                            </div>
                                            <div className="row mt-4">
                                                <span className="font-weight-bold">{cart.quantity >= 1 && <button className="border border-0 bg-transparent" onClick={() => decrease(cart._id, cart.quantity)}><i className="bi bi-dash-circle font-weight-bold fs-1"></i></button>}
                                                    <span className="fs-2">{cart.quantity}</span>
                                                    <button className="border border-0 bg-transparent" onClick={() => increase(cart._id, cart.quantity)}><i className="bi bi-plus-circle font-weight-bold fs-1"></i></button></span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <p className="fs-3 font-weight-bold d-flex text-align-center justify-content-center">{cart.productId.productName}</p><br />
                                                <p className="fs-4 mt-3"><i>{cart.productId.description}</i></p><br /><br />
                                                <p className="fs-3 font-weight-bold mt-5"><CurrencyFormat value={cart.productId.price} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></p>
                                            </div><br />
                                            <div className="row">
                                                <button className="btn btn-danger w-50 ml-5 bg-gradient text-white mt-5 text-white fs-5 rounded-6" onClick={() => remove(cart._id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div><hr />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-5">
                    <div className="container h-50 w-75" id={styles.priceContainer}>
                        <h1 className="ml-4 mt-4">PRICE DETAILS</h1><hr />
                        {cart && cart.map((cart) => {
                            const amount = cart.quantity * cart.productId.price
                            sum = sum + amount
                            return (
                                <>
                                    {/* <h1>{cartCount}</h1> */}
                                    <div className="fs-3 mb-4">{cart.productId.productName} ({cart.quantity}piece(s)) - <CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></div>
                                </>
                            )
                        })}
                        <hr />
                        <h4 className="font-weight-bold">Total Amount - <CurrencyFormat value={sum} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></h4>
                    </div>
                </div>
            </div>
            {errorMessage &&
                <div className="container h-100 d-flex justify-content-center">
                    <div>
                        <h1 className="mt-3">{errorMessage}</h1>
                        <img className="w-100" src="https://image.shutterstock.com/image-vector/empty-box-cartoon-260nw-59263579.jpg" alt='' /><br /><br />
                        <button className="bg-primary" id={styles.button}><a href="/home" className="fs-3 text-white" id={styles.link}> Shop now </a></button>
                    </div>
                </div>}
        </>
    )
}