import React from 'react';
import { useState, useEffect } from "react";
import { login } from "../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { successMessage, success } = useSelector(state => state.user)
    const [credentials, setCredentials] = useState({
        userEmail: '',
        password: ''
    })

    const changeHandler = (event) => {
        setCredentials((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(login(credentials))
    }

    useEffect(() => {
        if (successMessage === "Successfully logged in") {
            toast.success(successMessage, {
                autoClose : 1500
            })
            setTimeout(() => {navigate('/home')
            window.location.reload()}, 2000)
        }
        // eslint-disable-next-line
    }, [successMessage, success])

    return (
        <>
        {/* <ToastContainer /> */}
            <div className="container h-100 ">
                <div className="row mt-5">
                    <div className="col-lg-12 form d-flex justify-content-center align-items-center mt-5">
                        <div className="card text-black bg-light mb-5  w-50">
                            <div className="card-body">
                                <div className="row d-flex justify-content-center w-100">
                                    <div className="col-md-5 col-lg-6 col-xl-5">
                                        <form onSubmit={submitHandler} className="mb-3 fs-3">
                                            <div className="align-items-center text-center h1 fw-bold mb-4 bg-gradient rounded-6 p-2">
                                                <span>Login</span></div>
                                            <label className="mx-3 h5 fs-4">User Email </label>
                                            <input type="email" className="form-control mx-3 fs-5" name="userEmail" value={credentials.userEmail} onChange={changeHandler} placeholder="Your email"></input>
                                            <span className="text-danger mx-3"></span><br />
                                            <label className="mx-3 h5 fs-4">Password </label>
                                            <input type="password" className="form-control mx-3 fs-5" name="password" value={credentials.password} onChange={changeHandler} placeholder="Your password"></input>
                                            <span className="text-danger mx-3"></span><br />
                                            <div className="d-flex justify-content-center text-center  mb-lg-4">
                                                <button className="btn btn-primary bg-gradient text-white mt-3 text-white fs-5 rounded-6" type="submit">Login</button>
                                            </div>
                                            <div className="text-center h5 mt-3">
                                                <a className="mx-3 h6 fs-5" type="text" href="/register"><span className="text-primary">Don't have an account? Register</span></a>
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