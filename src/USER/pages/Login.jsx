import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../services/slice/AuthSlice'
import { toast } from 'react-toastify'
import { auth, google, facebook } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import PreLoader from '../components/core/preloader/PreLoader';
import { getPhoneCode } from '../services/slice/CountryStateSlice'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useTranslation } from 'react-i18next'


const Login = () => {
    const { t } = useTranslation()
    const { login, loading } = useSelector((state) => state.authslice)
    const { error_user, error_password } = login
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({ phone_code: "", contact: "", password: "" })
    const [phone, setPhone] = useState('')
    const [toggleBtn, setToggleBtn] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // toggle button function
    const toggleButton = () => {
        if (toggleBtn) {
            setToggleBtn(false)
        } else {
            setToggleBtn(true)
        }
    }

    // handle change function
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    // button style
    const active = "btn_one"
    const deactive = "btn_deactive"

    // handleSubmit Function for form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isNaN(formValues?.contact)) {
            const data = { user_id: formValues.contact, password: formValues.password, user_id_type: "email" }
            dispatch(fetchLogin({ data, navigate, toast }))
        } else {
            const data = phone?.length > 0 ? { user_id: "+" + phone, password: formValues.password, user_id_type: "phone" } : { user_id: phone, password: formValues.password, user_id_type: "phone" }
            dispatch(fetchLogin({ data, navigate, toast }))
        }
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

    // handlePassword
    const handlePassword = () => {
        if (showPassword === true) {
            setShowPassword(false)
        } else if (showPassword === false) {
            setShowPassword(true)
        }
    }

    useEffect(() => {
        dispatch(getPhoneCode())
    }, [dispatch])


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main className="main">
                {/* Back to home button */}
                <Link className='text-secondary' to='/'>
                    <h3 className='container text-end'><i className="fa-solid fa-house mx-2"></i>{t('Home')}</h3>
                </Link>

                <div className="wrapper_area margin-top">
                    <div className="log_area">

                        <div className="right_part">
                            <div className="right_top">
                                <h2 className="heading_form">{t('LOGIN')}</h2>
                                <div className="social_sign">
                                    <button onClick={() => socialLogin(facebook)} className="social_signup"><i className="fab fa-facebook-f"></i></button>
                                    <button onClick={() => socialLogin(google)} className="social_signup"><i className="fab fa-google"></i></button>
                                </div>
                            </div>

                            <div className="form_area">
                                {/* Toggle button for email or phone */}
                                <button className='btn fs-5 toogle_bg' style={{ "display": toggleBtn ? "block" : "none" }} onClick={toggleButton}>{t('Login With Phone')}</button>
                                <button className='btn fs-5 toogle_bg' style={{ "display": !toggleBtn ? "block" : "none" }} onClick={toggleButton}>{t('Login With Email')}</button>

                                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                                    {/* Email ID */}
                                    <div className="mb-5">
                                        <div className='row' style={{ "display": toggleBtn ? "block" : "none" }}>
                                            <label htmlFor="contact" className="form-label label_style">{t("Enter Email ID")}

                                            </label>
                                            <div className='col-12'>
                                                <input
                                                    type="text"
                                                    className="form-control form_input"
                                                    id="contact"
                                                    name="contact"
                                                    aria-describedby="emailHelp"
                                                    placeholder={t("Enter Your Email ID")}
                                                    pattern="^((\+)?(\d{2}[-]))?(\d{8}){1}$|^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$"
                                                    title={t("Enter a valid email or phone number")}
                                                    value={formValues.contact}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* <div className='row'>
                                            <div className='col-2' style={{ "width": "18%" }}>
                                                <select
                                                    className="form-select form_input form_select fw-bold"
                                                    aria-label="Default select example"
                                                    id="selects"
                                                    name='phone_code'
                                                    value={formValues.phone_code}
                                                    onChange={handleChange}
                                                >
                                                    <option className='fw-bold' value="1" aria-readonly>MDC</option>
                                                    {
                                                        phoneCodeData?.map((country, index) => {
                                                            return (
                                                                <option
                                                                    value={country.dial_code}
                                                                    key={index}
                                                                >
                                                                    {country.emoji}&nbsp;
                                                                    ({country.code})&nbsp;
                                                                    {country.name}&nbsp;
                                                                    ({country.dial_code})
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className='col-10' style={{ "width": "82%" }}>
                                                <input
                                                    type="text"
                                                    className="form-control form_input"
                                                    id="contact"
                                                    name="contact"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Phone Or Email ID"
                                                    pattern="^((\+)?(\d{1,3}[-]))?(\d{6,14}){1}$|^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$"
                                                    title="Enter a valid email or phone number"
                                                    value={formValues.contact}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div> */}

                                        {/* Phone Number */}
                                        <div className='row' style={{ "display": !toggleBtn ? "block" : "none" }}>
                                            <label htmlFor="contact" className="form-label label_style">{t('Enter Phone Number')}</label>
                                            <div className='col-12'>
                                                <PhoneInput
                                                    id='contact'
                                                    inputProps={{ required: true }}
                                                    placeholder={t("Enter Your Phone Number")}
                                                    country={"cm"}
                                                    enableSearch={true}
                                                    value={phone.phone}
                                                    onChange={
                                                        (value, data) => {
                                                            setPhone(value);
                                                            formValues.phone_code = data.dialCode
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* Toggle button for email or phone */}
                                        {/* <div className='mt-3'>
                                            <div className='mb-5' style={{ "display": !toggleBtn ? "block" : "none" }}>
                                                <button className='btn2 fs-5' onClick={toggleButton}>Login With Email</button>
                                            </div>
                                            <div className='mb-5' style={{ "display": toggleBtn ? "block" : "none" }}>
                                                <button className='btn2 fs-5' onClick={toggleButton}>Login With Phone</button>
                                            </div>
                                        </div> */}

                                        {/* Form Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{error_user.error}</p>
                                    </div>

                                    {/* Password input */}
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label label_style">{t('Password')} </label>
                                        <div className="password_input">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control form_input"
                                                id="password"
                                                name="password"
                                                placeholder={t("Enter Password")}
                                                value={formValues.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className='eye_btn'>
                                                {
                                                    showPassword ?
                                                        <button onClick={handlePassword} type='button'>
                                                            <i className="fas fa-eye" style={{ color: "#4d4d4d" }}></i>
                                                        </button>
                                                        :
                                                        <button onClick={handlePassword} type='button'>
                                                            <i className="fas fa-eye-slash" style={{ color: "#4d4d4d" }}></i>
                                                        </button>
                                                }
                                            </span>
                                        </div>

                                        {/* <label htmlFor="password" className="form-label label_style">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form_input"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Password"
                                            value={password.password}
                                            onChange={(e) => setPassword({ ...password, [e.target.name]: e.target.value })}
                                            required
                                        /> */}
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
                                            className={(formValues?.password?.length) ? active : deactive}
                                            disabled={(formValues?.password?.length) ? false : true}
                                        >{t('Login')}</button>
                                    </div>

                                    {/* Forget password Link */}
                                    <div className="forget_password d-flex justify-content-center mt-5">
                                        <span className='forget_pass mx-2'>{t('Forgot Password?')}</span><Link to="/f_password" className="forget_pass text-decoration-underline text-primary">{t('Click Here')}</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="left_part">
                            <div className="company_logo text-center">
                                <Link to="/"><img src="/assets/img/eshacplaylogo.png" alt="" className="img-fluid" /></Link>
                            </div>
                            <h2 className="log_title">{t('Welcome To ESHAC-PLAY')}</h2>
                            <h6 className="dont">{t("Don't Have Account?")}</h6>
                            <Link to="/verifyphone" className="Signup">{t('Sing Up')}</Link>
                        </div>
                    </div>
                </div >
            </main >
        </>
    )
}

export default Login