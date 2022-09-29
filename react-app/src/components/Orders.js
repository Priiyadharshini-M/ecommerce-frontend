import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { cancelOrder, updateProduct, viewOrder } from "../redux/action/productAction"
import styles from '../styles/Cart.module.css'
import SweetPagination from 'sweetpagination';
import { useNavigate } from "react-router-dom";

export const Orders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId, role } = useSelector(state => state.user)
    const { order, errorMessage } = useSelector(state => state.product)
    const [currentPageData, setCurrentPageData] = useState(order);

    const cancelHandler = (orderId, productId, stock) => {
        dispatch(cancelOrder(orderId))
        dispatch(updateProduct(productId, stock))
        window.location.reload()
    }

    useEffect(() => {
        dispatch(viewOrder(userId))
    }, [dispatch, userId])

    return (
        <>
            <div className="container">
                <h2 className="text-weight-bold fs-1" id={styles.order}>Orders</h2>
                {order && currentPageData.map((order) => {
                    return (
                        <div key={order._id}>
                            <div className="container bg-light my-5 w-50 d-flex justify-content-center align-item-center" type='button' id={styles.card} onClick={() => navigate(`/product/${order.productId._id}`)}>
                                <div className="row rounded-lg mb-5 mt-5 ">
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                        <img src={order.productId.productImage[0]} alt='Not found' className={styles.image} /><br /><br />
                                        {role === "user" && order.status === "Active" && <button className="btn btn-danger w-50 ml-5 bg-gradient text-white mt-5 text-white fs-5 rounded-6" onClick={() => cancelHandler(order._id, order.productId._id, order.productId.stock + order.quantity)}>Cancel order</button>}
                                        {role === "admin" && <><br /><p className="fs-4">Customer name : {order.userId.userName} <br /> Email : {order.userId.userEmail}</p></>}
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                        <h2 className="font-weight-bold">{order.productId.productName}</h2><br />
                                        <p className="fs-5"><i>{order.productId.description}</i></p><br /><br />
                                        <p className="fs-4"><b>Quantity ordered - </b>{order.quantity}</p>
                                        <p className="fs-4"><b>Price per piece - </b>{order.productId.price}</p>
                                        <p className="fs-4"><b>Total Amount - </b>{order.amount}</p>
                                        {order.status === "Active" && <p className="text-success fs-3 font-weight-bold ">{order.status}</p>}
                                        {order.status === "Cancelled" && <p className="text-danger fs-3 font-weight-bold ">{order.status}</p>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {order.length <= 0 && errorMessage === "No orders found" &&
                    <div className="container h-100 d-flex justify-content-center">
                        <div>
                            <h1 className="mt-3">{errorMessage}</h1>
                            <img className="w-100" src="https://image.shutterstock.com/image-vector/empty-box-cartoon-260nw-59263579.jpg" alt='' /><br /><br />
                            <button className="bg-primary" id={styles.button}><a href="/home" className="fs-3 text-white" id={styles.link}> Shop now </a></button>
                        </div>
                    </div>}
            </div>
            <SweetPagination
                currentPageData={setCurrentPageData}
                dataPerPage={3}
                getData={order}
                navigation={true}
                getStyle={'style-2'} />
        </>
    )
}