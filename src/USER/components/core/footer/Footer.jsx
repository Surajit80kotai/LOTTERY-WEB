import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
    const { t } = useTranslation()
    const token = JSON.parse(window.localStorage.getItem("token"))
    const lang = window.localStorage.getItem("language")

    return (
        <>
            <div className="footer_top">
                <div className="footitem">
                    <h4 className="foot_title">{t('Information')}</h4>
                    <ul className="footlinks">
                        {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>About us</Link></li> */}
                        {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>Find Us</Link></li> */}
                        <li><Link to="/terms_condition"><span><i className="fas fa-caret-right"></i></span>{t('Terms & Condition')}</Link></li>
                        <li><Link to="/privacypolicy"><span><i className="fas fa-caret-right"></i></span>{t('Privacy Policy')}</Link></li>
                        <li><Link to="/cookiepolicy"><span><i className="fas fa-caret-right"></i></span>{t('Cookies Policy')}</Link></li>
                    </ul>
                </div>
                <div className="footitem">
                    <h4 className="foot_title">{t('Help')}</h4>
                    <ul className="footlinks">
                        <li><Link to="/howtoplay"><span><i className="fas fa-caret-right"></i></span>{t('How to Play')}</Link></li>
                        <li><Link to="/howtodeposit"><span><i className="fas fa-caret-right"></i></span>{t('How to Deposit')}</Link></li>
                        <li><Link to="/bettingrule"><span><i className="fas fa-caret-right"></i></span>{t('Betting Rule')}</Link></li>
                        {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>{t('How to Collect')}</Link></li> */}
                        <li><Link to="/howtoregister"><span><i className="fas fa-caret-right"></i></span>{t('How to Register')}</Link></li>
                        {
                            token ?
                                <li><Link to="/wallet"><span><i className="fas fa-caret-right"></i></span>{t('Balance Check')}</Link></li>
                                : <li><Link to="/login"><span><i className="fas fa-caret-right"></i></span>{t('Balance Check')}</Link></li>
                        }
                        {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>{t('Help Center')}</Link></li> */}
                    </ul>
                </div>
                <div className="footitem">
                    <h4 className="foot_title">{t('Partner')}</h4>
                    <ul className="footlinks">
                        <li>
                            {
                                token ?
                                    <Link to="#">
                                        <span><i className="fas fa-caret-right"></i></span>{t('Agents')}
                                    </Link>
                                    :
                                    <Link to={lang === "en" ? "/agentSignup/Agent" : "/agentSignup/Agentes"}>
                                        <span><i className="fas fa-caret-right"></i></span>{t('Agents')}
                                    </Link>
                            }
                        </li>

                        <li>
                            {
                                token ?
                                    <Link to="#">
                                        <span><i className="fas fa-caret-right"></i></span>{t('Influencer')}
                                    </Link>
                                    :
                                    <Link to={lang === "en" ? "/agentSignup/Influencer" : "/agentSignup/Influenceuse"}>
                                        <span><i className="fas fa-caret-right"></i></span>{t('Influencer')}
                                    </Link>
                            }
                        </li>
                        {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>{t('Affiliate Partner')}</Link></li> */}

                    </ul>
                </div>
                <div className="footitem">
                    <h4 className="foot_title">{t('Career')}</h4>
                    <ul className="footlinks">
                        {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>{t('Job')}</Link></li> */}
                        <li><Link to="/workwithus"><span><i className="fas fa-caret-right"></i></span>{t('Work With Us')}</Link></li>
                        {/* <li><Link to="#"><span><i className="fas fa-caret-right"></i></span>{t('Apply')}</Link></li> */}

                    </ul>
                </div>

                <div className="footitem">
                    <div className="partner_num">
                        <h3>21 +</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
