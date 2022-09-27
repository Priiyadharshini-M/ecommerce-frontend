import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, viewIndividualProduct } from "../redux/action/productAction"
import { useParams, useNavigate } from 'react-router-dom'
import styles from "./ProductDetails.module.css";
import CurrencyFormat from 'react-currency-format';

export const ProductDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams()
    const { productDetail, successMessage } = useSelector(state => state.product)
    const { userId } = useSelector(state => state.user)

    const addCart = (id) => {
        dispatch(addToCart({
            userId,
            productId:id,
            quantity:1
        }))
    }

    useEffect(() => {
        dispatch(viewIndividualProduct(id.id))
    }, [dispatch, id.id])

    useEffect(() => {
        if (successMessage !== '') {
            alert(successMessage)
            navigate('/cart')
            //window.location.reload()
        }
        // eslint-disable-next-line
    }, [successMessage])

    return (
        <>
            <div className="container h-100 mt-5">
                {productDetail && productDetail.map((product) => {
                    return (
                        <div key={product._id}>
                            <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 rounded-lg">
                                <div className="col-6">
                                    <div className='row'>
                                    <img className=" rounded-6 border border-2 float-start" id={styles.image} src={product.productImage} alt="Fails to load" />
                                    </div>
                                    <div className='row'>
                                    {product.stock>0 && <button type='submit' className="btn btn-danger w-50 ml-5 bg-gradient text-white mt-3 text-white fs-5 rounded-6" onClick={() => addCart(product._id)}>Add to Cart</button>}
                                    {product.stock<=0 && <p className="fs-2 text-danger font-weight-bold">Out of Stock</p>}
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-6">
                                    <div className="row">
                                    <p className="overflow-hidden  font-weight-bold text-truncate text-nowrap text-black bg-opacity- fs-1 px-5 text-center mt-5" id={styles.name}
                                        title={product.productName}>{product.productName}</p><hr /></div>
                                         <div className="row">
                                        <p className="font-weight-bold text-black fs-2">Product Details</p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4"><i className="text-danger font-weight-bold fs-4 ">Category </i><span className={styles.margin}><i>{product.productCategory}</i></span></p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4"><i className="text-danger font-weight-bold fs-4 ">Details </i><span className={styles.margin}><i> {product.description}</i></span></p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4"><i className="text-danger font-weight-bold fs-4 ">In Stock </i><span className={styles.margin}><i>{product.stock}</i></span></p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4"><i className="text-danger font-weight-bold fs-4">Amount </i><span className={styles.margin}><i><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></i></span></p><br />
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