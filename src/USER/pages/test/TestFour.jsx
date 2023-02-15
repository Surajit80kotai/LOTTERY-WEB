import React from 'react'

const Test4 = () => {
    return (
        <>
            <header>

                {/* Bottom Navbar Area */}
                <div className="navarea">
                    <nav className="main_nav">
                        <div className="left_nav">
                            <Link to='/'>
                                <div className="companyLogo">
                                    <img src="/assets/img/logo.png" alt="logo" className="img-fluid" />
                                </div>
                            </Link>
                            <ul className="menu_list">
                                <li><Link to="/" className="menu_links">Home</Link></li>
                                <li><Link to="/aboutus" className="menu_links">About Us</Link></li>
                                {/* <li><Link to="/product" className="menu_links">Product</Link></li> */}
                                <li><Link to="/howtoplay" className="menu_links">How To play</Link></li>
                                <li><Link to="/charities" className="menu_links">Charities</Link></li>
                                <li><Link to="/contact" className="menu_links">Contact</Link></li>
                            </ul>

                        </div>
                        <div className="right_nav">
                            {/* Currency */}
                            <div className="crncy_menu">
                                <input type="checkbox" id="drop-3" hidden />
                                <label className="dropHeader dropHeader-3 droplabel" htmlFor="drop-3"><span><img src="assets/img/currency.png" alt="" className="" /></span> Currency
                                    <i className="fas fa-chevron-down fa-sm"></i></label>
                                <div className="list list-3">
                                    <div className="item">
                                        <Link to="#">
                                            FCFA
                                        </Link>
                                    </div>
                                    <div className="item">
                                        <Link to="#">
                                            XAF
                                        </Link>
                                    </div>
                                    <div className="item">
                                        <Link to="#">
                                            XOF
                                        </Link>
                                    </div>
                                    <div className="item">
                                        <Link to="#">
                                            USD
                                        </Link>
                                    </div>
                                    <div className="item">
                                        <Link to="#">
                                            Euro
                                        </Link>
                                    </div>
                                    <div className="item">
                                        <Link to="#">
                                            Naira
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Signup */}
                            {
                                !token ?
                                    <div className="sign">
                                        <Link to="/signup"><i className="bi bi-person-add"></i> SignUp</Link>
                                    </div>
                                    : null
                                // || !accessToken ?
                                //   <div className="sign">
                                //     <Link to="/signup"><i className="bi bi-person-add"></i> SignUp</Link>
                                //   </div>
                                //   : null
                            }
                            {/* Login */}
                            {
                                !token ?
                                    <div className="sign">
                                        <Link to="/login"><i className="bi bi-box-arrow-in-right"></i> Login</Link>
                                    </div>
                                    : null
                                // || !accessToken ?
                                //   <div className="sign">
                                //     <Link to="/login"><i className="bi bi-box-arrow-in-right"></i> Login</Link>
                                //   </div>
                                //   : null
                            }

                            {/* User Menu */}
                            <div className="user_menu mx-2">
                                <input type="checkbox" id="drop-4" hidden />
                                {
                                    token ?
                                        <label className="dropHeader dropHeader-4 droplabel" htmlFor="drop-4">
                                            <i className="fa-solid fa-user"></i><span className='px-3'>{user?.full_name}</span>
                                        </label>
                                        : null
                                }

                                {
                                    token ?
                                        <div className="user_menulist list-4">
                                            <div className="menu-container">
                                                <ul className="user-menu">
                                                    <div className="profile-highlight">
                                                        {/* <img src="/assets/img/user.jpg" alt="profile-img" style={{ "width": "36px", "height": "36px" }} /> */}
                                                        <div className="details">
                                                            <div id="profile-name">{user?.full_name}</div>
                                                            {/* <div id="profile-name">{displayName}</div> */}
                                                        </div>
                                                    </div>
                                                    <Link to='/dashboard'>
                                                        <li className="user-menu__item">
                                                            <h1 className="user-menu-link" to="#">
                                                                <span style={{ "color": "#f9772b" }}><i className="fa-regular fa-user fs-3"></i></span>
                                                                <div>
                                                                    <h4 className='text-dark' style={{ "fontSize": "17px" }}>Dashboard</h4>
                                                                </div>
                                                            </h1>
                                                        </li>
                                                    </Link>

                                                    {/* <li className="user-menu__item">
                      <Link className="user-menu-link" to="#">
                        <img src="/assets/img/wallet.png" alt="team_icon" style={{ "width": "20px", "height": "20px" }} />
                        <div>Acouunt Balance</div>
                      </Link>
                    </li>
                    <li className="user-menu__item">
                      <Link className="user-menu-link" to="#">
                        <img src="/assets/img/history.png" alt="team_icon" style={{ "width": "20px", "height": "20px" }} />
                        <div>Order History</div>
                      </Link>
                    </li> */}

                                                    <div className="foot">
                                                        <li className="user-menu__item">
                                                            <Link onClick={logOut} className="user-menu-link" to="/" style={{ "color": "#F44336", "fontSize": "16px" }}>Logout</Link>
                                                        </li>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>

                            {/* Cart */}
                            {
                                token ?
                                    <div className="cart mx-4">
                                        <Link to="/cart" className="cartbtn">
                                            <i className="fas fa-shopping-cart"></i>
                                            {cart_data?.length > 0 ? <span className="label">{cart_data.length}</span> : null}
                                        </Link>
                                    </div>
                                    : null
                            }


                            <div className="hamburger-menu" id="hamburger-menu">
                                <div className="menu-bar1"></div>
                                <div className="menu-bar2"></div>
                                <div className="menu-bar3"></div>
                            </div>
                        </div>
                    </nav>
                </div>

            </header>
        </>
    )
}

export default Test4