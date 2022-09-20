import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { viewIndividualProduct } from "../redux/action/productAction"
import { useParams } from 'react-router-dom'

export const ProductDetails = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const { productDetail } = useSelector(state => state.product)
    console.log("id is",id.id)

    useEffect(() => {
        dispatch(viewIndividualProduct(id.id))
    },[dispatch, id.id])
    return(
        <>
        {productDetail && productDetail.map((product) => {
            return(
                <div key={product._id}>
                    Product details : {product.productName}
                </div>
            )
        })}
        </>
    )
}