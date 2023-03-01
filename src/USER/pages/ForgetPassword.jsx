import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchForgetPass } from '../services/slice/AuthSlice'
import { Flip, toast, ToastContainer } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    const [formValues, setFormValues] = useState({ email: "" })
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.authslice)

    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    //  handleSubmit Function for form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchForgetPass({ formValues }))
        toast.info(`Link sent to your email ${formValues.email}`)
        setFormValues({ email: "" })
    }

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main className="main">
                {/* Back to home button */}
                <div className='d-flex justify-content-between' style={{ "margin": "0 340px 0 340px" }}>
                    <Link className='text-secondary' to='/login'>
                        <h3 className='container text-end'><i className="fa-solid fa-right-from-bracket mx-2"></i>Back</h3>
                    </Link>
                    <Link className='text-secondary' to='/'>
                        <h3 className='container text-end'><i className="fa-solid fa-house mx-2"></i>Home</h3>
                    </Link>
                </div>

                <div className="container wrapper_area" style={{"marginTop":"50px"}}>

                    <div className="forgetwrapper">
                        <div className="forget_icon">
                            <img src="assets/img/forgeticon.png" alt="" className="img-fluid" />
                        </div>
                        <h2 className="title text-center">Forget Your Password ?</h2>
                        <p className="text-center">Enter Your Phone Number Or Email Address Below To receive
                            <br />Your Password Reset instruction
                        </p>
                        <form action="" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                            {/* Email or Phone */}
                            <div className="forget ">
                                <label htmlFor="email" className="form-label label_for">Phone Number Or Email Id</label>
                                <input
                                    type="email"
                                    className="form-control forget_input"
                                    id="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    aria-describedby="emailHelp" />
                                {/* Form Vaidation */}
                                {/* <p className='text-danger fs-4 mt-2'>{error}</p> */}

                            </div>

                            {/* Button */}
                            <div className="text-center">
                                <button type="submit" className="btn_one"  style={{"margin" : "30px 0 30px 0"}}>Recover Password</button>
                            </div>
                        </form>
                    </div>

                </div>
            </main>
            <ToastContainer style={{ "fontSize": "16px" }} transition={Flip} position="top-center" />
        </>
    )
}

export default ForgetPassword