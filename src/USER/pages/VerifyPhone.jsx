import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader'
import { clearVerifyOtp, registerOTP, verifyOTP } from '../services/slice/AuthSlice'

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
        const data = { phone_number: "+91" + phone.phone }
        dispatch(registerOTP(data))
        setTimeout(() => {
            if (reg_otp !== "Failed to send OTP") {
                toast.success("OTP Sent Successfully")
                setFlag(true)
                // setPhone({ phone: "" })
                setOtp({ otp: "" })
            } else if (reg_otp === "Failed to send OTP") {
                toast.error("Something Went Wrong Please Try Again")
                setFlag(false)
            }
        }, 10000)
    }

    // onVerify func.
    const onVerify = () => {
        const data = { phone_number: "+91" + phone.phone, otp: otp.otp }
        console.log(data);
        dispatch(verifyOTP(data))
        setTimeout(() => {
            if (verify_otp !== "Invalid OTP!") {
                setFlag(false)
                setOtp({ otp: "" })
                toast.success("OTP Verification Successfull. Please Continue")
                navigate('/signup')
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

                <div className='mt-5'>
                    <h2 className='text-decoration-underline text-center fw-bold' style={{ "color": "#f9772b" }}>Verify Your Phone  Number First</h2>
                </div>

                <div className="wrapper_area margin-top">
                    <div className="log_area">

                        <div className="right_part">
                            <div className="form_area">
                                <form method="post" encType="multipart/form-data" onSubmit={e => e.preventDefault()}>

                                    {/* Phone Number */}
                                    <div className="mb-5" style={{ "display": !flag ? "block" : "none" }}>
                                        <label htmlFor="phone" className="form-label label_style">Phone Number</label>
                                        <input
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
                                        />
                                        {/* Form Vaidation */}
                                        {/* <p className='text-danger fs-4 mt-2'>{error_user.error}</p> */}
                                    </div>

                                    <div className="text-center" style={{ "display": !flag ? "block" : "none" }}>
                                        <button
                                            onClick={sendOtp}
                                            type="submit"
                                            className={phone.phone.length > 9 ? active : deactive}
                                            disabled={phone.phone.length > 9 ? false : true}
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
                                            onClick={onVerify}
                                            type="submit"
                                            className={otp.otp.length === 6 ? active : deactive}
                                            disabled={otp.otp.length === 6 ? false : true}
                                        >Verify</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="left_part">
                            <div className="company_logo text-center">
                                <Link to="/"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer style={{ "fontSize": "16px" }} transition={Flip} position="top-center" autoClose={3000} /> */}
            </main>
        </>
    )
}

export default VerifyPhone