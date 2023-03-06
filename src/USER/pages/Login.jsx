import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../services/slice/AuthSlice'
import { toast } from 'react-toastify'
import { auth, google, facebook } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import PreLoader from '../components/core/preloader/PreLoader';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { fetchCountry } from '../services/slice/CountryStateSlice'


const Login = () => {
    const { login, loading } = useSelector((state) => state.authslice)
    const { countryData } = useSelector((state) => state.countrystateslice)
    const { error_user, error_password } = login
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [formValues, setFormValues] = useState({ phone: "", password: "" })
    const [phone, setPhone] = useState({ phone: "" })
    const [password, setPassword] = useState({ password: "" })

    // console.log(countryData);

    // const handleChange = (e) => {
    //     setFormValues({ ...formValues, [e.target.name]: e.target.value })
    // }

    // button style
    const active = "btn_one"
    const deactive = "btn_deactive"

    // handleSubmit Function for form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const formValues = { phone: "+" + phone, password: password.password }
        // console.log(formValues);
        dispatch(fetchLogin({ formValues, navigate, toast }))
    }

    // socailLogin function
    const socialLogin = async (provider) => {
        const result = await signInWithPopup(auth, provider)
        window.localStorage.setItem("user", JSON.stringify(result?.user))
        window.localStorage.setItem("token", JSON.stringify(result?.user?.accessToken))
        navigate('/')
        toast.success('Loged In Successfully')

        // To reload the page autometically after login
        setTimeout(() => {
            window.location.reload()
        }, 3500)

        console.log(result);
    }


    useEffect(() => {
        dispatch(fetchCountry())
    }, [dispatch])


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main className="main">
                {/* Back to home button */}
                <Link className='text-secondary' to='/'>
                    <h3 className='container text-end'><i className="fa-solid fa-house mx-2"></i>Home</h3>
                </Link>

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

                                    {/* Phone & Email Input */}
                                    <div className="mb-5">
                                        {/* <label htmlFor="contact" className="form-label label_style">Enter Phone Or Email ID</label>
                                        <div className='row'>
                                            <div className='col-3'>
                                                <select className="form-select form_input form_select" aria-label="Default select example" id="selects" name='phone_code'>
                                                    {
                                                        countryData?.map((country) => {
                                                            return (
                                                                <option value={country.phonecode} key={country._id}>{country.phonecode}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>


                                            <div className='col-9'>
                                                <input
                                                    type="text"
                                                    className="form-control form_input"
                                                    id="contact"
                                                    name="contact"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Phone Or Email ID"
                                                    pattern="^((\+)?(\d{2}[-]))?(\d{10}){1}$|^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$"
                                                    title="Enter a valid email or phone number"
                                                    required
                                                />
                                            </div>
                                        </div> */}

                                        <label htmlFor="email" className="form-label label_style">Phone Number</label>
                                        <PhoneInput
                                            inputProps={{ required: true }}
                                            placeholder="Enter Your Phone Number"
                                            country={"cm"}
                                            enableSearch={true}
                                            value={phone.phone}
                                            onChange={(phone) => setPhone(phone)}
                                        />
                                        {/* Form Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{error_user.error}</p>
                                    </div>

                                    {/* Password input */}
                                    <div className="">
                                        {/* <label htmlFor="password" className="form-label label_style">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form_input"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                            required
                                        /> */}
                                        <label htmlFor="password" className="form-label label_style">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form_input"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Password"
                                            value={password.password}
                                            onChange={(e) => setPassword({ ...password, [e.target.name]: e.target.value })}
                                            required
                                        />
                                        {/* Form Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{error_password.error}</p>
                                    </div>
                                    <div className="bottom_form">

                                        {/* Remember Me section */}
                                        {/* <div className="mb-3 form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input check_input"
                                                id="exampleCheck1"
                                                value={click}
                                                onChange={() => setClick(!click)}
                                            />
                                            <label className="form-check-label check_label" htmlFor="exampleCheck1">Remember Me</label>
                                        </div> */}
                                    </div>

                                    <div className="text-center">
                                        {/* <button type="submit" className="btn_one">Login</button> */}
                                        <button
                                            type="submit"
                                            className={(phone?.length) ? active : deactive}
                                            disabled={(phone?.length) ? false : true}
                                        >Login</button>
                                    </div>

                                    {/* Forget password Link */}
                                    <div className="forget_password d-flex justify-content-center mt-5">
                                        <span className='forget_pass mx-2'>Forget Password?</span><Link to="/f_password" className="forget_pass text-decoration-underline text-primary">Click Here</Link>
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
                            <Link to="/verifyphone" className="Signup">Sing Up</Link>
                        </div>
                    </div>
                </div >
                {/* <ToastContainer style={{ "fontSize": "16px" }} transition={Flip} position="top-center" autoClose={3000} /> */}
            </main >
        </>
    )
}

export default Login