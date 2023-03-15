import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearVerifyOtp, fetchForgetPassOTP, setNewPassword, storePhoneNumber, verifyOTP } from '../services/slice/AuthSlice'
import { toast } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader'
import { Link, useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    const [formValues, setFormValues] = useState({ phone_code: "", contact: "" })
    const [password, setPassword] = useState({ newpassword: "", confirmPassword: "" })
    const [otp, setOtp] = useState({ otp: "" })
    const [err, setErr] = useState("")
    const [flag, setFlag] = useState(false)
    const [hidden, setHidden] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.authslice)
    const { reg_otp, verify_otp } = useSelector((state) => state.authslice)
    const { phoneCodeData } = useSelector((state) => state.countrystateslice)
    const { error } = useSelector((state) => state.authslice)


    // button style
    const active = "btn_one"
    const deactive = "btn_deactive"

    // sendOtp func.
    const sendOtp = () => {
        if (isNaN(formValues?.contact)) {
            const data = { user_id: formValues.contact, user_id_type: "email" }
            dispatch(fetchForgetPassOTP(data))
        } else {
            const data = { phone_code: formValues.phone_code, user_id: formValues.phone_code + formValues.contact, user_id_type: "phone" }
            dispatch(fetchForgetPassOTP(data))
        }
    }

    // onVerify func.
    const onVerify = () => {
        if (isNaN(formValues?.contact)) {
            const data = { phone_number: formValues.contact, otp: otp.otp }
            dispatch(verifyOTP(data))
        } else {
            const data = { phone_number: formValues.phone_code + formValues.contact, otp: otp.otp }
            dispatch(verifyOTP(data))
        }
    }

    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    //  onSubmit Function for recover password
    const onSubmit = () => {
        if (password.newpassword !== password.confirmPassword) {
            return setErr("Pasword did not matched")
        } else {
            if (isNaN(formValues?.contact)) {
                const data = { user_id: formValues.contact, password: password.newpassword, user_id_type: "email" }
                dispatch(setNewPassword({ data, navigate, toast }))
                setFormValues({ ...formValues, contact: "" })
            } else {
                const data = { phone_code: formValues.phone_code, user_id: formValues.phone_code + formValues.contact, password: password.newpassword, user_id_type: "phone" }
                dispatch(setNewPassword({ data, navigate, toast }))
                setErr("")
                setFormValues({ ...formValues, contact: "" })
            }
        }
    }

    useEffect(() => {
        if (reg_otp?.status === true) {
            setFlag(true)
            toast.success(reg_otp?.message)
            dispatch(clearVerifyOtp(reg_otp?.message))
        } else if (reg_otp?.status === false) {
            setFlag(false)
            toast.error(reg_otp?.message)
            dispatch(clearVerifyOtp(reg_otp?.message))
        }

        if (verify_otp?.status === true) {
            const data = { phone_number: formValues.phone_code + formValues.phone, otp: otp.otp }
            setFlag(false)
            setHidden(true)
            toast.success(verify_otp?.message)
            dispatch(storePhoneNumber(data.phone_number))
            navigate("/f_password")
            setOtp({ otp: "" })
            dispatch(clearVerifyOtp())
        } else if (verify_otp?.status === false) {
            toast.error(verify_otp?.message)
            navigate("/f_password")
            dispatch(clearVerifyOtp())
        }
    }, [dispatch, navigate, otp.otp, reg_otp, verify_otp])

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <div className="forget-password-main">
                {/* Back to home button */}
                <Link className='text-secondary' to='/'>
                    <h3 className='container text-end'><i className="fa-solid fa-house mx-2"></i>Home</h3>
                </Link>

                <div className="container">

                    <div className="forgetwrapper">
                        <div className="forget_icon">
                            <img src="assets/img/forgeticon.png" alt="" className="img-fluid" />
                        </div>
                        <h2 className="title text-center">Forget Your Password ?</h2>
                        <p className="text-center">Enter Your Phone Number Or Email Address Below To receive
                            <br />Your Password Reset instruction
                        </p>

                        <div style={{ "display": !hidden ? "block" : "none" }}>
                            {/* Phone */}
                            <div className="forget" style={{ "display": !flag ? "block" : "none" }}>
                                <label htmlFor="contact" className="form-label label_for">Enter Your Registered Phone Number Or Email</label>
                                <div className="row">
                                    {
                                        isNaN(formValues?.contact) ?
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <input
                                                        type="text"
                                                        className="form-control form_input"
                                                        id="contact"
                                                        name="contact"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Phone Or Email ID"
                                                        pattern="^((\+)?(\d{2}[-]))?(\d{10}){1}$|^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$"
                                                        title="Enter a valid email or phone number"
                                                        value={formValues.contact}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div className='row'>
                                                {/* <h6 style={{ "color": "#f9772b" }}>Select Country Code*</h6> */}
                                                <div className='col-2' style={{ "width": "18%" }}>
                                                    <select
                                                        className="form-select form_input form_select"
                                                        aria-label="Default select example"
                                                        id="selects"
                                                        name='phone_code'
                                                        value={formValues.phone_code}
                                                        onChange={handleChange}
                                                    >
                                                        {/* <option value="1" aria-readonly>Sel.</option> */}
                                                        {
                                                            phoneCodeData?.map((country) => {
                                                                return (
                                                                    <option value={country.dial_code} key={country._id}>{country.dial_code}&nbsp;&nbsp;&nbsp;&nbsp;{country.name}</option>
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
                                                        pattern="^((\+)?(\d{2}[-]))?(\d{10}){1}$|^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$"
                                                        title="Enter a valid email or phone number"
                                                        value={formValues.contact}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                    }
                                </div>
                                <div className="text-center" style={{ "margin": "30px 0 30px 0", "display": !flag ? "block" : "none" }}>
                                    <button
                                        onClick={sendOtp}
                                        type="submit"
                                        className={(formValues?.contact?.length > 9) ? active : deactive}
                                        disabled={(formValues?.contact?.length > 9) ? false : true}
                                    >Send OTP</button>
                                </div>
                            </div>

                            {/* OTP */}
                            <div className="forget" style={{ "display": flag ? "block" : "none" }}>
                                <label htmlFor="otp" className="form-label label_style">OTP</label>
                                <input
                                    type="tel"
                                    className="form-control form_input"
                                    id="otp"
                                    name="otp"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter OTP Here"
                                    pattern="[0-9]{6}"
                                    title="Accept Numbers Only"
                                    value={otp.otp}
                                    onChange={(e) => setOtp({ ...otp, [e.target.name]: e.target.value })}
                                    maxLength={6}
                                    required
                                />
                                <div className="text-center" style={{ "margin": "30px 0 30px 0", "display": flag ? "block" : "none" }}>
                                    <button
                                        onClick={onVerify}
                                        type="submit"
                                        className={(otp?.otp?.length) === 6 ? active : deactive}
                                        disabled={(otp?.otp?.length) === 6 ? false : true}
                                    >Verify</button>
                                </div>
                            </div>
                        </div>

                        <div style={{ "display": hidden ? "block" : "none" }}>
                            <div className="forget ">
                                {/* New Password */}
                                <div className="mb-5" style={{ "display": hidden ? "block" : "none" }}>
                                    <label htmlFor="newpassword" className="form-label label_style">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control form_input"
                                        id="newpassword"
                                        name="newpassword"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter New Password Here"
                                        value={password?.newpassword}
                                        onChange={(e) => setPassword({ ...password, [e.target.name]: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Re Enter Password */}
                            <div className="forget" style={{ "display": hidden ? "block" : "none" }}>
                                <label htmlFor="confirmPassword" className="form-label label_style">Re Enter Password</label>
                                <input
                                    type="password"
                                    className="form-control form_input"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Re Enter New Password Here"
                                    value={password?.confirmPassword}
                                    onChange={(e) => setPassword({ ...password, [e.target.name]: e.target.value })}
                                />
                                {/* Form Vaidation */}
                                <p className='text-danger fs-4 mt-3'>{error ? error : err}</p>
                            </div>

                            {/* Button */}
                            <div className="text-center">
                                <button type="submit" className="btn_one" style={{ "margin": "30px 0 30px 0" }} onClick={onSubmit}>Recover Password</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ForgetPassword