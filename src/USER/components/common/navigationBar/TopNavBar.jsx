import React from 'react'
import { Link } from 'react-router-dom'


const TopNavBar = () => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    return (
        <>
            <div className="topheader">
                <div className="searchbar">
                    {/* <div className="ser_bar_inn">
              <input type="text" placeholder="Search Here..." />
              <button><img src="/assets/img/search.png" alt="" /></button>
            </div> */}
                </div>
                {/* Currency Dropdown */}
                <div className="right_menu">
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

                </div>
            </div>
        </>
    )
}

export default TopNavBar