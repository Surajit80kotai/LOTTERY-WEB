import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
    return (
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">
                    {/*  Dashboard  */}
                    <li className="menu-item active">
                        <Link to="/profile" className="menu-link">
                            <i className="menu-icon fas fa-user"></i>
                            <div data-i18n="Analytics">My Profile</div>
                        </Link>
                    </li>

                    {/* Wallet */}
                    <li className="menu-item ">
                        <Link to="/wallet" className="menu-link">
                            <i className="menu-icon fas fa-wallet"></i>
                            <div data-i18n="Analytics">Wallet</div>
                        </Link>
                    </li>

                    {/* Order history */}
                    <li className="menu-item ">
                        <Link to="/orderhistory" className="menu-link">
                            <i className="menu-icon fas fa-history"></i>
                            <div data-i18n="Analytics">Order History</div>
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default SideNav