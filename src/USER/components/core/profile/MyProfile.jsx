import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCountry } from '../../../services/slice/CountryStateSlice'
import { updateProfile } from '../../../services/slice/UserSlice'
import { toast } from 'react-toastify'
import PreLoader from '../preloader/PreLoader'


const MyProfile = () => {
    const { countryData, loading } = useSelector((state) => state.countrystateslice)
    const user = JSON.parse(window.localStorage.getItem("user"))
    const social_user = JSON.parse(window.localStorage.getItem("social_user"))
    const date_of_birth = new Date(user?.dob)
    const newDOB = `${date_of_birth.getUTCDay()}-${date_of_birth.getUTCMonth()}-${date_of_birth.getUTCFullYear()}`
    const [formValues, setFormValues] = useState({
        full_name: user?.full_name,
        phone: user?.phone
    })
    const dispatch = useDispatch()
    // const userCurrency = (JSON.parse(window.localStorage.getItem("user"))?.currency)
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)


    // handleChange for onChange
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    // handleSubmit for onSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ formValues, toast }))
    }

    // Edit button function
    function enabledEdit() {
        let inputs = document.getElementsByClassName("in_disa");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
        // document.getElementById("saveChanges").style.display = "block";
        document.getElementById("saveChanges").classList.remove("hidden");
        document.getElementById("remEdit").classList.add("hidden");
    }


    useEffect(() => {
        dispatch(fetchCountry())
    }, [dispatch])

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <div className="content_wrapper">
                <div className="container">
                    <div className="user_information_area">
                        <h3 className="user_title">Personal Information</h3>
                        <div className="row mt-5">
                            <div className="col-md-3">
                                {
                                    user ?
                                        <div className="profile_img ">
                                            <img src="/assets/img/avatar.png" alt="" className="img-fluid" />
                                        </div>
                                        :
                                        <div className="profile_img ">
                                            {
                                                social_user?.photoUrl ?
                                                    <img src={social_user?.photoUrl} alt="" className="img-fluid" />
                                                    : <img src="/assets/img/avatar.png" alt="" className="img-fluid" />
                                            }
                                        </div>
                                }

                                {
                                    user ?
                                        <div className="user_name">
                                            <h2 className=" text-center mt-3">{user?.full_name}</h2>
                                        </div>
                                        :
                                        <div className="user_name">
                                            <h2 className=" text-center mt-3">{social_user?.displayName}</h2>
                                        </div>
                                }

                            </div>
                            <div className="col-md-9">
                                <div className="profile_edit_form">
                                    <form method="post" onSubmit={handleSubmit}>

                                        {/* Full Name */}
                                        <div className="mb-3">
                                            <label htmlFor="full_name" className="form-label label_style">Your Full Name</label>
                                            {
                                                user ?
                                                    <input
                                                        type="text"
                                                        className="form-control form_input in_disa"
                                                        id="full_name"
                                                        name="full_name"
                                                        placeholder={user?.full_name}
                                                        value={formValues.full_name}
                                                        onChange={handleChange} disabled
                                                    />
                                                    : <input
                                                        type="text"
                                                        className="form-control form_input in_disa"
                                                        id="full_name"
                                                        name="full_name"
                                                        placeholder={social_user?.displayName}
                                                        onChange={handleChange} disabled
                                                    />
                                            }
                                        </div>

                                        {/* Email */}
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label label_style">Email</label>
                                            {
                                                user ?
                                                    <input
                                                        type="email"
                                                        className="form-control form_input in_disa"
                                                        id="email"
                                                        name="email"
                                                        aria-describedby="emailHelp"
                                                        placeholder={user?.email} disabled
                                                        onChange={handleChange}
                                                        readOnly
                                                    />
                                                    :
                                                    <input
                                                        type="email"
                                                        className="form-control form_input in_disa"
                                                        id="email"
                                                        name="email"
                                                        aria-describedby="emailHelp"
                                                        placeholder={social_user?.email}
                                                        onChange={handleChange}
                                                        readOnly
                                                    />
                                            }
                                        </div>

                                        {/* Phone */}
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label label_style">Phone Number</label>
                                            {
                                                user ?
                                                    <input
                                                        type="text"
                                                        className="form-control form_input in_disa"
                                                        id="phone"
                                                        name="phone"
                                                        aria-describedby="emailHelp"
                                                        placeholder={user?.phone} disabled
                                                        value={formValues.phone}
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                    />
                                                    :
                                                    <input
                                                        type="text"
                                                        className="form-control form_input in_disa"
                                                        id="phone"
                                                        name="phone"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Phone number did not registered"
                                                        readOnly
                                                        disabled
                                                    />

                                            }
                                        </div>

                                        {/* DOB */}
                                        <div className="mb-3">
                                            <label htmlFor="dob" className="form-label label_style">Date Of Birth</label>
                                            {
                                                user ?
                                                    <input
                                                        type="text"
                                                        className="form-control form_input in_disa"
                                                        id="dob"
                                                        name="dob"
                                                        aria-describedby="emailHelp"
                                                        placeholder={newDOB}
                                                        value={formValues.dob} disabled
                                                        onChange={handleChange}
                                                        readOnly
                                                    />
                                                    :
                                                    <input
                                                        type="text"
                                                        className="form-control form_input in_disa"
                                                        id="dob"
                                                        name="dob"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Birth date did not registered"
                                                        readOnly
                                                        disabled
                                                    />
                                            }

                                        </div>

                                        {/* Country */}
                                        <div className="mb-3">
                                            <label htmlFor="country" className="form-label label_style">Address</label>
                                            {
                                                user ?
                                                    <select
                                                        className="form-select form_input form_select"
                                                        aria-label="Default select example"
                                                        id="selects"
                                                        name='country'
                                                        value={formValues.country}
                                                        onChange={handleChange}
                                                        disabled >
                                                        {
                                                            countryData?.map((country) => {
                                                                return (
                                                                    <option key={country.countries_id
                                                                    } value={country.name + "||" + country.countries_id}>{country.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    :
                                                    <select
                                                        className="form-select form_input form_select"
                                                        aria-label="Default select example"
                                                        id="selects"
                                                        name='country'
                                                        disabled >
                                                        <option readOnly>Country number did not registered</option>
                                                    </select>
                                            }
                                        </div>

                                        {/* Edit Button */}
                                        <div className="mt-5">
                                            <button type="button" className="editbtn edit"
                                                id="remEdit"
                                                onClick={enabledEdit}
                                            ><i className="fas fa-edit"></i> Edit</button>
                                            <button className="btn2 hidden" id="saveChanges" >Save Changes</button>

                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mb-4">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="one_total_box">
                                <div className="content_total">
                                    <div className="one_total_title">
                                        <h3>Congratulation John !</h3>
                                    </div>
                                    <p>Best Play of the month</p>
                                    <div className="total_amount">
                                        <h4>{userCurrency_symbol}42.8k</h4>
                                    </div>
                                    <div className="mt-5">
                                        <Link to="#!" className="btn2">View all</Link>
                                    </div>
                                </div>
                                <div className="total_icon">
                                    <img src="/assets/img/9206435 1.png" alt="" />
                                </div>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="one_total_box">
                                <div className="content_total">
                                    <div className="one_total_title">
                                        <h3>Total Winning</h3>
                                    </div>
                                    <p>Best Play of the month</p>
                                    <div className="total_amount">
                                        <h4>42</h4>
                                    </div>
                                    <div className="mt-5">
                                        <Link to="#!" className="btn2">View all</Link>
                                    </div>
                                </div>
                                <div className="total_icon">
                                    <img src="/assets/img/winning.png" alt="" />
                                </div>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="one_total_box">
                                <div className="content_total">
                                    <div className="one_total_title">
                                        <h3>Total Profit</h3>
                                    </div>
                                    <p>Best Play of the month</p>
                                    <div className="total_amount">
                                        <h4>{userCurrency_symbol}42.8k</h4>
                                    </div>
                                    <div className="mt-5">
                                        <Link to="#!" className="btn2">View all</Link>
                                    </div>
                                </div>
                                <div className="total_icon">
                                    <img src="/assets/img/9206435 1.png" alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile