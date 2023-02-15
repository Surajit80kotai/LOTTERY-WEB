import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { cinetPay, getTransactions, initPay, updateTransactions } from '../../../services/slice/PaymentSlice';
import { getBalance } from '../../../services/slice/UserSlice';
import PreLoader from '../preloader/PreLoader';

const Wallet = ({ dueAmount }) => {
    const newDueAmount = dueAmount ? dueAmount : ""
    const [formValue, setFormValue] = useState({ amount: newDueAmount })
    const dispatch = useDispatch()
    const { balance } = useSelector((state) => state.userslice)
    const { paymentData, transaction_data, loading } = useSelector((state) => state.paymentslice)
    const userCurrency = (JSON.parse(window.localStorage.getItem("user"))?.currency)
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)

    // handleChange function for onChange
    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }


    // function for selecting pay option
    const selectPayOption = (value) => {
        if (value === "CinetPay") {
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
            window.open(paymentData.data.payment_url, "_blank")
            // console.log(payment_data)
            dispatch(initPay(payment_data))
        }
    }


    useEffect(() => {
        dispatch(getBalance())
        redirectPage()
        dispatch(getTransactions())
        dispatch(updateTransactions())
    }, [dispatch, paymentData])

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

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
                                            balance?.balance > 0 ? <h5 className="total_amount">{userCurrency_symbol} {(balance?.balance)?.toFixed(2)}</h5> : <h5 className="total_amount">{userCurrency_symbol} 0</h5>
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
                                                        <p>{userCurrency}</p>
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
                                                        : <button type="button" className="addmoney" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled style={{ "backgroundColor": "#e7e7e7" }}>Add Money</button>
                                                }
                                            </div>
                                        </div>

                                    </form>
                                </div>

                                {/* transaction histrory */}
                                <h3 className="tranhis">Transaction History</h3>
                                <div className="transaction_area">
                                    {
                                        transaction_data ?
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
                                                            return (
                                                                <tr key={item._id}>
                                                                    <td>{item.payment_date}</td>
                                                                    <td>{item.merchant}</td>
                                                                    <td>{item.currency} {item.amount}</td>
                                                                    <td>{item.status}</td>
                                                                </tr>
                                                            )
                                                        }).reverse()
                                                    }
                                                </tbody>
                                            </table>
                                            : <h3>No transaction history present</h3>
                                    }
                                </div>
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
                                <h4>{userCurrency_symbol}{formValue.amount}</h4>
                            </div>
                            <div className="modal-body">
                                <h4 className="option_title">Payment Option</h4>
                                <div className="payment_section">

                                    {/* Pay with cinet Pay */}
                                    <div className="payment_item">
                                        <input
                                            type="radio"
                                            id="control_01"
                                            name="select"
                                            value="CinetPay"
                                            onChange={(e) => selectPayOption(e.target.value)}
                                        />
                                        <label htmlFor="control_01">
                                            <div className="pay_icon">
                                                <img src="/assets/img/pay(1).png" alt="" className="img-fluid" />
                                            </div>
                                            <p>Pay with cinet Pay</p>
                                        </label>

                                    </div>

                                    {/* Pay with Master Card */}
                                    <div className="payment_item">
                                        <input
                                            type="radio"
                                            id="control_02"
                                            name="select"
                                            value="Master"
                                            onChange={(e) => selectPayOption(e.target.value)}
                                        />
                                        <label htmlFor="control_02">
                                            <div className="pay_icon">
                                                <img src="/assets/img/pay(2).png" alt="" className="img-fluid" />
                                            </div>
                                            <p>Pay with Master Card</p>
                                        </label>
                                    </div>

                                    {/* Pay with Paypal */}
                                    <div className="payment_item">
                                        <input
                                            type="radio"
                                            id="control_03"
                                            name="select"
                                            value="Paypal"
                                            onChange={(e) => selectPayOption(e.target.value)}
                                        />
                                        <label htmlFor="control_03">
                                            <div className="pay_icon">
                                                <img src="/assets/img/pay(3).png" alt="" className="img-fluid" />
                                            </div>
                                            <p>Pay with Paypal</p>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Wallet