import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../services/slice/AuthSlice'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import { auth, google } from '../util/Firebase'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {
    const { login } = useSelector((state) => state.authslice)
    const { error_user, error_password } = login
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [click, setClick] = useState(false)
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })


    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        // console.log(formValues);
    }

    // handleSubmit Function for form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchLogin({ formValues, navigate, click }))

        if (click) {
            setFormValues({ email: formValues.email, password: formValues.password })
        }
        else {
            setFormValues({ email: "", password: "" })
        }
    }


    // Slider Settings
    const settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    // Login With Google
    const loginWithGoogle = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider)
            // console.log(result?.user);
            window.localStorage.setItem("displayName", result?.user?.displayName)
            window.localStorage.setItem("accessToken", result?.user?.stsTokenManager?.accessToken)
            navigate('/')
            return result?.user
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <main className="main">
                <div className="wrapper_area">
                    <div className="log_area">

                        {/* left area */}
                        <div className="left_part">
                            <div className="slider_area">

                                {/* Left side Slider Area */}
                                <Slider {...settings}>
                                    <div className="slider_item">
                                        <img src="assets/img/s1.jpg" alt="" className="img-fluid" />
                                    </div>
                                    <div className="slider_item">
                                        <img src="assets/img/s2.jpg" alt="" className="img-fluid" />
                                    </div>
                                    <div className="slider_item">
                                        <img src="assets/img/s3.jpg" alt="" className="img-fluid" />
                                    </div>
                                    <div className="slider_item">
                                        <img src="assets/img/s4.jpg" alt="" className="img-fluid" />
                                    </div>
                                </Slider>
                            </div>
                        </div>

                        {/* right area  */}
                        <div className="right_part">
                            <h2 className="heading_form">Login</h2>
                            <div className="form_area">
                                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                                    {/*Email */}
                                    <div className="mb-5">
                                        <label htmlFor="email" className="form-label label_style">Email</label>
                                        <input
                                            type="email"
                                            className="form-control form_input"
                                            id="email"
                                            name="email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                            aria-describedby="emailHelp" />
                                        {/* Form Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{error_user.error}</p>

                                    </div>

                                    {/*Password */}
                                    <div className="mt-5">
                                        <label htmlFor="password" className="form-label label_style">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form_input"
                                            id="password"
                                            name="password"
                                            value={formValues.password}
                                            onChange={handleChange} />
                                        {/* Form Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{error_password.error}</p>

                                    </div>

                                    <div className="bottom_form">

                                        {/*Remember Me Section*/}
                                        <div className="mb-3 form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input check_input"
                                                id="exampleCheck1"
                                                value={click}
                                                onChange={() => setClick(!click)} />
                                            <label className="form-check-label check_label" htmlFor="exampleCheck1">Remember Me</label>
                                        </div>

                                        {/* Forget Password Link */}
                                        <div className="forget_password">
                                            <Link to="/f_password" className="forget_pass">Forget Password?</Link>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn_one">Login</button>
                                    </div>

                                    {/* Redirecting to signup */}
                                    <div className="not_regis">
                                        <h6 className="not_register">Not Register?<span><Link to="/signup"> Sign Up Here</Link></span></h6>
                                    </div>
                                    <div className="or_divider">
                                        <h6 className="or_style">Or</h6>
                                    </div>

                                    {/* Login with social media accout */}

                                    <div className="another_process">
                                        <Link to="" className="login_withfb"><span><img src="assets/img/fb.png" alt="" /></span>Continue with Facebook</Link>
                                        <Link onClick={() => loginWithGoogle(google)} className="login_withfb"><span><img src="/assets/img/google.png" alt="" /></span>Continue with Google</Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default Login