import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader'
import { clearVerifyOtp, registerOTP, storePhoneNumber, verifyOTP } from '../services/slice/AuthSlice'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const VerifyPhone = () => {
    const [phone, setPhone] = useState({ phone: "" })
    const [otp, setOtp] = useState({ otp: "" })
    const [flag, setFlag] = useState(false)
    const { loading } = useSelector((state) => state.authslice)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { reg_otp, verify_otp } = useSelector((state) => state.authslice)


    // button style
    const active = "btn_one"
    const deactive = "btn_deactive"

    // sendOtp func.
    const sendOtp = () => {
        const data = { phone_number: "+" + phone }
        dispatch(registerOTP(data))
    }

    // onVerify func.
    const onVerify = () => {
        const data = { phone_number: "+" + phone, otp: otp.otp }
        dispatch(verifyOTP(data))
    }



    useEffect(() => {
        if (reg_otp === true) {
            setFlag(true)
            toast.success("OTP Sent Successfully. Enter Your OTP")
            dispatch(clearVerifyOtp())
        } else if (reg_otp === false) {
            setFlag(false)
            toast.error("Opps!! Something Went Wrong. Please Try Again")
        }

        if (verify_otp === true) {
            const data = { phone_number: "+" + phone, otp: otp.otp }
            setFlag(false)
            toast.success("OTP Verification Successfull. Please Continue")
            dispatch(storePhoneNumber(data.phone_number))
            navigate("/signup")
            setOtp({ otp: "" })
            setPhone({ phone: "" })
            dispatch(clearVerifyOtp())
        } else if (verify_otp === false) {
            toast.error("Invalid OTP!!")
            navigate('/verifyphone')
        }
    }, [dispatch, navigate, otp.otp, reg_otp, verify_otp])


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
                                <h2 className="heading_form mt-3">Verify Your Phone  Number</h2>
                            </div>
                            <div className="form_area mt-5">
                                <form method="post" encType="multipart/form-data" onSubmit={e => e.preventDefault()}>

                                    {/* Phone Number */}
                                    <div className="mb-5" style={{ "display": !flag ? "block" : "none" }}>
                                        <label htmlFor="phone" className="form-label label_style">Enter Phone Number</label>
                                        {/* <input
                                            type="tel"
                                            className="form-control form_input"
                                            id="phone"
                                            name="phone"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Your Phone Number"
                                            pattern="[0-9]{10}"
                                            title="Accept Phone Numbers With Country Code"
                                            value={phone.phone}
                                            onChange={(e) => setPhone({ ...phone, [e.target.name]: e.target.value })}
                                            maxLength={10}
                                            required
                                        /> */}
                                        <PhoneInput
                                            inputProps={{ required: true }}
                                            placeholder="Enter Your Phone Number"
                                            country={"cm"}
                                            enableSearch={true}
                                            value={phone.phone}
                                            onChange={(phone) => setPhone(phone)}
                                        />
                                    </div>

                                    <div className="text-center" style={{ "display": !flag ? "block" : "none" }}>
                                        <button
                                            onClick={sendOtp}
                                            type="submit"
                                            className={(phone?.length) ? active : deactive}
                                            disabled={(phone?.length) ? false : true}
                                        >Send OTP</button>
                                    </div>

                                    {/* OTP */}
                                    <div className="mb-5" style={{ "display": flag ? "block" : "none" }}>
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
                                    </div>

                                    <div className="text-center" style={{ "display": flag ? "block" : "none" }}>
                                        <button
                                            onClick={onVerify}
                                            type="submit"
                                            className={(otp.otp.length) === 6 ? active : deactive}
                                            disabled={(otp.otp.length) === 6 ? false : true}
                                        >Verify</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="left_part mb-5">
                            <div className="company_logo text-center">
                                <Link to="/"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></Link>
                            </div>
                            <h2 className="log_title">Welcome Phone Number Verification</h2>
                            <h6 className="dont">Already Have An Account?</h6>
                            <Link to="/login" className="Signup">Sing In</Link>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer style={{ "fontSize": "16px" }} transition={Flip} position="top-center" autoClose={3000} /> */}
            </main>
        </>
    )
}

export default VerifyPhone