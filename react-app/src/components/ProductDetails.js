import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { viewIndividualProduct } from "../redux/action/productAction"
import { useParams } from 'react-router-dom'
import styles from "./ProductDetails.module.css";
import CurrencyFormat from 'react-currency-format';

export const ProductDetails = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const { productDetail } = useSelector(state => state.product)
    console.log("id is", id.id)

    useEffect(() => {
        dispatch(viewIndividualProduct(id.id))
    }, [dispatch, id.id])
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
                                    <button className="btn btn-danger w-50 ml-5 bg-gradient text-white mt-3 text-white fs-5 rounded-6">Add to Cart</button>
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