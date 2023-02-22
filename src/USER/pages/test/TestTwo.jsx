import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSignUp } from '../../services/slice/AuthSlice'
import { fetchCountry, fetchStates } from '../../services/slice/CountryStateSlice'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../config/firebase'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

const initialState = {
    full_name: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    password: "",
    confirmPassword: ""
}

const TestTwo = () => {
    const [flag, setFlag] = useState(false)
    const [formValues, setFormValues] = useState(initialState)
    const { full_name, email, phone, dob, country, password, confirmPassword } = formValues
    const [error, setError] = useState("")
    const [confirmObj, setConfrimObj] = useState("")
    const dispatch = useDispatch()
    const { countryData } = useSelector((state) => state.countrystateslice)

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        const countryId = e.target.value

        // console.log(formValues);

        if (countryId) {
            getCountryId(countryId)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return setError("Pasword did not matched")
        } else {
            dispatch(fetchSignUp({ formValues }))
            setError("")
        }
    }


    const setupRecaptcha = (number) => {
        const recapchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
        recapchaVerifier.render()
        return signInWithPhoneNumber(auth, number, recapchaVerifier)
    }

    const onNext = async (e) => {
        try {
            const response = await setupRecaptcha(phone)
            console.log(response);
            setConfrimObj(response)
            console.log(confirmObj);
        } catch (err) {
            console.log(err);
        }
        e.preventDefault()
        setFlag(true)
    }


    // getCountryId
    const getCountryId = (name) => {
        // console.log(name);
        const c_Id = countryData.filter((item) => {
            if (item.name === name) {
                return item?.countries_id
            }
            return null
        })
        const id = c_Id[0]?.countries_id
        if (id) {
            dispatch(fetchStates(id))
        }
    }



    useEffect(() => {
        dispatch(fetchCountry())
    }, [dispatch])


    return (
        <>
            <main className="main mb-5">
                <div className="wrapper_area margin-top-5">
                    <div className="log_area">
                        <div className="right_part">
                            <div className="form_areas">
                                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

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
                                            value={full_name}
                                            onChange={handleChange}
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
                                            // pattern="[0-9]{10}"
                                            title="Accept Numbers Only"
                                            // maxLength={10}
                                            required
                                            value={phone}
                                            onChange={handleChange}
                                        />
                                        {/* <PhoneInput
                                            country="IND"
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
                                            placeholder="Enter Your Phone Number"
                                        /> */}
                                        <div id="recaptcha-container" className='mt-3' />
                                    </div>
                                    <button onClick={setupRecaptcha} className='btn btn-primary fs-4 mt-3'>Send OTP</button>

                                    {/* recaptcha */}

                                    <div className="row">
                                        {/* OTP*/}
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
                                                // required
                                                // value={full_name}
                                                // onChange={handleChange}
                                                />
                                            </div>
                                            <button onClick={onNext} className='btn btn-primary fs-4'>Verify</button>
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
                                            value={email}
                                            onChange={handleChange}

                                        />
                                    </div>

                                    {/* Date Of birth */}
                                    <div className="col-md" style={{ "display": flag ? "block" : "none" }}>
                                        <div className="m_gap dob">
                                            <label htmlFor="dob" className="form-label label_style">Date Of Birth</label>
                                            <input
                                                placeholder="Select your date"
                                                pattern="^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$"
                                                type="date"
                                                name="dob"
                                                id="datepicker"
                                                className="calendar form-control form_input cal_input"
                                                required
                                                value={dob}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div className="col-md" style={{ "display": flag ? "block" : "none" }}>
                                        <div className="m_gap">
                                            <label htmlFor="Country" className="form-label label_style">Country</label>
                                            <select
                                                className="form-select form_input form_select"
                                                aria-label="Default select example"
                                                id="selects"
                                                name='country'
                                                value={country}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="1">Select...</option>
                                                {
                                                    countryData?.map((country) => {
                                                        return (
                                                            <option key={country.countries_id
                                                            } value={country.name + "||" + country.countries_id}>{country.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
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
                                                    value={password}
                                                    onChange={handleChange}
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
                                                    value={confirmPassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <p className='text-danger fs-4 mt-2'>{error}</p>
                                        </div>
                                    </div>

                                    <div className="text-center" style={{ "display": flag ? "block" : "none" }}>
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