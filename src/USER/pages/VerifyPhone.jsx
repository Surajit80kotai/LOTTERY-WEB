import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PreLoader from '../components/core/preloader/PreLoader'

const VerifyPhone = () => {

    const { loading } = useSelector((state) => state.authslice)
    const navigate = useNavigate()




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
                                <form method="post" encType="multipart/form-data">

                                    {/* Phone Number */}
                                    <div className="mb-5">
                                        <label htmlFor="phone" className="form-label label_style">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control form_input"
                                            id="phone"
                                            name="phone"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Your Phone Number"
                                            pattern="[0-9]{10}"
                                            title="Accept Numbers Only"
                                            // value=""
                                            // onChange=""
                                            maxLength={10}
                                            required
                                        />
                                        {/* Form Vaidation */}
                                        {/* <p className='text-danger fs-4 mt-2'>{error_user.error}</p> */}
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn_one">Send OTP</button>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="mb-5">
                                        <label htmlFor="otp" className="form-label label_style">OTP</label>
                                        <input
                                            type="tel"
                                            className="form-control form_input"
                                            id="otp"
                                            name="otp"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter OTP Here"
                                            pattern="[0-9]{10}"
                                            title="Accept Numbers Only"
                                            // value=""
                                            // onChange=""
                                            // maxLength={10}
                                            required
                                        />
                                        {/* Form Vaidation */}
                                        {/* <p className='text-danger fs-4 mt-2'>{error_user.error}</p> */}
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn_one">Next</button>
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