import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { cinetPay, getTransactions, initPay, updateTransactions } from '../../../services/slice/PaymentSlice';
import { getBalance } from '../../../services/slice/UserSlice';
import { currency, currency_symbol, generalCurrency, generalCurrency_symbol } from '../../../util/Currency';
import PreLoader from '../preloader/PreLoader';
import SideNav from './SideNav';
import WithdrawModal from '../../../modal/WithdrawModal';
import MyPaypalButton from '../../../util/MyPaypalButton';
import { useTranslation } from 'react-i18next';

const Wallet = () => {
    const { t } = useTranslation()
    const { dueAmount } = useParams()
    const newDueAmount = dueAmount ? dueAmount : ""
    const [formValue, setFormValue] = useState({ amount: newDueAmount })
    const dispatch = useDispatch()
    const { balance } = useSelector((state) => state.userslice)
    const { paymentData, transaction_data, loading } = useSelector((state) => state.paymentslice)
    // userID
    const userID = (JSON.parse(window.localStorage.getItem("user")))?.user_id
    const navigate = useNavigate()


    // handleChange function for onChange
    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    // console.log(paymentData);

    // function for selecting pay option
    const selectPayOption = (value) => {
        if (value === "Orange") {
            dispatch(cinetPay(formValue))
        } else if (value === "MTN") {
            dispatch(cinetPay(formValue))
        }
        // else if (value === "Paypal") {
        //     console.log(formValue);
        // }
    }

    // Redirect page function
    const redirectPage = () => {
        const payment_data = {
            amount: formValue?.amount,
            payment_url: paymentData?.data?.payment_url,
            payment_token: paymentData?.data?.payment_token
        }
        if (paymentData.code === "201") {
            window.open(paymentData.data.payment_url, "_self")
            // console.log({ payment_data: payment_data })
            dispatch(initPay(payment_data))
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getBalance(navigate))
        redirectPage()
        dispatch(getTransactions(navigate))
        dispatch(updateTransactions(navigate))
    }, [dispatch, paymentData, navigate])



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
                        <div className="paymentwallet_bg">
                            <h1>{t("Check Your Current Balance")}</h1>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="payment_area">
                                        <div className="paymentwallet_top_header">
                                            <div className="pay_title">
                                                <div className="wallet_icon">
                                                    <i className="fas fa-wallet"></i>
                                                </div>
                                                <span>{t("Payment Wallet")}</span>
                                            </div>
                                            <div className="total_balns">
                                                {/* withdraw Balance */}
                                                <div className='d-flex'>

                                                    {/* Modal */}
                                                    <WithdrawModal balance={balance?.balance} userID={userID} />

                                                    <div>
                                                        {/* Total Balance */}
                                                        <span>{t("Total Balance")}</span>
                                                        {
                                                            balance?.balance > 0 ? <h5 className="total_amount">{userID ? currency_symbol : generalCurrency_symbol}&nbsp;{(balance?.balance)?.toFixed(2)}</h5> : <h5 className="total_amount">{userID ? currency_symbol : generalCurrency_symbol}&nbsp;0</h5>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add money input */}
                                        <div className="payment_area_body">
                                            <h4>{t("ADD MONEY TO WALLET")}</h4>
                                            <p className='fs-5' style={{ "color": "#f9772b" }}>{t("Minimum Amount Should Be 100 or Higher*")}</p>
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="payment_input">
                                                            <div className="currency_icon">
                                                                <p>{userID ? currency : generalCurrency}</p>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="payinput"
                                                                id="amount"
                                                                name="amount"
                                                                value={formValue?.amount}
                                                                onChange={handleChange}
                                                                aria-describedby="emailHelp"
                                                                placeholder={t("Enter Amount")}
                                                                autoComplete='off'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        {
                                                            formValue?.amount >= 100 ?
                                                                <button type="button" className="addmoney" data-bs-toggle="modal" data-bs-target="#exampleModal">{t("Add Money")}</button>
                                                                : <button type="button" className="addmoney" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled style={{ "backgroundColor": "#00000078" }}>{t("Add Money")}</button>
                                                        }
                                                    </div>
                                                </div>

                                            </form>
                                        </div>

                                        {/* transaction histrory */}
                                        {
                                            transaction_data?.length ?
                                                <div className="transaction_area">
                                                    <h1 className="text-center text-secondary tranhis">{t("Transaction History")}</h1>
                                                    <table className="table mt-4">
                                                        <thead className="table_head sticky-top ">
                                                            <tr>
                                                                <th scope="col">{t("Date")}</th>
                                                                <th scope="col" colSpan={2}>{t("Transaction ID")}</th>
                                                                <th scope="col" colSpan={2}>{t("Merchant")}</th>
                                                                <th scope="col">{t("Amount")}</th>
                                                                <th scope="col">{t("Status")}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                transaction_data?.map((item) => {
                                                                    // let newDate = new Date(item.createdAt)
                                                                    return (
                                                                        <tr key={item._id}>
                                                                            {
                                                                                (item.status_code === "662") || (item.status_code === "623") ?
                                                                                    <td>
                                                                                        {new Date(item?.createdAt).toLocaleString('en-US', {
                                                                                            month: 'short',
                                                                                            day: '2-digit',
                                                                                            year: 'numeric',
                                                                                            hour: 'numeric',
                                                                                            minute: 'numeric',
                                                                                            second: 'numeric'
                                                                                        })}
                                                                                    </td>
                                                                                    : item.type === "Commission" ?
                                                                                        <td>{new Date(item?.payment_date).toLocaleString('en-US', {
                                                                                            month: 'short',
                                                                                            day: '2-digit',
                                                                                            year: 'numeric',
                                                                                            hour: 'numeric',
                                                                                            minute: 'numeric',
                                                                                            second: 'numeric'
                                                                                        })}</td>
                                                                                        : (item.status_code === "202") || (item.status_code === "200") ?
                                                                                            <td>{new Date(item?.createdAt).toLocaleString('en-US', {
                                                                                                month: 'short',
                                                                                                day: '2-digit',
                                                                                                year: 'numeric',
                                                                                                hour: 'numeric',
                                                                                                minute: 'numeric',
                                                                                                second: 'numeric'
                                                                                            })}</td>
                                                                                            : <td>{new Date(item?.payment_date).toLocaleString('en-US', {
                                                                                                month: 'short',
                                                                                                day: '2-digit',
                                                                                                year: 'numeric',
                                                                                                hour: 'numeric',
                                                                                                minute: 'numeric',
                                                                                                second: 'numeric'
                                                                                            })}</td>
                                                                                // <td>{item.payment_date}</td>
                                                                            }
                                                                            <td colSpan={2}>{item.transaction_id ? item.transaction_id : "--------"}</td>
                                                                            {
                                                                                item.payment_method === "OMCM" ?
                                                                                    <td colSpan={2}>
                                                                                        <span className='payment_logo'>
                                                                                            <img src="/assets/img/omcm.png" alt="" />
                                                                                        </span>
                                                                                        {t("Orange Money")}
                                                                                    </td>
                                                                                    :
                                                                                    item.payment_method === "MTNCM" ?
                                                                                        <td colSpan={2}>
                                                                                            <span className='payment_logo'>
                                                                                                <img src="/assets/img/mtncm.png" alt="" />
                                                                                            </span>
                                                                                            {t("MTN Mobile Money")}
                                                                                        </td>
                                                                                        :
                                                                                        item.payment_method === "VISAMCM" ?
                                                                                            <td colSpan={2}>
                                                                                                <span className='payment_logo'>
                                                                                                    <img src="/assets/img/visamcm.png" alt="" />
                                                                                                </span>
                                                                                                {t("VISA/MasterCard")}
                                                                                            </td>
                                                                                            :
                                                                                            item.payment_method === null ?
                                                                                                <td colSpan={2}>
                                                                                                    <span className='payment_logo'>
                                                                                                        <img src="/assets/img/cancel.png" alt="" />
                                                                                                    </span>
                                                                                                    {t("Transaction Pending or Cancelled")}
                                                                                                </td>
                                                                                                :
                                                                                                item.type === "Commission" ?
                                                                                                    <td colSpan={2}>
                                                                                                        <span className='payment_logo'>
                                                                                                            <img src="/assets/img/commission.png" alt="" />
                                                                                                        </span>
                                                                                                        {t("Commission")}
                                                                                                    </td>
                                                                                                    : item.merchant === "PayPal" ?
                                                                                                        <td colSpan={2}>
                                                                                                            <span className='payment_logo'>
                                                                                                                <img src="/assets/img/paypal_logo.png" alt="" />
                                                                                                            </span>
                                                                                                            {t("PayPal")}
                                                                                                        </td>
                                                                                                        :
                                                                                                        item.merchant === "MTN" ?
                                                                                                            <td colSpan={2}>
                                                                                                                <span className='payment_logo'>
                                                                                                                    <img src="/assets/img/mtncm.png" alt="" />
                                                                                                                </span>
                                                                                                                {t("MTN Withdrawal")}
                                                                                                            </td>
                                                                                                            :
                                                                                                            item.merchant === "Purchase" ?
                                                                                                                <td colSpan={2}>
                                                                                                                    <span className='payment_logo'>
                                                                                                                        <img src="/assets/img/ticket_icon.png" alt="" />
                                                                                                                    </span>
                                                                                                                    {t("ESHAC-PLAY (Purchase)")}
                                                                                                                </td>
                                                                                                                :
                                                                                                                <td colSpan={2}>
                                                                                                                    <span className='payment_logo'>
                                                                                                                        <img src="/assets/img/pending.png" alt="" />
                                                                                                                    </span>
                                                                                                                    {t("Waiting For Payment")}
                                                                                                                </td>
                                                                            }

                                                                            <td>{userID ? currency_symbol : generalCurrency_symbol}     {item.amount}</td>
                                                                            {/* <td>{(item.status).replace(/_/g," ")}</td> */}
                                                                            <td>
                                                                                {
                                                                                    (item.status_code === "627") ?
                                                                                        <span className='text-danger'><i className="fa-solid fa-ban mx-3"></i>{t("CANCELLED")}</span>
                                                                                        // WAITING_CUSTOMER_PAYMENT
                                                                                        : (item.status_code === "662") ?
                                                                                            <span style={{ "color": "#ff9900" }}><i className="fa-solid fa-clock-rotate-left mx-3"></i>{t("PENDING")}</span>
                                                                                            // WAITING_CUSTOMER_TO_VALIDATE
                                                                                            : (item.status_code === "623") ?
                                                                                                <span className='text-danger'><i className="fa-regular fa-clock mx-3"></i> {t("TIME EXPIRED")}</span>
                                                                                                // PAYMENT_FAILED
                                                                                                : (item.status_code === "600") ?
                                                                                                    <span className='text-danger'><i className="fa-solid fa-circle-exclamation mx-3"></i>{t("FAILED")}</span>
                                                                                                    // SUCCESS
                                                                                                    : (item.status_code === "00") || (item.status === "SUCCESSFUL") || (item.status === "APPROVED") || (item.type === "Commission") || (item.status === "Order Placed") ?
                                                                                                        <span className='text-success'><i className="fa-solid fa-circle-check mx-3"></i>{t("SUCCESS")}</span>
                                                                                                        // ACCEPTED
                                                                                                        : item.status === "Accepted" ?
                                                                                                            <span className='text-success'><i className="fa-solid fa-circle-check mx-3"></i>{t("ACCEPTED")}</span>
                                                                                                            // TRANSACTION ENDED
                                                                                                            : <span className='text-danger'><i className="fa-solid fa-circle-exclamation mx-3"></i>{t("TRANSACTION ENDED")}</span>
                                                                                }
                                                                            </td>

                                                                        </tr>
                                                                    )
                                                                }).reverse()
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : <h4 className='text-center fst-italic fw-semibold mt-2'>{t("No Transaction History Present")}</h4>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/*  Modal payment */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3>{t("Add Money to Wallet")}</h3>
                                        <h4>{userID ? currency_symbol : generalCurrency_symbol}{formValue?.amount}</h4>
                                    </div>
                                    <div className="modal-body">
                                        <h4 className="option_title">{t("Payment Option")}</h4>
                                        <div className="payment_section">

                                            {/* Pay with Orange Pay */}
                                            <div className="payment_item">
                                                <input
                                                    type="radio"
                                                    id="control_01"
                                                    name="select"
                                                    value="Orange"
                                                    onChange={(e) => selectPayOption(e.target.value)}
                                                />
                                                <label htmlFor="control_01">
                                                    <div className="pay_icon">
                                                        <img src="/assets/img/orange.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <p className='my-4'>{t("Pay with Orange Pay")}</p>
                                                </label>

                                            </div>

                                            {/* Pay with Mtn Money */}
                                            <div className="payment_item">
                                                <input
                                                    type="radio"
                                                    id="control_02"
                                                    name="select"
                                                    value="MTN"
                                                    onChange={(e) => selectPayOption(e.target.value)}
                                                />
                                                <label htmlFor="control_02">
                                                    <div className="pay_icon">
                                                        <img src="/assets/img/mtn.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <p className='my-4'>{t("Pay MTN Money")}</p>
                                                </label>

                                            </div>

                                            {/* Pay with Master Card */}
                                            {/* <div className="payment_item">
                                                <input
                                                    type="radio"
                                                    id="control_03"
                                                    name="select"
                                                    value="Master"
                                                    onChange={(e) => selectPayOption(e.target.value)}
                                                />
                                                <label htmlFor="control_03">
                                                    <div className="pay_icon">
                                                        <img src="/assets/img/master.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <p className='my-4'>{t("Pay with VISA/Master Card")}</p>
                                                </label>
                                            </div> */}

                                            {/* Pay with Paypal */}
                                            <div className="payment_item">
                                                <input
                                                    type="radio"
                                                    id="control_04"
                                                    name="select"
                                                    value="Paypal"
                                                    onChange={(e) => selectPayOption(e.target.value)}
                                                />
                                                <label>
                                                    <div className='m-5'>
                                                        <MyPaypalButton amount={formValue?.amount} />
                                                        <p className='my-4'>{t("Pay with Paypal")}</p>
                                                    </div>
                                                </label>
                                                {/* <label htmlFor="control_04">
                                                    <div className="pay_icon">
                                                        <div className="pay_icon">
                                                            <img src="/assets/img/paypal.png" alt="" className="img-fluid" />
                                                        </div>
                                                        <p className='my-4'>{t("Pay with Paypal")}</p>
                                                    </div>
                                                </label> */}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default Wallet