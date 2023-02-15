import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSignUp } from '../services/slice/AuthSlice'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import { Link, useNavigate } from 'react-router-dom'
import { fetchCountry, fetchStates } from '../services/slice/CountryStateSlice';

const SignUp = () => {
    const { signupErr } = useSelector((state) => state.authslice)
    const newSignupErr = signupErr[0]
    // console.log("Sign up", newSignupErr);
    const { countryData } = useSelector((state) => state.countrystateslice)
    const { stateData } = useSelector((state) => state.countrystateslice)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        state: "",
        country: "",
        password: ""
    })


    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        const countryId = e.target.value
        if (countryId) {
            getCountryId(countryId)
        }
        // console.log(countryId)
    }


    // handleSubmit Function for form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchSignUp({ formValues, navigate }))
    }

    // Slider Settings
    const settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
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
    }, [dispatch, newSignupErr])

    return (
        <>
            {/* Left area */}
            <main className="main">
                <div className="wrapper_area">
                    <div className="log_area">
                        <div className="left_part">
                            <div className="slider_area">

                                {/* Left Side Slider */}
                                <Slider {...settings}>
                                    <div className="slider_item">
                                        <img src="assets/img/s1.jpg" alt="" className="img-fluid" />
                                    </div>
                                    <div className="slider_item">
                                        <img src="assets/img/s2.jpg" alt="" className="img-fluid" />
                                    </div>
                                    <div className="slider_item">
                                        <img src="assets/img/s3.jpg" alt="" className="img-fluid" />
                                    </div>
                                    <div className="slider_item">
                                        <img src="assets/img/s4.jpg" alt="" className="img-fluid" />
                                    </div>
                                </Slider>
                            </div>
                        </div>

                        {/* <!-- Right area --> */}
                        <div className="right_part">
                            <h2 className="heading_form">Register here</h2>
                            <div className="form_areas">

                                {/* Right Side Form area*/}
                                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                                    <div className="container">
                                        <div className="row">
                                            {/* First Name */}
                                            <div className="col-md-6">
                                                <div className="m_gap">
                                                    <label htmlFor="first_name" className="form-label label_style">First Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form_input"
                                                        id="first_name"
                                                        name="first_name"
                                                        value={formValues.first_name}
                                                        onChange={handleChange}
                                                        aria-describedby="emailHelp" />
                                                    <p className='text-danger mt-2 fs-4'>
                                                        {(newSignupErr?.first_name) ? "First Name is required" : null}
                                                    </p>

                                                </div>
                                            </div>

                                            {/* Last Name */}
                                            <div className="col-md-6">
                                                <div className="m_gap">
                                                    <label htmlFor="last_name" className="form-label label_style">Last Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form_input"
                                                        id="last_name"
                                                        name="last_name"
                                                        value={formValues.last_name}
                                                        onChange={handleChange}
                                                        aria-describedby="emailHelp"
                                                    />
                                                    <p className='text-danger mt-2 fs-4'>
                                                        {(newSignupErr?.last_name) ? "Last Name is required" : null}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="m_gap">
                                                <label htmlFor="email" className="form-label label_style">Enter Email Address</label>
                                                <input
                                                    type="email"
                                                    className="form-control form_input"
                                                    id="email"
                                                    name="email"
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                    aria-describedby="emailHelp"
                                                />
                                                <p className='text-danger mt-2 fs-4'>
                                                    {(newSignupErr?.email) ? "Email is required" : null}
                                                </p>

                                            </div>

                                            {/* Phone */}
                                            <div className="m_gap">
                                                <label htmlFor="phone" className="form-label label_style">Enter Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="form-control form_input"
                                                    id="phone"
                                                    name="phone"
                                                    value={formValues.phone}
                                                    onChange={handleChange}
                                                    aria-describedby="emailHelp"
                                                    maxLength={10}
                                                />
                                                <p className='text-danger mt-2 fs-4'>{(newSignupErr?.phone) ? "Phone Number is required" : null}</p>

                                            </div>

                                            {/* Date of birth */}
                                            <div className="m_gap dob">
                                                <label htmlFor="dob" className="form-label label_style">Date Of Birth</label>
                                                <input
                                                    type="date"
                                                    min="1960-01-01"
                                                    max="2019-01-01"
                                                    name='dob'
                                                    value={formValues.dob}
                                                    onChange={handleChange}
                                                    className="form-control form_input" />
                                                <p className='text-danger mt-2 fs-4'>{(newSignupErr?.dob) ? "Date of birth is required" : null}</p>
                                            </div>

                                            {/* Country */}
                                            <div className="m_gap">
                                                <label htmlFor="country" className="form-label label_style">Country</label>
                                                <select
                                                    className="form-select form_input form_select"
                                                    aria-label="Default select example"
                                                    name='country'
                                                    value={formValues.country}
                                                    onChange={handleChange}
                                                    id="selects">
                                                    <option value=""></option>
                                                    {
                                                        countryData?.map((country) => {
                                                            return (
                                                                <option key={country.countries_id
                                                                } value={country.name}>{country.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <p className='text-danger mt-2 fs-4'>{(newSignupErr?.country) ? "Country is required" : null}</p>

                                            </div>

                                            {/* State */}
                                            <div className="m_gap">
                                                <label htmlFor="state" className="form-label label_style">State</label>
                                                <select
                                                    className="form-select form_input form_select"
                                                    id="select"
                                                    name='state'
                                                    value={formValues.state}
                                                    onChange={handleChange}
                                                    aria-label="Default select example">
                                                    <option value=""></option>
                                                    {
                                                        stateData?.map((state) => {
                                                            return (
                                                                <option key={state.state_id} value={state.name}>{state.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <p className='text-danger mt-2 fs-4'>{(newSignupErr?.state) ? "State is required" : null}</p>
                                            </div>

                                            {/* Password */}
                                            <div className="m_gap mb-3">
                                                <label htmlFor="password" className="form-label label_style">Create Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form_input"
                                                    id="password"
                                                    name="password"
                                                    value={formValues.password}
                                                    onChange={handleChange}
                                                    aria-describedby="emailHelp"
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="text-center">
                                        <button type="submit" className="btn_one">Register</button>
                                    </div>

                                    {/* Redirect link for Login page */}
                                    <div className="not_regis">
                                        <h6 className="not_register">Already have an account?<span><Link to="/login"> Login Here</Link></span></h6>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </ >
    )
}

export default SignUp