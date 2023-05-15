import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cookiePolicy } from '../services/slice/SettingsSlice'

const CookiePolicy = () => {
    const { cookie_policy_data } = useSelector((state) => state.settingsSlice)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(cookiePolicy())
    }, [dispatch])


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
                                    <li className="breadcrumb-item active" aria-current="page">{t("Cookies Policy")}</li>
                                </ol>
                            </nav>
                        </div>

                    </div>


                    <div className="wrapper">
                        <div className="container">
                            <div className="page_title_name">
                                <h5>{t("Cookies Policy")}</h5>
                            </div>
                            {
                                cookie_policy_data?.map((item) => {
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

export default CookiePolicy