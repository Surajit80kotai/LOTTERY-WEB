import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { cinetPay, getTransactions, initPay, updateTransactions } from '../../../services/slice/PaymentSlice';
import { getBalance } from '../../../services/slice/UserSlice';
import PreLoader from '../preloader/PreLoader';
import SideNav from './SideNav';

const Wallet = () => {
    const { dueAmount } = useParams()
    const newDueAmount = dueAmount ? dueAmount : ""
    const [formValue, setFormValue] = useState({ amount: newDueAmount })
    const dispatch = useDispatch()
    const { balance } = useSelector((state) => state.userslice)
    const { paymentData, transaction_data, loading } = useSelector((state) => state.paymentslice)

    // currency variables
    const userCurrency = (JSON.parse(window.localStorage.getItem("user"))?.currency)
    const generalCurrency = process.env.REACT_APP_GENERAL_CURRENCY
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
    const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL


    // handleChange function for onChange
    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }


    // function for selecting pay option
    const selectPayOption = (value) => {
        if (value === "Orange") {
            dispatch(cinetPay(formValue))
        } else if (value === "MTN") {
            dispatch(cinetPay(formValue))
        } else if (value === "Master") {
            console.log(value)
        } else if (value === "Paypal") {
            console.log(value)
        }
    }

    // Redirect page function
    const redirectPage = () => {
        const payment_data = {
            amount: formValue.amount,
            payment_url: paymentData?.data?.payment_url,
            payment_token: paymentData?.data?.payment_token
        }
        if (paymentData.code === "201") {
            window.open(paymentData.data.payment_url, "_self")
            // console.log(payment_data)
            dispatch(initPay(payment_data))
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getBalance())
        redirectPage()
        dispatch(getTransactions())
        dispatch(updateTransactions())
    }, [dispatch, paymentData])

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
                            <h1>Check Your Current Balance</h1>
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
                                                <span>Payment Wallet</span>
                                            </div>
                                            <div className="total_balns">
                                                <span>Total Balance</span>
                                                {
                                                    balance?.balance > 0 ? <h5 className="total_amount">{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}&nbsp;{(balance?.balance)?.toFixed(2)}</h5> : <h5 className="total_amount">{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}&nbsp;0</h5>
                                                }

                                            </div>
                                        </div>

                                        {/* Add money input */}
                                        <div className="payment_area_body">
                                            <h4>ADD MONEY TO WALLET</h4>
                                            <p className='fs-5' style={{ "color": "#f9772b" }}>Minimum Amount Should Be 100 or Higher*</p>
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="payment_input">
                                                            <div className="currency_icon">
                                                                <p>{userCurrency ? userCurrency : generalCurrency}</p>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="payinput"
                                                                id="amount"
                                                                name="amount"
                                                                value={formValue.amount}
                                                                onChange={handleChange}
                                                                aria-describedby="emailHelp"
                                                                placeholder="Enter amount"
                                                                autoComplete='off'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        {
                                                            formValue?.amount >= 100 ?
                                                                <button type="button" className="addmoney" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Money</button>
                                                                : <button type="button" className="addmoney" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled style={{ "backgroundColor": "#00000078" }}>Add Money</button>
                                                        }
                                                    </div>
                                                </div>

                                            </form>
                                        </div>

                                        {/* transaction histrory */}
                                        {
                                            transaction_data?.length ?
                                                <div className="transaction_area">
                                                    <h1 className="text-center text-secondary tranhis">Transaction History</h1>
                                                    <table className="table mt-4">
                                                        <thead className="table_head sticky-top ">
                                                            <tr>
                                                                <th scope="col">Date</th>
                                                                <th scope="col">Merchant</th>
                                                                <th scope="col">Amount</th>
                                                                <th scope="col">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                transaction_data?.map((item) => {
                                                                    // let newDate = new Date(item.createdAt)
                                                                    return (
                                                                        <tr key={item._id}>
                                                                            {
                                                                                item.status_code === "662" ?
                                                                                    <td>
                                                                                        {item.createdAt.split("T")[0]} {item.createdAt.split("T")[1].split(".")[0]}
                                                                                    </td>
                                                                                    : <td>{item.payment_date}</td>
                                                                            }
                                                                            <td>{item.merchant}</td>
                                                                            <td>{userCurrency_symbol} {item.amount}</td>
                                                                            {/* <td>{(item.status).replace(/_/g," ")}</td> */}
                                                                            <td>
                                                                                {
                                                                                    // WAITING_CUSTOMER_PAYMENT
                                                                                    (item.status) === "WAITING_CUSTOMER_PAYMENT" ?
                                                                                        <span style={{ "color": "#ff9900" }}><i className="fa-solid fa-clock-rotate-left mx-3"></i>PENDING</span>
                                                                                        // PAYMENT_FAILED
                                                                                        : (item.status) === "PAYMENT_FAILED" ?
                                                                                            <span className='text-danger'><i className="fa-solid fa-circle-exclamation mx-3"></i>FAILED</span>
                                                                                            // SUCCES
                                                                                            : (item.status) === "SUCCES" ?
                                                                                                <span className='text-success'><i className="fa-solid fa-circle-check mx-3"></i>SUCCESS</span>
                                                                                                : null
                                                                                }
                                                                            </td>

                                                                        </tr>
                                                                    )
                                                                }).reverse()
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : <h4 className='text-center fst-italic fw-semibold mt-2'>No Transaction History Present</h4>
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
                                        <h3>Add Money to Wallet</h3>
                                        <h4>{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}{formValue.amount}</h4>
                                    </div>
                                    <div className="modal-body">
                                        <h4 className="option_title">Payment Option</h4>
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
                                                    <p className='my-4'>Pay with Orange Pay</p>
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
                                                    <p className='my-4'>Pay MTN Money</p>
                                                </label>

                                            </div>

                                            {/* Pay with Master Card */}
                                            <div className="payment_item">
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
                                                    <p className='my-4'>Pay with Master Card</p>
                                                </label>
                                            </div>

                                            {/* Pay with Paypal */}
                                            <div className="payment_item">
                                                <input
                                                    type="radio"
                                                    id="control_04"
                                                    name="select"
                                                    value="Paypal"
                                                    onChange={(e) => selectPayOption(e.target.value)}
                                                />
                                                <label htmlFor="control_04">
                                                    <div className="pay_icon">
                                                        <img src="/assets/img/paypal.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <p className='my-4'>Pay with Paypal</p>
                                                </label>
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