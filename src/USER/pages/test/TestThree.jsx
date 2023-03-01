import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MyProfile from '../../components/core/profile/MyProfile'

const TestThree = () => {
    // const { dueAmount } = useParams()
    // const [pageName, setPageName] = useState("wallet")

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
                    <MyProfile />

                </div>
            </main>
        </>
    )
}

export default TestThree