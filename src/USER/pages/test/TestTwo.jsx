import React, { useState } from 'react'

const TestTwo = () => {
    const [flag, setFlag] = useState(false)

    const sendOtp = () => {
        console.log("OTP Send");
    }

    const onNext = (e) => {
        e.preventDefault()
        setFlag(true)
    }

    return (
        <>
            <main className="main">
                <div className="wrapper_area margin-top-5">
                    <div className="log_area">
                        <div className="right_part">
                            <div className="form_areas">
                                <form method="post" encType="multipart/form-data">

                                    {/* Full name */}
                                    <div className="m_gap">
                                        <label htmlFor="full_name" className="form-label label_style">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control form_input"
                                            id="full_name"
                                            name="full_name"
                                            placeholder="Enter Your Full Name"
                                            title="Accept Alphabets & Whitespaces Only"
                                            pattern='^[a-zA-Z ]+$'
                                            aria-describedby="emailHelp"
                                            required
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="m_gap">
                                        <label htmlFor="mobile_code" className="form-label label_style">Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control form_input"
                                            id="mobile_code"
                                            name="phone"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Your Phone Number"
                                            pattern="[0-9]{10}"
                                            title="Accept Numbers Only"
                                            maxLength={10}
                                            required
                                        />
                                        <button onClick={sendOtp} className='btn btn-primary'>Send OTP</button>
                                    </div>

                                    <div className="row">
                                        {/* Create Password*/}
                                        <div className="col-md">
                                            <div className="m_gap mb-3">
                                                <label htmlFor="otp" className="form-label label_style">OTP</label>
                                                <input
                                                    type="tel"
                                                    className="form-control form_input"
                                                    id="otp"
                                                    name="otp"
                                                    placeholder="Enter OTP Here"
                                                    aria-describedby="emailHelp"
                                                    required
                                                />
                                            </div>
                                            <button onClick={onNext} className='btn btn-primary'>Submit OTP</button>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="m_gap" style={{ "display": flag ? "block" : "none" }}>
                                        <label htmlFor="emailid" className="form-label label_style">Email</label>
                                        <input
                                            type="email"
                                            className="form-control form_input"
                                            id="email"
                                            name="email"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Your Email Id"

                                        />
                                    </div>

                                    {/* Date Of birth */}
                                    <div className="col-md" style={{ "display": flag ? "block" : "none" }}>
                                        <div className="m_gap dob">
                                            <label htmlFor="dob" className="form-label label_style">Date Of Birth</label>
                                            {/* <!-- <input type="date" value="2017-01-01" min="1960-01-01" max="2019-01-01" className="form-control form_input"> --> */}
                                            <input
                                                placeholder="Select your date"
                                                pattern="^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$"
                                                type="date"
                                                name="dob"
                                                id="datepicker"
                                                className="calendar form-control form_input cal_input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row">

                                        {/* Create Password*/}
                                        <div className="col-md" style={{ "display": flag ? "block" : "none" }}>
                                            <div className="m_gap mb-3">
                                                <label htmlFor="password" className="form-label label_style">Create Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form_input"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Create Your Password"
                                                    aria-describedby="emailHelp"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="col-md" style={{ "display": flag ? "block" : "none" }}>
                                            <div className="m_gap mb-3">
                                                <label htmlFor="confirmPassword" className="form-label label_style">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form_input"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Confrim Password"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn_one">Register</button>
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

export default TestTwo