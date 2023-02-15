import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import MyProfile from '../components/core/profile/MyProfile'
import OrderHistory from '../components/core/profile/OrderHistory'
import Wallet from '../components/core/profile/Wallet'

const Profile = () => {
    const { dueAmount } = useParams()
    const [pageName, setPageName] = useState("dashboard")

    useEffect(() => {
        window.scrollTo(0, 0)
    })

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
                                <Link onClick={() => setPageName("dashboard")} to="#!" className="menu-link">
                                    <i className="menu-icon fas fa-user"></i>
                                    <div data-i18n="Analytics">My Profile</div>
                                </Link>
                            </li>

                            {/* Wallet */}
                            <li className="menu-item ">
                                <Link onClick={() => setPageName("wallet")} to="#!" className="menu-link">
                                    <i className="menu-icon fas fa-wallet"></i>
                                    <div data-i18n="Analytics">Wallet</div>
                                </Link>
                            </li>

                            {/* Order history */}
                            <li className="menu-item ">
                                <Link onClick={() => setPageName("orderhistory")} to="#!" className="menu-link">
                                    <i className="menu-icon fas fa-history"></i>
                                    <div data-i18n="Analytics">Order History</div>
                                </Link>
                            </li>
                        </ul>
                    </aside>

                    {/* Right Side */}
                    {/* Dashboard */}
                    {pageName === "dashboard" ? <MyProfile /> : null}

                    {/* Wallet */}
                    {pageName === "wallet" ? <Wallet dueAmount={dueAmount} /> : null}

                    {/* Order History */}
                    {pageName === "orderhistory" ? <OrderHistory /> : null}
                </div>
            </main>
        </>
    )
}

export default Profile