import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const HowToDeposit = () => {
    const { t } = useTranslation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <main style={{ marginBottom: "50px" }}>
                <div className="inner_pages_title_banner">
                    <div className="page_title_banner">
                        <img src="assets/img/Untitled-1.jpg" alt="" className="img-fluid" />
                    </div>

                    <div className="page_title">
                        <h2>{t("How to Deposit")}e</h2>
                    </div>

                </div>
                <div className="bradcramp_area">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">{t("Home")}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{t("How to Deposit")}</li>
                            </ol>
                        </nav>
                    </div>

                </div>

                <div className="container">
                    <div className="ab_title mb-5">
                        <h2 className="title_about text-center">{t("How to Deposit")}e</h2>
                    </div>
                    <div className="row mt-5 mb-5">
                        <div className="col-md-6">
                            <div className="heading">
                                <h4>{t("How do you deposit money into a bank")}?</h4>
                                <p>To deposit money at a bank branch, provide your cash and endorsed checks and a deposit slip to the
                                    teller.
                                    Both checks and cash can be deposited in-person at any of your bank's locations.</p>
                                <ul>
                                    <li><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        If the information is not present or incorrect, talk to a representative of the issuing bank
                                    </li>
                                    <li><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        Count the checks and go in some order, for example, ascending or descending order., so that you can make
                                        sure your balance equals the balance on the deposit slip
                                    </li>
                                    <li><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        There should be a space to the left of the deposit slip for you to write the date of your deposit. This
                                        will help the transaction proceed smoothly and prevent confusion
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/blog/big/fixed-deposit-investing-10-important-things-you-should-know-before-investing-in-fd.jpg"
                                alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="row heading">
                        <div className="full_describtion">
                            <h4 className=" fw-bold ">{t("Cookies and Log data")}</h4>
                            <p>
                                We as a policy do not collect visitors personal data who visit our website, unless shared by the visitors
                                themselves. We have forms which visitors can fill up to submit their queries. We collect basic information
                                on the form like visitor name, email address, contact number. We value an individuals privacy and do not
                                share such data with any 3rd party.
                                For our business purpose we also collect information about the region and location from where a enquiry is
                                generated and the browser used. This information is used for our internal assessment and for formulating
                                marketing strategies.
                                <br /><br />
                                We as a policy do not collect visitors personal data who visit our website, unless shared by the visitors
                                themselves. We have forms which visitors can fill up to submit their queries. We collect basic information
                                on the form like visitor name, email address, contact number. We value an individuals privacy and do not
                                share such data with any 3rd party.
                                For our business purpose we also collect information about the region and location from where a enquiry is
                                generated and the browser used. This information is used for our internal assessment and for formulating
                                marketing strategies.
                            </p>

                        </div>
                    </div>
                    <div className="row heading">
                        <div className="full_describtion">
                            <h4 className=" fw-bold ">{t("How do you deposit step by step")}?</h4>
                            <ul>
                                <li>1.List the amount of money you want to deposit. ...</li>
                                <li>2.For example, add $30 (cash) and $450.55 (check).</li>
                                <li>3.Enter the subtotal.</li>
                                <li>4.Enter any amount you want back. ..</li>
                                <li>5.Enter the Total. </li>
                            </ul>

                        </div>
                    </div>

                </div>


            </main>
        </>
    )
}

export default HowToDeposit