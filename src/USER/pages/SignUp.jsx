import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSignUp } from '../services/slice/AuthSlice'
import "slick-carousel/slick/slick.css";
import { Link, useNavigate } from 'react-router-dom'
import { fetchCountry, fetchStates } from '../services/slice/CountryStateSlice';
import PreLoader from '../components/core/preloader/PreLoader';
import { toast } from 'react-toastify'




const SignUp = () => {
    window.localStorage.removeItem("phone_number")
    const { signupErr, loading } = useSelector((state) => state.authslice)
    const { countryData } = useSelector((state) => state.countrystateslice)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { validPhoneNumber } = useSelector((state) => state.authslice)
    const initialState = {
        full_name: "",
        email: "",
        phone: validPhoneNumber,
        dob: "",
        country: "",
        password: "",
        confirmPassword: ""
    }
    const [formValues, setFormValues] = useState(initialState)
    const { full_name, email, dob, country, password, confirmPassword } = formValues
    const [error, setError] = useState("")

    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        const countryId = e.target.value

        if (countryId) {
            getCountryId(countryId)
        }
    }


    // handleSubmit Function for form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return setError("Pasword did not matched")
        } else {
            dispatch(fetchSignUp({ formValues, navigate, toast }))
            setError("")
        }
    }


    // getCountryId
    const getCountryId = (name) => {
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
    }, [dispatch, signupErr])

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main className="main">
                {/* Back to home button */}
                <Link className='text-secondary' to='/'>
                    <h3 className='container text-end'><i className="fa-solid fa-house mx-2"></i>Home</h3>
                </Link>

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
                                            value={full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                        {/* Full Name Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{signupErr?.full_name?.message}</p>
                                    </div>

                                    {/* Email */}
                                    <div className="m_gap">
                                        <label htmlFor="emailid" className="form-label label_style">Email</label>
                                        <input
                                            type="email"
                                            className="form-control form_input"
                                            id="email"
                                            name="email"
                                            aria-describedby="emailHelp"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Accept Email Format Only"
                                            placeholder="Enter Your Email Id"
                                            value={email}
                                            onChange={handleChange}
                                        />
                                        {/* Email Vaidation */}
                                        <p className='text-danger fs-4 mt-2'>{signupErr?.email?.message}</p>
                                    </div>

                                    {/* Phone */}
                                    {/* <div className="m_gap">
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
                                            value={phone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            required
                                        />
                                        Phone Vaidation
                                        <p className='text-danger fs-4 mt-2'>{signupErr?.phone?.message}</p>
                                    </div> */}

                                    <div className="row">

                                        {/* Date Of birth */}
                                        <div className="col-md">
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
                                                    value={dob}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {/* DOB Vaidation */}
                                                <p className='text-danger fs-4 mt-2'>{signupErr?.dob?.message}</p>
                                            </div>
                                        </div>

                                        {/* Country */}
                                        <div className="col-md">
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
                                                {/* Country Vaidation */}
                                                <p className='text-danger fs-4 mt-2'>{signupErr?.country?.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">

                                        {/* Create Password*/}
                                        <div className="col-md">
                                            <div className="m_gap mb-3">
                                                <label htmlFor="password" className="form-label label_style">Create Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form_input"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Create Your Password"
                                                    aria-describedby="emailHelp"
                                                    value={password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="col-md">
                                            <div className="m_gap mb-3">
                                                <label htmlFor="confirmPassword" className="form-label label_style">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form_input"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Confrim Password"
                                                    value={confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {/* ConfirmPassword Vaidation */}
                                                <p className='text-danger fs-4 mt-2'>{error}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn_one">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="left_part">
                            <div className="company_logo text-center">
                                <Link to="/"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></Link>
                            </div>
                            <h2 className="log_title">Welcome To Registration</h2>
                            <h6 className="dont">Already Have An Account?</h6>
                            <Link to="/login" className="Signup">Sing In</Link>
                        </div>
                    </div>
                </div>
            </main>
        </ >
    )
}

export default SignUp