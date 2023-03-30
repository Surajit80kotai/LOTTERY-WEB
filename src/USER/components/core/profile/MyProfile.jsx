import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// import { Link } from 'react-router-dom'
import { updateProfile } from '../../../services/slice/UserSlice'
import PreLoader from '../preloader/PreLoader'
import SideNav from './SideNav'
// import { currency_symbol, generalCurrency_symbol, otherCurrency_symbol } from '../../../util/Currency'


const MyProfile = () => {
    const { loading } = useSelector((state) => state.userslice)
    const user = JSON.parse(window.localStorage.getItem("user"))
    const date_of_birth = new Date(user?.dob)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const newDOB = `${date_of_birth.getUTCDate()}-${month[date_of_birth.getUTCMonth()]}-${date_of_birth.getUTCFullYear()}`
    const [showEditButton, setShowEditButton] = useState(true)

    // baseUrl
    // const baseUrl = process.env.REACT_APP_BASE_URL
    const baseNodeUrl = process.env.REACT_APP_NODE_HOST


    const [image, setImage] = useState(null)
    const [formValues, setFormValues] = useState({
        profile: "profile",
        full_name: user?.full_name,
        email: user?.email,
        phone: user?.phone,
        profile_img: user?.profile_img,
        gender: user?.gender
    })

    const dispatch = useDispatch()

    // userID
    // const userID = (JSON.parse(window.localStorage.getItem("user")))?.user_id

    // token
    // const token = (JSON.parse(window.localStorage.getItem("token")))


    // handleChange for onChange
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    // console.log(user?.profile_img.split("/"));
    // console.log(user?.profile_img.split("/")[4]);

    const handleSubmit = (e) => {
        setShowEditButton(true)
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile', "profile");
        // image ? formData.append('profile_img', image) : formData.append('profile_img', user?.profile_img?.split("/")[4])
        formData.append('profile_img', image ? image : user?.profile_img.split("/")[4]);
        formData.append('full_name', formValues?.full_name);
        formData.append('email', formValues?.email);
        formData.append('phone', formValues?.phone);

        dispatch(updateProfile({ formData, toast }))

        let inputs = document.getElementsByClassName("in_disa");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    };

    // handleProfileImg
    const handleProfileImg = (e) => {
        const data = e.target.files[0]
        setImage(data)
        // console.log(data);
    }


    // Edit button function
    const enabledEdit = () => {
        setShowEditButton(false)
        let inputs = document.getElementsByClassName("in_disa");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <main>
                {/* PreLoader */}
                {loading && <PreLoader />}

                <div className="sidebar_wrapper">
                    {/* Left Side */}
                    <SideNav />
                    {/* Right Side */}
                    <div className="content_wrapper">
                        <div className="container">
                            <div className="user_information_area">
                                <h3 className="user_title">Personal Information</h3>
                                {/* <form method="post" encType='multipart/form-data'> */}
                                <form>
                                    <div className="row mt-5">
                                        <div className="col-md-3">
                                            {
                                                user ?
                                                    <div className="profile-pic">
                                                        <input
                                                            className='in_disa'
                                                            type="hidden"
                                                            name="profile"
                                                            disabled
                                                        />
                                                        <label className="-label" htmlFor="file">
                                                            <span className="glyphicon glyphicon-camera"><i className="fa-regular fa-pen-to-square fs-3"></i></span>
                                                            <span className='fs-5'>Change Image</span>
                                                        </label>
                                                        <input
                                                            className='in_disa'
                                                            name='profile_img'
                                                            id="file"
                                                            type="file"
                                                            onChange={handleProfileImg}
                                                            disabled
                                                        />
                                                        {
                                                            user?.profile_img ?
                                                                <img src={baseNodeUrl + user?.profile_img} id="output" width="200" alt='' />
                                                                :
                                                                <img src={`./assets/img/avatar.png`} id="output" width="200" alt='' />
                                                        }
                                                    </div>
                                                    :
                                                    <div className="profile_img ">
                                                        {
                                                            user?.photoURL ?
                                                                <img src={user?.photoURL} alt="" className="img-fluid" />
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
                                                        <h2 className=" text-center mt-3">{user?.displayName}</h2>
                                                    </div>
                                            }

                                        </div>
                                        <div className="col-md-9">
                                            <div className="profile_edit_form">
                                                <div className="row">

                                                    {/* Full Name */}
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="full_name" className="form-label label_style">Your Full Name</label>
                                                        {
                                                            user ?
                                                                user?.full_name ?
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form_input in_disa"
                                                                        id="full_name"
                                                                        name="full_name"
                                                                        title="Accept Alphabets & Whitespaces Only"
                                                                        pattern='^[a-zA-Z ]+$'
                                                                        placeholder={user?.full_name}
                                                                        value={formValues.full_name}
                                                                        onChange={handleChange}
                                                                        disabled
                                                                    />
                                                                    : <input
                                                                        type="text"
                                                                        className="form-control form_input in_disa"
                                                                        id="full_name"
                                                                        name="full_name"
                                                                        placeholder={user?.displayName}
                                                                        onChange={handleChange}
                                                                        disabled
                                                                    />
                                                                : null
                                                        }
                                                    </div>


                                                    {/* Gender */}
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="gender" className="form-label label_style">Gender</label>
                                                        {
                                                            user ?
                                                                user?.gender ?
                                                                    < input
                                                                        type="text"
                                                                        className="form-control form_input in_disa"
                                                                        id="gender"
                                                                        name="gender"
                                                                        aria-describedby="emailHelp"
                                                                        placeholder={user?.gender}
                                                                        value={formValues.gender}
                                                                        onChange={handleChange}
                                                                        readOnly
                                                                        disabled
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
                                                                : null
                                                        }

                                                    </div>
                                                </div>

                                                <div className="row">
                                                    {/* Email */}
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="email" className="form-label label_style">Email</label>
                                                        {
                                                            user ?
                                                                user.email ?
                                                                    <input
                                                                        type="email"
                                                                        className="form-control form_input in_disa"
                                                                        id="email"
                                                                        name="email"
                                                                        aria-describedby="emailHelp"
                                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                                        title="Accept Email Format Only"
                                                                        placeholder={user?.email}
                                                                        value={formValues?.email}
                                                                        onChange={handleChange} disabled
                                                                    />
                                                                    : <input
                                                                        type="email"
                                                                        className="form-control form_input in_disa"
                                                                        id="email"
                                                                        name="email"
                                                                        aria-describedby="emailHelp"
                                                                        placeholder="Add Email ID"
                                                                        onChange={handleChange} disabled
                                                                    />
                                                                : <input
                                                                    type="email"
                                                                    className="form-control form_input in_disa"
                                                                    id="email"
                                                                    name="email"
                                                                    aria-describedby="emailHelp"
                                                                    placeholder={user?.email}
                                                                    onChange={handleChange} disabled
                                                                    readOnly
                                                                />
                                                        }
                                                    </div>

                                                    {/* Phone */}
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="phone" className="form-label label_style">Phone Number</label>
                                                        {
                                                            user ?
                                                                user?.phone ?
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form_input in_disa"
                                                                        id="phone"
                                                                        name="phone"
                                                                        aria-describedby="emailHelp"
                                                                        placeholder={user?.phone}
                                                                        value={formValues?.phone}
                                                                        onChange={handleChange}
                                                                        pattern="[0-9]"
                                                                        title="Enter a valid phone number"
                                                                        disabled
                                                                    />
                                                                    :
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form_input in_disa"
                                                                        id="phone"
                                                                        name="phone"
                                                                        aria-describedby="emailHelp"
                                                                        placeholder="Phone number did not registered"
                                                                        disabled
                                                                    />
                                                                : null
                                                        }
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    {/* DOB */}
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="dob" className="form-label label_style">Date Of Birth</label>
                                                        {
                                                            user ?
                                                                user?.dob ?
                                                                    < input
                                                                        type="text"
                                                                        className="form-control form_input in_disa"
                                                                        id="dob"
                                                                        name="dob"
                                                                        aria-describedby="emailHelp"
                                                                        placeholder={newDOB}
                                                                        value={formValues.dob}
                                                                        onChange={handleChange}
                                                                        readOnly
                                                                        disabled
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
                                                                : null
                                                        }

                                                    </div>

                                                    {/* Country */}
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="country" className="form-label label_style">Country</label>
                                                        {
                                                            user ?
                                                                user?.country ?
                                                                    <select
                                                                        className="form-select form_input form_select"
                                                                        aria-label="Default select example"
                                                                        id="selects"
                                                                        name='country'
                                                                        value={formValues.country}
                                                                        onChange={handleChange}
                                                                        disabled
                                                                        readOnly
                                                                    >
                                                                        <option readOnly>{user?.country}</option>
                                                                    </select>
                                                                    :
                                                                    <select
                                                                        className="form-select form_input form_select"
                                                                        aria-label="Default select example"
                                                                        id="selects"
                                                                        name='country'
                                                                        disabled
                                                                        readOnly
                                                                    >
                                                                        <option readOnly>Country did not registered</option>
                                                                    </select>
                                                                : null
                                                        }
                                                    </div>
                                                </div>

                                                {/* Edit Button */}
                                                <div className="mt-5">
                                                    <button
                                                        type="button"
                                                        className="editbtn edit"
                                                        id="remEdit"
                                                        onClick={enabledEdit}
                                                        style={{ "display": showEditButton ? "block" : "none" }}
                                                    ><i className="fas fa-edit"></i> Edit</button>
                                                    <button
                                                        onClick={handleSubmit}
                                                        type="button"
                                                        className="btn2 hidden"
                                                        id="saveChanges"
                                                        style={{ "display": !showEditButton ? "block" : "none" }}
                                                    >Save Changes</button>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* <div className="container mb-4">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="one_total_box">
                                        <div className="content_total">
                                            <div className="one_total_title">
                                                <h3>Congratulation John !</h3>
                                            </div>
                                            <p>Best Play of the month</p>
                                            <div className="total_amount">
                                                <h4>{userID ? currency_symbol : generalCurrency_symbol}&nbsp;42.8k</h4>
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
                                                <h4>{userID ? currency_symbol : generalCurrency_symbol}&nbsp;42.8k</h4>
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
                        </div> */}
                    </div>
                </div>
            </main>
        </>
    )
}

export default MyProfile