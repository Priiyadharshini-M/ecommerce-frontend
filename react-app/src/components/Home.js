import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { viewFilteredProducts, viewProducts } from '../redux/action/productAction'
import styles from "./Home.module.css";
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';

export const Home = () => {
    const { products } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentPageData, setCurrentPageData] = useState(products);
    const [productType, setProductType] = useState({
        productType : ''
    })

    useEffect(() => {
        dispatch(viewProducts())
    }, [dispatch])

    const changeHandler = (event) =>{
        setProductType((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
        console.log("looo",productType)
        dispatch(viewFilteredProducts(productType))
    }

    return (
        <>
            <div className='row '>
                <div className="col col-sm-12 col-md-8 col-lg-12 mb-2 me-5 mt-4 filter fs-4 ml-5">
                    <label htmlFor="filterByState">Filter</label>&nbsp;&nbsp;
                    <i className="bi bi-filter"></i>&nbsp;&nbsp;
                    <select className="row-cols-lg-12 mt-2 border border-3 rounded-3 bg-light text-black me-3" id="filter"
                        name="filter" type="text" onChange={changeHandler}>
                        <option value="">Product Category</option>
                        {products && products.map((product) => {
                            return(
                                <option value={product.productType}>
                                    {product.productType}
                                </option>
                            )
                        })}
                    </select>

                    <span className="row-cols row-cols-sm-12 row-cols-lg-12">

                        <label htmlFor="sortByPrice">Sort</label>&nbsp;&nbsp;
                        <i className="bi bi-sort-up"></i>&nbsp;&nbsp;
                        <select className="row-cols row-cols-sm-12 row-cols-lg-12 mt-2 border bg-light border-3 rounded-3 text-black"
                            id="sort" name="sort" type="text">
                            <option value="">All packages</option>
                            <option value="low">Low to High</option>
                            <option value="high">High to Low</option>
                        </select>

                    </span>
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