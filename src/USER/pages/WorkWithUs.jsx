import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCommonPageData } from '../services/slice/SettingsSlice'

const WorkWithUs = () => {
    const { common_page_data } = useSelector((state) => state.settingsSlice)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const baseUrl = process.env.REACT_APP_NODE_HOST

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getCommonPageData())
    }, [])

    return (
        <>
            <main style={{ marginBottom: "50px" }}>
                <div className="inner_pages_title_banner">
                    <div className="page_title_banner">
                        <img src={baseUrl + common_page_data?.header_image} alt="" className="banner-img-fluid" />
                    </div>

                    <div className="page_title">
                        <h2>{t("Work With Us")}</h2>
                    </div>

                </div>
                <div className="bradcramp_area">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">{t("Home")}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{t("Work With Us")}</li>
                            </ol>
                        </nav>
                    </div>

                </div>

                <div className="container">
                    <div className="ab_title mb-5">
                        <h2 className="title_about text-center">{t("Work With Us")}</h2>
                    </div>
                    <div className="row mt-5 mb-5">
                        <div className="col-md-6">
                            <div className="heading">
                                <h4>{t("Work With Us")}</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem ab cupiditate, reprehenderit facilis corrupti ullam.
                                </p>
                                <ul>
                                    <li className='mb-3'><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, illo. Quas quo, iure facilis et esse excepturi? Ipsum, vel? Mollitia.
                                    </li>
                                    <li className='mb-3'><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, illo. Quas quo, iure facilis et esse excepturi? Ipsum, vel? Mollitia.
                                    </li>
                                    <li className='mb-3'><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, illo. Quas quo, iure facilis et esse excepturi? Ipsum, vel? Mollitia.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, illo. Quas quo, iure facilis et esse excepturi? Ipsum, vel? Mollitia.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="https://galpha.com/images/work.png"
                                alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="row heading">
                        {
                            common_page_data?.list?.map((item) => {
                                return (
                                    <div className="full_describtion" key={item?._id}>
                                        <h4 className=" fw-bold ">{item?.common_list?.heading}</h4>
                                        <p>{item?.common_list?.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row heading">
                        <div className="full_describtion">
                            <h4 className=" fw-bold ">Heading Two?</h4>
                            <ul>
                                <li>1. Lorem ipsum dolor sit amet....</li>
                                <li>2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, molestias!.</li>
                                <li>3. Lorem ipsum dolor sit amet, consectetur adipisicing elit..</li>
                                <li>4. Lorem ipsum dolor sit amet consectetur adipisicing....</li>
                                <li>5. Lorem, ipsum dolor..</li>
                            </ul>

                        </div>
                    </div>

                </div>


            </main>
        </>
    )
}

export default WorkWithUs