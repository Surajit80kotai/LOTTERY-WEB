import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PreLoader from '../components/core/preloader/PreLoader'
import { clearVerifyOtp, registerOTP, storePhoneNumber, verifyOTP } from '../services/slice/AuthSlice'
import { getPhoneCode } from '../services/slice/CountryStateSlice'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useTranslation } from 'react-i18next'

const VerifyPhone = () => {
    const { t } = useTranslation()
    const [phone, setPhone] = useState({ phone: "" })
    // const [phone, setPhone] = useState({ phone_code: "", phone: "" })
    const [otp, setOtp] = useState({ otp: "" })
    const [flag, setFlag] = useState(false)
    const { loading } = useSelector((state) => state.authslice)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { reg_otp, verify_otp } = useSelector((state) => state.authslice)
    // const { phoneCodeData } = useSelector((state) => state.countrystateslice)


    // button style
    const active = "btn_one"
    const deactive = "btn_deactive"

    // const handleChange = (e) => {
    // setPhone({ ...phone, [e.target.name]: e.target.value })
    // console.log(phone);
    // }

    // sendOtp func.
    const sendOtp = () => {
        const data = { phone_number: "+" + phone }
        // const data = { phone_number: phone.phone_code + phone.phone }
        dispatch(registerOTP(data))
    }

    // onVerify func.
    const onVerify = () => {
        const data = { phone_number: "+" + phone, otp: otp.otp }
        // const data = { phone_number: "phone.phone_code" + phone.phone, otp: otp.otp }
        dispatch(verifyOTP(data))
    }


    useEffect(() => {
        dispatch(getPhoneCode())
    }, [dispatch])


    useEffect(() => {
        if (reg_otp?.status === true) {
            setFlag(true)
            toast.success(reg_otp?.message, {
                autoClose: 3000
            })
            dispatch(clearVerifyOtp(reg_otp?.message))
        } else if (reg_otp?.status === false) {
            setFlag(false)
            toast.error(reg_otp?.message, {
                autoClose: 3000
            })
            dispatch(clearVerifyOtp())
        }

        if (verify_otp?.status === true) {
            const data = { phone_number: "+" + phone, otp: otp.otp }
            // const data = { phone_number: phone.phone_code + phone.phone, otp: otp.otp }
            setFlag(false)
            toast.success(verify_otp?.message, {
                autoClose: 3000
            })
            dispatch(storePhoneNumber(data.phone_number))
            window.localStorage.setItem("phone_number", JSON.stringify(data?.phone_number))
            navigate("/signup")
            setOtp({ otp: "" })
            setPhone({ phone: "" })
            // setPhone({ ...phone, phone: "" })
            dispatch(clearVerifyOtp())
        } else if (verify_otp?.status === false) {
            toast.error(verify_otp?.message, {
                autoClose: 3000
            })
            navigate('/verifyphone')
            dispatch(clearVerifyOtp())
        }
    }, [dispatch, navigate, otp.otp, reg_otp, verify_otp])


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main className="main">
                {/* Back to home button */}
                <Link className='text-secondary' to='/'>
                    <h3 className='container text-end'><i className="fa-solid fa-house mx-2"></i>{t('Home')}</h3>
                </Link>

                <div className="wrapper_area margin-top">
                    <div className="log_area">

                        <div className="right_part">
                            <div className="right_top">
                                <h2 className="heading_form mt-3">{t('SIGN UP')}</h2>
                            </div>
                            <div className="form_area mt-5">
                                <div>

                                    {/* Phone Number */}
                                    <div className="row d-flex mb-5" style={{ "display": !flag ? "block" : "none" }}>
                                        <label htmlFor="phone" className="form-label label_style">{t('Verify Your Phone Number Here')}</label>

                                        {/* <div className='col-2' style={{ "width": "18%" }}>
                                            <select
                                                className="form-select form_input form_select fw-bold"
                                                aria-label="Default select example"
                                                id="selects"
                                                name='phone_code'
                                                value={phone.phone_code}
                                                onChange={handleChange}
                                            >
                                                <option className='fw-bold' value="1" aria-readonly>MDC</option>
                                                {
                                                    phoneCodeData?.map((country) => {
                                                        return (
                                                            <option
                                                                value={country.dial_code}
                                                                key={country._id}>
                                                                {country.name}&nbsp;
                                                                ({country.dial_code})
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className='col-10' style={{ "width": "82%" }}>
                                            <input
                                                type="tel"
                                                className="form-control form_input"
                                                id="phone"
                                                name="phone"
                                                aria-describedby="emailHelp"
                                                placeholder="Enter A Valid Phone Number"
                                                pattern="[0-9]"
                                                title="Enter a valid phone number"
                                                value={phone.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div> */}

                                        <PhoneInput
                                            inputProps={{ required: true }}
                                            placeholder={t("Enter Your Phone Number")}
                                            country={"cm"}
                                            enableSearch={true}
                                            value={phone.phone}
                                            onChange={(phone) => setPhone(phone)}
                                        />
                                    </div>

                                    <div className="text-center" style={{ "display": !flag ? "block" : "none" }}>
                                        <button
                                            onClick={sendOtp}
                                            type="submit"
                                            className={(phone?.length > 8) ? active : deactive}
                                            disabled={(phone?.length > 8) ? false : true}
                                        >{t('Send')} {t('OTP')}</button>
                                    </div>

                                    {/* OTP */}
                                    <div className="mb-5" style={{ "display": flag ? "block" : "none" }}>
                                        <label htmlFor="otp" className="form-label label_style">{t('OTP')}</label>
                                        <input
                                            type="tel"
                                            className="form-control form_input"
                                            id="otp"
                                            name="otp"
                                            aria-describedby="emailHelp"
                                            placeholder={t("Enter OTP Here")}
                                            pattern="[0-9]{6}"
                                            title={t("Accept Numbers Only")}
                                            value={otp.otp}
                                            onChange={(e) => setOtp({ ...otp, [e.target.name]: e.target.value })}
                                            maxLength={6}
                                            required
                                        />
                                    </div>

                                    <div className="text-center" style={{ "display": flag ? "block" : "none" }}>
                                        <button
                                            onClick={onVerify}
                                            type="submit"
                                            className={(otp?.otp?.length) === 6 ? active : deactive}
                                            disabled={(otp?.otp?.length) === 6 ? false : true}
                                        >{t('Verify')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="left_part mb-5">
                            <div className="company_logo text-center">
                                <Link to="/"><img src="/assets/img/eshacplaylogo.png" alt="" className="img-fluid" /></Link>
                            </div>
                            <h2 className="log_title">{t('Welcome To ESHAC-PLAY')}</h2>
                            <h6 className="dont">{t('Already Have An Account?')}</h6>
                            <Link to="/login" className="Signup">{t('Sing In')}</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default VerifyPhone