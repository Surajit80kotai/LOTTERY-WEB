import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../services/slice/AuthSlice'
import { toast } from 'react-toastify'
import { auth, google, facebook } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
// import { Flip, ToastContainer } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader';
// import Cookies from 'universal-cookie';


const Login = () => {
    const { login, loading } = useSelector((state) => state.authslice)
    const { error_user, error_password } = login
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [click, setClick] = useState(false)
    const [formValues, setFormValues] = useState({ email: "", password: "" })


    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        // console.log(formValues);
    }

    // cookies setup for remeberMe
    // const cookies = new Cookies()
    // cookies.set("email", formValues.email, { path: "/", secure: true })
    // cookies.set("password", formValues.password, { path: "/", secure: true })


    // handleSubmit Function for form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchLogin({ formValues, navigate, toast }))
        if (click) {
            // formValues.email = cookies.get("email")
            // formValues.password = cookies.get("password")
            // console.log(formValues.email)
            setFormValues({ email: formValues.email, password: formValues.password })
        }
        else {
            setFormValues({ email: "", password: "" })
        }
    }

    // socailLogin function
    const socialLogin = async (provider) => {
        const result = await signInWithPopup(auth, provider)
        window.localStorage.setItem("social_user", JSON.stringify(result?.user))
        window.localStorage.setItem("accessToken", JSON.stringify(result?.user?.accessToken))
        navigate('/')
        toast.success('Loged In Successfully')
        console.log(result);
    }


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main className="main">
                <div className="wrapper_area margin-top">
                    <div className="log_area">

                        <div className="right_part">
                            <div className="right_top">
                                <h2 className="heading_form">Login</h2>
                                <div className="social_sign">
                                    <button onClick={() => socialLogin(facebook)} className="social_signup"><i className="fab fa-facebook-f"></i></button>
                                    <button onClick={() => socialLogin(google)} className="social_signup"><i className="fab fa-google"></i></button>
                                </div>
                            </div>

                            <div className="form_area">
                                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                                    {/* Email Input */}
                                    <div className="mb-5">
                                        <label htmlFor="email" className="form-label label_style">Email</label>
                                        <input
                                            type="email"
                                            className="form-control form_input"
                                            id="email"
                                            name="email"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Email Id"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                        {/* Form Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{error_user.error}</p>
                                        {/*  <div className="alert alert-danger mt-2" role="alert">
                                                Please Enter Email Or Phone Number
                                            </div>  */}
                                    </div>

                                    {/* Password input */}
                                    <div className="">
                                        <label htmlFor="password" className="form-label label_style">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form_input"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                        />
                                        {/* Form Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{error_password.error}</p>
                                        {/* <div className="alert alert-danger mt-2" role="alert">
                                                Passwordis wrong
                                            </div> */}
                                    </div>
                                    <div className="bottom_form">

                                        {/* Remember Me section */}
                                        <div className="mb-3 form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input check_input"
                                                id="exampleCheck1"
                                                value={click}
                                                onChange={() => setClick(!click)}
                                            />
                                            <label className="form-check-label check_label" htmlFor="exampleCheck1">Remember Me</label>
                                        </div>

                                        {/* Forget password Link */}
                                        <div className="forget_password">
                                            <Link to="/f_password" className="forget_pass">Forget Password?</Link>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn_one">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="left_part">
                            <div className="company_logo text-center">
                                <Link to="/"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></Link>
                            </div>
                            <h2 className="log_title">Welcome To Login</h2>
                            <h6 className="dont">Don't Have Account?</h6>
                            <Link to="/signup" className="Signup">Sing Up</Link>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer style={{ "fontSize": "16px" }} transition={Flip} position="top-center" autoClose={3000} /> */}
            </main>
        </>
    )
}

export default Login