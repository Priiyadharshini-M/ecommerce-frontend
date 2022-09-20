import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { viewProducts } from '../redux/action/productAction'
import styles from "./Home.module.css";
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const { products } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(viewProducts())
    }, [dispatch])

    const clickHandler = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <>
            <div className="p-5">
                {products && products.map((product) => {
                    return (
                        <div key={product._id}>
                            <div className="row row-cols-xl-4 row-cols-lg-4 row-cols-md-2 row-cols-sm-1 rounded-lg">
                                <div className=" shadow-lg cols-sm-6  cols-md-2 cols-lg-3 h-100">
                                    <div className="h-100 w-100 rounded-6 " id={styles.card} type="button" onClick={clickHandler(product._id)}>
                           
                                            <div className="mt-2" id={styles.cardtitle}>
                                                <p className="col overflow-hidden  font-weight-bold text-truncate text-nowrap text-black bg-opacity- fs-1 px-5 text-center" id={styles.name}
                                                    title={products.productName}>{product.productName}</p>
                                            </div>
                                            <div className='d-flex align-item-center justify-content-center'>
                                                <img className="mx-4 rounded-6 border border-2 " id={styles.image} src={product.productImage} alt="Fails to load" /></div>
                                            <div className={styles.cardbody}>
                                                <p className="card-text mb-5">
                                                    <span className="col overflow-hidden text-truncate text-nowrap bg- d-flex align-item-center justify-content-center">
                                                        &nbsp;<span className="text-black fs-3"><b>{product.productCategory}&nbsp;</b></span>
                                                    </span>
                                                    <span className='text-center'><i>{product.description}</i></span><br /><br />
                                                    <b>Available : </b><span>{product.stock} piece(s)</span>
                                                </p>

                                                <div>
                                                    <hr />
                                                    <span className="text-black" id={styles.price}>Price : <span
                                                        class=" border-dark p-1 fs-2  text-dark rounded">&nbsp;<b><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /></b></span><br />
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
        </>
    )
}