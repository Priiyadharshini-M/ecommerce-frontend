import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { viewOrder } from "../redux/action/productAction"

export const Orders = () => {
    const dispatch = useDispatch()
    const { userId } = useSelector(state => state.user)
    const { order } = useSelector(state => state.product)
    console.log("orderssss",order)

    useEffect(() => {
        dispatch(viewOrder(userId))
    },[dispatch, userId])

    return(
        <>
        {order && order.map((order) => {
            return(
                <div key={order._id}>
                    Product name - {order.productId.productName}
                    
                </div>
            )
        })}
        </>
    )
}