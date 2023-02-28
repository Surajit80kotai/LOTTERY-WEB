import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader'
import { clearVerifyOtp, registerOTP, verifyOTP } from '../services/slice/AuthSlice'
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
    const sendOtp = (regOtp) => {
        // console.log("inside function", regOtp);
        const data = { phone_number: "+" + phone }
        dispatch(registerOTP(data))
        setTimeout(() => {
            // console.log("inside condition", regOtp);
            if (regOtp) {
                toast.success("OTP Sent Successfully")
                setFlag(true)
            } else {
                toast.error("Something Went Wrong Please Try Again")
                setFlag(false)
            }
        }, 2000)
    }

    // onVerify func.
    const onVerify = (verifyOtp) => {
        const data = { phone_number: "+" + phone, otp: otp.otp }
        dispatch(verifyOTP(data))
        // console.log(data);
        setTimeout(() => {
            // console.log("inside condition", verifyOtp);
            if (verifyOtp) {
                setFlag(false)
                toast.success("OTP Verification Successfull. Please Continue")
                navigate('/signup')
                window.localStorage.setItem("verified_phone_number", JSON.stringify(data?.phone_number))
                setOtp({ otp: "" })
                setPhone({ phone: "" })
            } else {
                toast.error("Invalid OTP!")
                navigate('/verifyphone')
            }
        }, 2000)
    }


    useEffect(() => {
        return () => {
            dispatch(clearVerifyOtp())
        }
    }, [dispatch, reg_otp, verify_otp])


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main className="main">
                {/* Back to home button */}
                <Link className='text-secondary' to='/'>
                    <h3 className='container text-end'><i className="fa-solid fa-right-from-bracket mx-2"></i>Home</h3>
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
                                            country={"cm"}
                                            enableSearch={true}
                                            value={phone.phone}
                                            onChange={(phone) => setPhone(phone)}
                                            placeholder="Enter Your Phone Number"
                                        />
                                        {/* Form Vaidation */}
                                        {/* <p className='text-danger fs-4 mt-2'>{error_user.error}</p> */}
                                    </div>

                                    <div className="text-center" style={{ "display": !flag ? "block" : "none" }}>
                                        <button
                                            onClick={() => sendOtp(reg_otp)}
                                            type="submit"
                                            className={phone?.length ? active : deactive}
                                            disabled={phone?.length ? false : true}
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
                                        {/* Form Vaidation */}
                                        {/* <p className='text-danger fs-4 mt-2'>{error_user.error}</p> */}
                                    </div>

                                    <div className="text-center" style={{ "display": flag ? "block" : "none" }}>
                                        <button
                                            onClick={() => onVerify(verify_otp)}
                                            type="submit"
                                            className={otp.otp.length === 6 ? active : deactive}
                                            disabled={otp.otp.length === 6 ? false : true}
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