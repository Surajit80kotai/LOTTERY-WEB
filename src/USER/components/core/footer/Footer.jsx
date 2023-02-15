import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
         <div className="footer_top">
                        <div className="footitem">
                            <h4 className="foot_title">Information</h4>
                            <ul className="footlinks">
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>About us</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Find Us</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Terms & Condition</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Privacy Policy</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Cookies Policy</Link></li>
                            </ul>
                        </div>
                        <div className="footitem">
                            <h4 className="foot_title">Help</h4>
                            <ul className="footlinks">
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>How to Play</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>How to Deposite</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Betting Rule</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>How to Withdraw</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>How to Register</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Balance Check</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Help Center</Link></li>
                            </ul>
                        </div>
                        <div className="footitem">
                            <h4 className="foot_title">Partner</h4>
                            <ul className="footlinks">
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Agents</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Influencer</Link></li>
                                {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Affiliate Partner</Link></li> */}

                            </ul>
                        </div>
                        <div className="footitem">
                            <h4 className="foot_title">Career</h4>
                            <ul className="footlinks">
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Job</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Work With Us</Link></li>
                                <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Apply</Link></li>

                            </ul>
                        </div>

                        <div className="footitem">
                            <div className="partner_num">
                                <h3>17 +</h3>
                            </div>
                        </div>
                    </div>   
        </>
    )
}

export default Footer
