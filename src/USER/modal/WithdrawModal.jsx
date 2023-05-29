import React, { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
// import PhoneInput from 'react-phone-input-2'
import PreLoader from '../components/core/preloader/PreLoader'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { withdrawReq } from '../services/slice/UserSlice'
// import { initWithdraw, withdraw } from '../services/slice/UserSlice'
import { getTransactions } from '../services/slice/PaymentSlice'
// import { currency } from '../util/Currency'

const WithdrawModal = ({ balance, userID }) => {
    const { t } = useTranslation()
    // const [phone, setPhone] = useState('')
    // const [phonecode, setPhonecode] = useState('')
    const [formValues, setFormValues] = useState(
        {
            amount: "",
            currency: "EUR",
            externalId: Math.floor(Math.random() * 100000000).toString(),
            payee: {
                partyIdType: "MSISDN",
                partyId: JSON.parse(window.localStorage.getItem("user"))?.phone
            },
            payerMessage: "Withdrawal",
            payeeNote: "ESHAC-PLAY Wallet Withdrawal"
        }
    )
    const { withdraw_data, loading } = useSelector((state) => state.userslice)
    // const { init_withdraw_data, withdraw_data, loading } = useSelector((state) => state.userslice)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // openModal func.
    // const openModal = () => {
    //     dispatch(initWithdraw(navigate))
    // }

    // handleChange function
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    // handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault()
        // const payee = { ...formValues?.payee, partyId: "+" + phone }
        // const formData = { ...formValues, payee, phonecode }
        // const uuid = init_withdraw_data?.UUID
        // const access_token = `Bearer ${init_withdraw_data?.Gen_API_Token?.access_token}`
        const data = { formValues, userID, user_type: "user" }
        dispatch(withdrawReq({ data, navigate }))

        setFormValues({ ...formValues, amount: "" })
        // setPhone('')
        // setPhonecode('')
    }

    useEffect(() => {
        dispatch(getTransactions(navigate))
    }, [dispatch, navigate, withdraw_data])


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            {/*  Button trigger modal */}
            {
                balance > 500 ?

                    <button
                        // onClick={openModal}
                        type="button"
                        className="btn2 mx-5 my-3"
                        data-bs-toggle="modal"
                        data-bs-target="#withdrawModal"
                    >
                        {t("Withdraw Money")}
                    </button>
                    :
                    <button
                        // onClick={openModal}
                        type="button"
                        className="btn2_disabled mx-5 my-3"
                        data-bs-toggle="modal"
                        data-bs-target="#withdrawModal"
                        disabled
                    >
                        {t("Withdraw Money")}
                    </button>
            }
            {/* <!-- Modal --> */}
            <div className="modal fade" id="withdrawModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-3" id="exampleModalLabel" style={{ padding: "0.3rem 15rem" }}>{t("Withdraw Money")}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <p className='text-center fs-5' style={{ "color": "#f9772b" }}>{t("Minimum Withdraw Amount Should Be 500*")}</p>
                                <div className='row'>
                                    <div style={{ padding: "0 50px" }}>
                                        {/* <div className="mb-3">
                                            <label htmlFor="phone" className="form-label fs-4">{t("Enter Your Registered Phone Number")}
                                            </label>
                                            <PhoneInput
                                                id='phone'
                                                inputProps={{ required: true }}
                                                placeholder={t("Enter Your Phone Number")}
                                                country={"cm"}
                                                enableSearch={true}
                                                onChange={
                                                    (value, data) => {
                                                        setPhone(value);
                                                        setPhonecode(data.dialCode)
                                                    }
                                                }
                                            />
                                        </div> */}
                                        <div className="mb-3">
                                            <label htmlFor="amount" className="form-label fs-4">{t("Enter Withdraw Amount")}</label>
                                            <input
                                                type="text"
                                                className="form-control form_input"
                                                name='amount'
                                                id="amount"
                                                aria-describedby="emailHelp"
                                                placeholder={t('Enter Amount')}
                                                pattern="[0-9]+"
                                                title={t("Enter positive numbers only")}
                                                value={formValues?.amount}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {
                                        formValues?.amount >= 500 ?
                                            <button onClick={handleSubmit} className="btn2 mt-3" style={{ alignItems: "center" }} data-bs-dismiss={loading ? "" : "modal"}>{t("Withdraw")}</button>
                                            :
                                            <button className="btn2_disabled mt-3" style={{ alignItems: "center" }} disabled>{t("Withdraw")}</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default WithdrawModal