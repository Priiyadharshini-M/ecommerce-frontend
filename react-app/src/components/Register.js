import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { signup } from "../redux/action/userAction"

export const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onTouched'
    })
    const { successMessage, success } = useSelector(state => state.user)

    const submitHandler = async (credentials) => {
        dispatch(signup(credentials))
    }

    const password = watch('password')

    useEffect(() => {
        if (success) {
            toast.success(successMessage)
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [successMessage, success])

    return (
        <>
            <div className="container h-100 mb-5">
                <div className="row">
                    <div className="col-lg-12 form d-flex justify-content-center align-items-center">
                        <div className="card text-black bg-light mb-5 w-50">
                            <div className="card-body">
                                <div className="row justify-content-center w-100">
                                    <div className="col-md-5 col-lg-6 col-xl-5">
                                        <form onSubmit={handleSubmit(submitHandler)} className="mb-3 fs-3">
                                            <div className="align-items-center text-center h1 fw-bold mb-4 bg-gradient rounded-6 p-2">
                                                <span>Sign up</span></div>
                                            <label className="mx-3 h5 fs-4" >Name:</label>
                                            <input type="text" {...register('userName', {
                                                required: '**Username required',
                                                pattern: {
                                                    value: /^[a-zA-Z ]+$/,
                                                    message: '**Username should contain only alphabets'
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: '**Username should contain atleast 3 letters'
                                                }
                                            })} className="form-control mx-3 fs-5" placeholder="Enter name" data-testid="name"></input>
                                            {errors.userName && <span className="text-danger mx-3 fs-6" data-testid="name_Error" name="nameError">{errors.userName.message}</span>}<br />
                                            <label className="mx-3 h5 fs-4">Email:</label>
                                            <input type="email" {...register('userEmail', {
                                                required: '**Email required',
                                                pattern: {
                                                    value: /^([a-z]+[.-\d]*)@([a-z-]+)\.([a-z-]{2,8})(\.[a-z]{2,8})?$/,
                                                    message: '**Invalid email format'
                                                }
                                            })} className="form-control mx-3 fs-5" placeholder="Enter email" data-testid="email" ></input>
                                            {errors.userEmail && <span className="text-danger mx-3 fs-6" data-testid="email_Error">{errors.userEmail.message}</span>}<br />
                                            <label className="mx-3 h5 fs-4">Phone:</label>
                                            <input type="text" {...register('contact', {
                                                required: '**Phone number required',
                                                pattern: {
                                                    value: /^[6-9]{1}[0-9]{9}$/,
                                                    message: '**Contact should contain 10 digits and start with 6/7/8/9'
                                                }
                                            })} className="form-control mx-3 fs-5" placeholder="Enter phone number" data-testid="phone"></input>
                                            {errors.contact && <span className="text-danger mx-3 fs-6" data-testid="phone_Error">{errors.contact.message}</span>}<br />
                                            <label className="mx-3 h5 fs-4">Password:</label>
                                            <input type="password" {...register('password', {
                                                required: '**Password required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9]{5,12}$/,
                                                    message: '**Password should contain atleast 5 characters and no special characters allowed'
                                                }
                                            })} className="form-control mx-3 fs-5" placeholder="Enter password" data-testid="password"></input>
                                            {errors.password && <span className="text-danger mx-3 fs-6" data-testid="password_Error">{errors.password.message}</span>}<br />
                                            <label className="mx-3 h5 fs-4">Confirm Password:</label>
                                            <input type="password" {...register('confirmPassword', {
                                                required: 'Confirm Password required',
                                                validate: confirm => confirm === password || 'Password mismatch'
                                            })} className="form-control mx-3 fs-5" placeholder="Retype password" data-testid="cnfmPass"></input>
                                            {errors.confirmPassword && <span className="text-danger mx-3 fs-6" data-testid="cnfmPass_Error">{errors.confirmPassword.message}</span>}<br />
                                            <div className="d-flex justify-content-center text-center  mb-lg-4">
                                                <button type="submit" className="btn btn-primary bg-gradient text-white mt-3 text-white fs-5 rounded-6">Register</button>
                                            </div>
                                            <div className="text-center h5 mt-3">
                                                <a className="mx-3 h6 fs-5" type="text" href="/login">Already have an account? <span className="text-primary">Login</span></a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}