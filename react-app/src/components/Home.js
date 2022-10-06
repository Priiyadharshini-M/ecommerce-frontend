import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';
import { viewFilteredProducts, viewProducts, viewProductTypes } from '../redux/action/productAction'
import styles from '../styles/Home.module.css'

export const Home = () => {
    const { products, productTypes } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentPageData, setCurrentPageData] = useState(products);

    useEffect(() => {
        dispatch(viewProducts())
        dispatch(viewProductTypes())
    }, [dispatch])

    return (
        <>
            <div className='row container'>
                <div className="col col-sm-12 col-md-8 col-lg-12 mb-2 mt-4 fs-4 ml-5">
                    <label htmlFor="filterByState">Filter</label>&nbsp;&nbsp;
                    <i className="bi bi-filter"></i>&nbsp;&nbsp;
                    <select className="row-cols-lg-12 mt-2 border border-3 rounded-3 bg-light text-black" id="productType"
                        name="productType" type="text" onChange={event => {
                            if (!event.target.value) {
                                dispatch(viewProducts())
                            }
                            else {
                                dispatch(viewFilteredProducts(event.target.value))
                            }
                        }}>
                        <option value="">Product Category</option>
                        {productTypes && productTypes.map((product) => {
                            return (
                                <React.Fragment key={product._id}>
                                    <option value={product.productType}>
                                        {product.productType}
                                    </option>
                                </React.Fragment>
                            )
                        })}
                    </select>
                </div >
            </div>


            <div className="p-5">
                <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 rounded-lg">
                    {products && currentPageData.map((product) => {
                        return (
                            <div key={product._id}>
                                <div className='mb-2 h-100'>

                                    <div className="col-12 h-100 w-75 ">
                                        <div className="h-100 w-100 rounded-6 mt-5" id={styles.card} type="button" onClick={() => navigate(`/product/${product._id}`)}>

                                            <div className="mt-5" id={styles.cardtitle}>
                                                <p className="col overflow-hidden  font-weight-bold text-truncate text-nowrap text-black bg-opacity- fs-1 px-5 text-center" id={styles.name}
                                                    title={product.productName}>{product.productName}</p>
                                            </div>
                                            <div className='d-flex align-item-center justify-content-center'>
                                                <img className="mx-4 rounded-6 border border-2 " id={styles.image} src={product.productImage[0]} alt="Fails to load" /></div>
                                            <div className={styles.cardbody}>
                                                <p className="card-text mb-5">
                                                    <span className="col overflow-hidden text-truncate text-nowrap bg- d-flex align-item-center justify-content-center">
                                                        &nbsp;<span className="text-black fs-3"><b>{product.productCategory}&nbsp;</b></span>
                                                    </span>
                                                    <span className='text-center'><i>{product.description}</i></span><br /><br />
                                                    <b>Available : </b><span>{product.stock} piece(s)</span><br />
                                                    {product.stock <= 0 && <span className='text-danger fs-4 font-weight-bold'>Out of stock</span>}
                                                </p>

                                                <div>
                                                    <hr />
                                                    <span className="text-black" id={styles.price}>Price : <span
                                                        className=" border-dark p-1 fs-2  text-dark rounded">&nbsp;<b><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></b></span><br />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div><br />
            <SweetPagination
                currentPageData={setCurrentPageData}
                dataPerPage={3}
                getData={products}
                navigation={true}
                getStyle={'style-2'} />
        </>
    )
}