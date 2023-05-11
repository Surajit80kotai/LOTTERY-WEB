import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { termsAndConditons } from '../services/slice/SettingsSlice'

const TermsAndConditions = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { terms_conditons_data } = useSelector((state) => state.settingsSlice)



    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(termsAndConditons())
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
                            {
                                terms_conditons_data?.map((item) => {
                                    return (
                                        <div key={item?._id}>
                                            <div className="full_describtion">
                                                <h4 className=" fw-bold ">{item?.title}</h4>
                                                <p>{item?.description}</p>
                                            </div>
                                            <div className="mt-4"></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default TermsAndConditions