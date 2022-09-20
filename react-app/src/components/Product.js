import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from "../redux/action/productAction"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export const Product = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    })
    const { successMessage } = useSelector(state => state.product)

    const submitHandler = async (productDetails) => {
        console.log("product details", productDetails)
        dispatch(addProduct(productDetails))
    }

    useEffect(() => {
        if (successMessage !== '') {
            alert(successMessage)
            navigate('/home')
            window.location.reload()
        }
        // eslint-disable-next-line
    }, [successMessage])

    return (
        <>
        <div className="container h-100 w-50">
        <div className="row mt-5">
            <form onSubmit={handleSubmit(submitHandler)} className="mb-3 fs-3">
                <div className="align-items-center text-center h1 fw-bold mb-4 bg-gradient rounded-6 p-2">
                    <span>Product Details</span></div>
                <label className="mx-3 h5 fs-4">Product Name:</label>
                <input type="text" {...register('productName', {
                    required: '**Product Name required',
                    pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: '**Product Name should contain only alphabets'
                    },
                    minLength: {
                        value: 3,
                        message: '**Product Name should contain atleast 3 letters'
                    }
                })} className="form-control mx-3 fs-5" placeholder="Enter product name" ></input>
                {errors.productName && <span className="text-danger mx-3 fs-6">{errors.productName.message}</span>}<br />
                <label className="mx-3 h5 fs-4">Attach image:</label>
                <input type="text" {...register('productImage', {
                    required: '**Image required'
                })} className="form-control mx-3 fs-5" placeholder="Attach image"  ></input>
                {errors.productImage && <span className="text-danger mx-3 fs-6">{errors.productImage.message}</span>}<br />
                <label className="mx-3 h5 fs-4">Description:</label>
                <input type="text" {...register('description', {
                    required: '**Description required',
                    pattern: {
                        value: /^[a-zA-Z0-9 ]+$/,
                        message: '**Description can contain only alphabets and numbers'
                    },
                    minLength: {
                        value: 10,
                        message: '**Description should contain atleast 10 characters'
                    }
                })} className="form-control mx-3 fs-5" placeholder="Enter description" ></input>
                {errors.description && <span className="text-danger mx-3 fs-6">{errors.description.message}</span>}<br />
                <label className="mx-3 h5 fs-4">Price:</label>
                <input type="number" {...register('price', {
                    required: '**Price required',
                    validate: price => price >= 0 || 'Price cannot be less than 0'
                })} className="form-control mx-3 fs-5" placeholder="Enter price" ></input>
                {errors.price && <span className="text-danger mx-3 fs-6">{errors.price.message}</span>}<br />
                <label className="mx-3 h5 fs-4">Product Category:</label>
                <input type="text" {...register('productCategory', {
                    required: 'Product Category required',
                    pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: '**Product Category should contain only alphabets'
                    },
                    minLength: {
                        value: 2,
                        message: '**Product Category should contain atleast 2 letters'
                    }
                })} className="form-control mx-3 fs-5" placeholder="Enter category ex: full sleve shirt" ></input>
                {errors.productCategory && <span className="text-danger mx-3 fs-6">{errors.productCategory.message}</span>}<br />
                <label className="mx-3 h5 fs-4">Product Type:</label>
                <input type="text" {...register('productType', {
                    required: 'Product Type required',
                    pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: '**Product type should contain only alphabets'
                    },
                    minLength: {
                        value: 2,
                        message: '**Product Type should contain atleast 2 letters'
                    }
                })} className="form-control mx-3 fs-5" placeholder="Enter type ex: shirt" ></input>
                {errors.productType && <span className="text-danger mx-3 fs-6">{errors.productType.message}</span>}<br />
                <label className="mx-3 h5 fs-4">Quantity:</label>
                <input type="number" {...register('stock', {
                    required: 'Stock quantity required',
                    validate: stock => stock > 0 || 'Stock cannot be less than 1'
                })} className="form-control mx-3 fs-5" placeholder="Enter stock quantity" ></input>
                {errors.stock && <span className="text-danger mx-3 fs-6">{errors.stock.message}</span>}<br />
                <div className="d-flex justify-content-center text-center  mb-lg-4">
                    <button type="submit" className="btn btn-primary bg-gradient text-white mt-3 text-white fs-5 rounded-6">Submit</button>
                </div>
            </form>
            </div>
            </div>
        </>
    )
}