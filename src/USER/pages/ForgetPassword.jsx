import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearVerifyOtp, fetchForgetPassOTP, storePhoneNumber, verifyOTP } from '../services/slice/AuthSlice'
import { toast } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader'
import { Link, useNavigate } from 'react-router-dom'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

const ForgetPassword = () => {
    // const [formValues, setFormValues] = useState({ email: "" })
    // const [phone, setPhone] = useState({ phone_code: "", phone: "" })
    const [flag, setFlag] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [formValues, setFormValues] = useState({ phone_code: "", contact: "", password: "" })
    const [otp, setOtp] = useState({ otp: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.authslice)
    const { reg_otp, verify_otp } = useSelector((state) => state.authslice)
    const { phoneCodeData } = useSelector((state) => state.countrystateslice)


    // button style
    const active = "btn_one"
    const deactive = "btn_deactive"

    // sendOtp func.
    const sendOtp = () => {
        if (isNaN(formValues?.contact)) {
            const data = { user_id: formValues.contact, password: formValues.password, user_id_type: "email" }
            console.log("if", data);
            dispatch(fetchForgetPassOTP(data))
        } else {
            const data = { phone_code: formValues.phone_code, user_id: formValues.phone_code + formValues.contact, password: formValues.password, user_id_type: "phone" }
            console.log("else", data);
            dispatch(fetchForgetPassOTP(data))
        }
        // const data = { phone_number: phone.phone_code + phone.phone }
        // dispatch(fetchForgetPassOTP(data))
    }

    // onVerify func.
    const onVerify = () => {
        if (isNaN(formValues?.contact)) {
            const data = { phone_number: formValues.phone_code + formValues.phone, otp: otp.otp }
            console.log("if", data);
            dispatch(verifyOTP(data))
        } else {
            const data = { phone_number: formValues.phone_code + formValues.phone, otp: otp.otp }
            console.log("else", data);
            dispatch(verifyOTP(data))
        }
        // const data = { phone_number: phone.phone_code + phone.phone, otp: otp.otp }
        // dispatch(verifyOTP(data))
    }

    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    //  handleSubmit Function for form submit
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const formValues = { phone: "+" + phone }
    //     dispatch(fetchForgetPass({ formValues }))
    //     toast.info(`Link sent to your Phone ${formValues.phone}`)
    //     setPhone({ phone: "" })
    // }

    useEffect(() => {
        if (reg_otp?.status === true) {
            console.log("if", reg_otp);
            setFlag(true)
            toast.success(reg_otp?.message)
            dispatch(clearVerifyOtp(reg_otp?.message))
        } else if (reg_otp?.status === false) {
            console.log("else", reg_otp);
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
            setFormValues({ ...formValues, phone: "" })
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
                                <label htmlFor="contact" className="form-label label_for">Enter Your Registered Phone Number</label>
                                <div className="row">
                                    <div className='col-2' style={{ "width": "18%" }}>
                                        <select
                                            className="form-select form_input form_select"
                                            aria-label="Default select example"
                                            id="selects"
                                            name='phone_code'
                                            value={formValues.phone_code}
                                            onChange={handleChange}
                                        >
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
                                            type="tel"
                                            className="form-control form_input"
                                            id="contact"
                                            name="contact"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter A Valid Phone Number"
                                            pattern="^((\+)?(\d{2}[-]))?(\d{10}){1}$|^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$"
                                            title="Enter a valid phone number"
                                            maxLength={10}
                                            value={formValues.contact}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* <PhoneInput
                                    inputProps={{ required: true }}
                                    placeholder="Enter Your Phone Number"
                                    country={"cm"}
                                    enableSearch={true}
                                    value={phone.phone}
                                    onChange={(phone) => setPhone(phone)}
                                /> */}
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
                                    <label htmlFor="otp" className="form-label label_style">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control form_input"
                                        id="newpassword"
                                        name="newpassword"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter New Password Here"
                                        // value={otp.otp}
                                        // onChange={(e) => setOtp({ ...otp, [e.target.name]: e.target.value })}
                                        // maxLength={6}
                                        required
                                    />
                                </div>
                                {/* Form Vaidation */}
                                {/* <p className='text-danger fs-4 mt-2'>{error}</p> */}

                            </div>

                            {/* Re Enter Password */}
                            <div className="forget" style={{ "display": hidden ? "block" : "none" }}>
                                <label htmlFor="otp" className="form-label label_style">Re Enter Password</label>
                                <input
                                    type="password"
                                    className="form-control form_input"
                                    id="connfpassword"
                                    name="connfpassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Re Enter New Password Here"
                                // value={otp.otp}
                                // onChange={(e) => setOtp({ ...otp, [e.target.name]: e.target.value })}
                                // maxLength={6}
                                />
                            </div>

                            {/* Button */}
                            <div className="text-center">
                                <button type="submit" className="btn_one" style={{ "margin": "30px 0 30px 0" }}>Recover Password</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ForgetPassword