import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';
import { toast } from 'react-toastify';
import { addToCart, viewIndividualProduct } from "../redux/action/productAction"
import styles from '../styles/ProductDetails.module.css'

export const ProductDetails = ({productid}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams()
    const { productDetail, successMessage } = useSelector(state => state.product)
    const { userId, role } = useSelector(state => state.user)
    const [src, setSrc] = useState('')

    const addCart = (id) => {
        dispatch(addToCart({
            userId,
            productId: id,
            quantity: 1
        }))
    }
    const mouseEnter = (img) => {
        setSrc(img)
    }

    useEffect(() => {
        dispatch(viewIndividualProduct(id.id || productid))
    }, [dispatch, id.id, productid])

    useEffect(() => {
        if (successMessage !== '') {
            toast.success(successMessage)
            navigate('/cart')
            //window.location.reload()
        }
        // eslint-disable-next-line
    }, [successMessage])

    return (
        <>
            <div className="container h-100 mt-5">
                {productDetail && productDetail.map((product) => {
                    const source = src || product.productImage[0]

                    return (
                        <div key={product._id}>
                            <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 rounded-lg">
                                <div className="col-6">
                                    <div className='row'>
                                        <div className="col-3">
                                            <div className="row">
                                                {product.productImage && product.productImage.map((image) => {
                                                    return (
                                                        <div key={image}>
                                                            <img className="w-50" id={styles.image} src={image} alt="Fails to load" onClick={(e) => mouseEnter(e.currentTarget.src)} />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="row w-75 h-100 rounded-6 border border-2 float-start"><img src={source} alt="not found" data-testid="previewImage"/>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        {product.stock > 0 && role!== "admin" && <button type='submit' className="btn btn-danger w-50 ml-5 bg-gradient text-white mt-3 text-white fs-5 rounded-6" onClick={() => addCart(product._id)}>Add to Cart</button>}
                                        {product.stock <= 0 && <p className="fs-2 text-danger font-weight-bold">Out of Stock</p>}
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-6">
                                    <div className="row">
                                        <p className="overflow-hidden  font-weight-bold text-truncate text-nowrap text-black bg-opacity- fs-1 px-5 text-center mt-5" id={styles.name}
                                            title={product.productName} data-testid="productName">{product.productName}</p><hr /></div>
                                    <div className="row">
                                        <p className="font-weight-bold text-black fs-2">Product Details</p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4"><i className="text-danger font-weight-bold fs-4 ">Category </i><span className={styles.margin}><i>{product.productCategory}</i></span></p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4"><i className="text-danger font-weight-bold fs-4 ">Details </i><span className={styles.margin}><i> {product.description}</i></span></p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4" ><i className="text-danger font-weight-bold fs-4" >In Stock </i><span className={styles.margin} data-testid="stockquantity"><i>{product.stock}</i></span></p><br />
                                        <p className="font-weight-bold text-black fs-4 mb-4"><i className="text-danger font-weight-bold fs-4" data-testid="price">Amount </i><span className={styles.margin}><i><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></i></span></p><br />
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