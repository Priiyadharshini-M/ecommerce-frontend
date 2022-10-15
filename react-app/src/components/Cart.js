import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import styles from '../styles/Cart.module.css'
import { order, removeFromCart, updateCart, updateProduct, viewCart } from "../redux/action/productAction"
import React from "react";
import jwtDecode from "jwt-decode";

export const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useSelector(state => state.user)
    // const token = sessionStorage.getItem("token")
    // const decodeToken = jwtDecode(token)
    // const userId = decodeToken.id
    const { cart, successMessage, errorMessage } = useSelector(state => state.product)
    const [showModal, setShowModal] = useState(false)
    var sum = 0
    var amount = 0

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
    const handleShow = () => {
        setShowModal(() => (true))
    }
    const handleClose = () => {
        setShowModal(() => (false))
    }
    const handleConfirm = (cart) => {
        for (let count = 0; count < cart.length; count++) {
            if (cart[count].productId.stock > 0) {
                dispatch(order({
                    userId,
                    productId: cart[count].productId._id,
                    quantity: cart[count].quantity,
                    amount: cart[count].productId.price * cart[count].quantity
                })).then(() => {
                    dispatch(updateProduct(cart[count].productId._id, cart[count].productId.stock - cart[count].quantity))
                    dispatch(removeFromCart(cart[count]._id))
                })
            }
        }
        navigate('/orders')
    }

    useEffect(() => {
        dispatch(viewCart(userId))
        if (successMessage === 'Updated quantity' || successMessage === 'Removed from cart' || successMessage === "Order placed successfully") {
            toast.success(successMessage)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }
        // eslint-disable-next-line
    }, [successMessage])

    return (
        <>
            {cart.length > 0 &&
                <div className="row mx-5">
                    <div className="col-12 col-xl-7 col-lg-7 col-md-9 col-sm-12">
                        <div className="container" id={styles.container}>
                            {cart && cart.map((cart, i) => {
                                return (
                                    <div key={cart._id}>
                                        <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 rounded-lg mb-5 mt-5 ">
                                            <div className="col-6">
                                                <div className='row'>
                                                    <img src={cart.productId.productImage[0]} alt="Not found" className={styles.image} />
                                                </div>
                                                <div className="row mt-4">
                                                    <span className="font-weight-bold">{cart.quantity >= 1 && <button className="border border-0 bg-transparent" onClick={() => decrease(cart._id, cart.quantity)} data-testid="dash-circle"><i className="bi bi-dash-circle font-weight-bold fs-1"></i></button>}
                                                        <span className="fs-2">{cart.quantity}</span>
                                                        <button className="border border-0 bg-transparent" onClick={() => increase(cart._id, cart.quantity)} data-testid="plus-circle"><i className="bi bi-plus-circle font-weight-bold fs-1"></i></button></span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <button className="border border-0 text-decoration-underline" id={styles.container} onClick={() => navigate(`/product/${cart.productId._id}`)}><p className="fs-3 font-weight-bold d-flex text-align-center justify-content-center">{cart.productId.productName}</p></button><br />
                                                    <p className="fs-4 mt-3"><i>{cart.productId.description}</i></p><br /><br />
                                                    <p className="fs-3 font-weight-bold mt-5"><CurrencyFormat value={cart.productId.price} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></p>
                                                </div><br />
                                                {cart.productId.stock <= 0 && <p className="fs-2 text-danger font-weight-bold">Out of Stock</p>}

                                                <div className="row">
                                                    <button className="btn btn-danger w-50 ml-5 bg-gradient text-white mt-5 text-white fs-5 rounded-6" id="remove_button" data-testid="removeButton" onClick={() => remove(cart._id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div><hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-12 col-xl-5 col-lg-5 col-md-12 col-sm-12">
                        <div className="sticky-md-top">
                            <div className="row mt-3 bg-warning bg-opacity-25">
                                <h1 className="mt-4">PRICE DETAILS<hr /></h1>
                                {cart && cart.map((cart) => {
                                    if (cart.productId.stock > 0) {
                                        amount = cart.quantity * cart.productId.price
                                        sum = sum + amount
                                    }
                                    return (
                                        <div key={cart._id}>
                                            {cart.productId.stock > 0 && <div className="fs-3 mb-4">{cart.productId.productName} ({cart.quantity}piece(s)) - <CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></div>}
                                        </div>
                                    )
                                })}
                                <div><hr /></div>
                                <h4 className="font-weight-bold">Total Amount - <CurrencyFormat value={sum} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></h4>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <button className="btn btn-success w-50 font-weight-bold bg-gradient text-white my-5 text-white fs-2 px-3 rounded-6 " onClick={handleShow} >Place order</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <Modal show={showModal} onHide={handleClose} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirm to place the order?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirm(cart)}>Confirm</Button>
                </Modal.Footer>
            </Modal>

            {cart.length<=0 &&
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