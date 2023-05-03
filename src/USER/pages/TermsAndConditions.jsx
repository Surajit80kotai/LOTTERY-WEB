import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const TermsAndConditions = () => {
    const { t } = useTranslation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <main>
                <div style={{ marginBottom: "50px" }}>
                    {/* <!-- breadcramp --> */}
                    <div className="bradcramp_area">
                        <div className="container">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/" className="text-color">{t("Home")}</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{t("Terms & Condition")}</li>
                                </ol>
                            </nav>
                        </div>

                    </div>


                    <div className="wrapper">
                        <div className="container">
                            <div className="page_title_name">
                                <h5>{t("Terms & Condition")}</h5>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="description_item">
                                        <div className="description_title"> <h5>{t("Terms & Condition")}</h5></div>
                                        <div className="full_describtion">
                                            <p>
                                                We as a policy do not collect visitors personal data who visit our website, unless shared by the visitors themselves. We have forms which visitors can fill up to submit their queries. We collect basic information on the form like visitor name, email address, contact number. We value an individuals privacy and do not share such data with any 3rd party.
                                                <br /><br />
                                                For our business purpose we also collect information about the region and location from where a enquiry is generated and the browser used. This information is used for our internal assessment and for formulating marketing strategies.
                                            </p>

                                        </div>
                                    </div>
                                </div>


                                <div className="full_describtion">
                                    <h4 className=" fw-bold ">Cookies and Log data</h4>
                                    <p>
                                        We as a policy do not collect visitors personal data who visit our website, unless shared by the visitors themselves. We have forms which visitors can fill up to submit their queries. We collect basic information on the form like visitor name, email address, contact number. We value an individuals privacy and do not share such data with any 3rd party.
                                        For our business purpose we also collect information about the region and location from where a enquiry is generated and the browser used. This information is used for our internal assessment and for formulating marketing strategies.
                                        <br /><br />
                                        We as a policy do not collect visitors personal data who visit our website, unless shared by the visitors themselves. We have forms which visitors can fill up to submit their queries. We collect basic information on the form like visitor name, email address, contact number. We value an individuals privacy and do not share such data with any 3rd party.
                                        For our business purpose we also collect information about the region and location from where a enquiry is generated and the browser used. This information is used for our internal assessment and for formulating marketing strategies.
                                    </p>

                                </div>
                                <div className="mt-4"></div>
                                <div className="full_describtion">
                                    <h4 className=" fw-bold ">Third Party Sites</h4>
                                    <p>
                                        We as a policy do not collect visitors personal data who visit our website, unless shared by the visitors themselves. We have forms which visitors can fill up to submit their queries. We collect basic information on the form like visitor name, email address, contact number. We value an individuals privacy and do not share such data with any 3rd party.
                                        For our business purpose we also collect information about the region and location from where a enquiry is generated and the browser used. This information is used for our internal assessment and for formulating marketing strategies.

                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default TermsAndConditions