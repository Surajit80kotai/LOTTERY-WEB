import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Wallet from '../../components/core/profile/Wallet'
import { cinetPay, getTransactions, initPay, updateTransactions } from '../../services/slice/PaymentSlice'
import { getBalance } from '../../services/slice/UserSlice'

const TestTwo = ({ dueAmount }) => {
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
            window.open(paymentData.data.payment_url, "_self")
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
            <main>
                <div className="sidebar_wrapper">
                    {/* Left Side */}
                    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">

                        <div className="menu-inner-shadow"></div>

                        <ul className="menu-inner py-1">
                            {/*  Dashboard  */}
                            <li className="menu-item active">
                                <Link to="/testThree" className="menu-link">
                                    <i className="menu-icon fas fa-user"></i>
                                    <div data-i18n="Analytics">My Profile</div>
                                </Link>
                            </li>

                            {/* Wallet */}
                            <li className="menu-item ">
                                <Link to="/testTwo" className="menu-link">
                                    <i className="menu-icon fas fa-wallet"></i>
                                    <div data-i18n="Analytics">Wallet</div>
                                </Link>
                            </li>

                            {/* Order history */}
                            <li className="menu-item ">
                                <Link to="#!" className="menu-link">
                                    <i className="menu-icon fas fa-history"></i>
                                    <div data-i18n="Analytics">Order History</div>
                                </Link>
                            </li>
                        </ul>
                    </aside>

                    {/* Right Side */}
                    <Wallet />

                </div>
            </main>
        </>
    )
}

export default TestTwo