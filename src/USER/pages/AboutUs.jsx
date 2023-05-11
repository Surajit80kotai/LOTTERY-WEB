import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <main>
                <div className="inner_pages_title_banner">
                    <div className="page_title_banner">
                        <img src="/assets/img/Untitled-1.jpg" alt="" className="banner-img-fluid" />
                    </div>

                    <div className="page_title">
                        <h2>{t("About")} {t("Us")}</h2>
                    </div>

                </div>
                {/* <!-- breadcramp --> */}

                <div className="bradcramp_area">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">{t("Home")}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{t("About")}</li>
                            </ol>
                        </nav>
                    </div>

                </div>


                {/* <!-- about section start --> */}

                <div className="container ">

                    {/* <!-- property betting --> */}

                    <div className="row">

                        <div className="col-md-6">
                            <div className="about_img">
                                <img src="/assets/img/aboutimg2.jpg" alt="" className="img-fluid" />
                            </div>

                            <div className="overlay_description right">
                                <div className="">
                                    <h1>What is Lorem Ipsum?</h1>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    <br /> when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic</p>

                            </div>

                        </div>


                        <div className="col-md-6 gap_right">
                            <div className="ab_title">
                                <h2 className="title_about"> Property Betting</h2>
                                <h3>Introduction</h3>
                            </div>
                            <div className="main_about_content">
                                <p>
                                    We are an online lottery ticket messenger service providing customers with the opportunity to play the
                                    biggest lottery draws, with official lottery tickets, from anywhere in the world. As an independent
                                    third-party ticket purchasing service, we have been leading the online lottery industry since 2002,
                                    serving as the industry standard with a stellar reputation and professional 24/7 customer service.
                                    <br />
                                    <br />
                                    The website is operated by Serlo Limited, a company registered in the Isle of Man (registration number:
                                    134824C) having its registered office at Peveril Buildings, Peveril Square, Douglas, Isle of Man, IM99
                                    1RZ. Serlo Limited is licensed and regulated by the Isle of Man Gambling Supervision Commission under a
                                    license issued under the Online Gambling Regulation Act 2001 on 25 February 2022.
                                </p>


                                <div className="ab_title">
                                    <h3>How we can help </h3>
                                </div>
                            </div>
                            <div className="main_about_content">
                                <p>
                                    We are an online lottery ticket messenger service providing customers with the opportunity to play the
                                    biggest lottery draws, with official lottery tickets, from anywhere in the world. As an independent
                                    third-party ticket purchasing service, we have been leading the online lottery industry since 2002,
                                    serving as the industry standard with a stellar reputation and professional 24/7 customer service.
                                    <br />
                                </p>



                            </div>
                        </div>
                    </div>

                    <hr />


                    {/* <!-- property betting --> */}

                    <div className="row ">

                        <div className="col-md-6 gap_right">
                            <div className="ab_title">
                                <h2 className="title_about"> Car Betting </h2>
                                <h3>Introduction</h3>
                            </div>
                            <div className="main_about_content">
                                <p>
                                    We are an online lottery ticket messenger service providing customers with the opportunity to play the
                                    biggest lottery draws, with official lottery tickets, from anywhere in the world. As an independent
                                    third-party ticket purchasing service, we have been leading the online lottery industry since 2002,
                                    serving as the industry standard with a stellar reputation and professional 24/7 customer service.
                                    <br />

                                    <br />
                                    The website is operated by Serlo Limited, a company registered in the Isle of Man (registration number:
                                    134824C) having its registered office at Peveril Buildings, Peveril Square, Douglas, Isle of Man, IM99
                                    1RZ. Serlo Limited is licensed and regulated by the Isle of Man Gambling Supervision Commission under a
                                    license issued under the Online Gambling Regulation Act 2001 on 25 February 2022.
                                </p>


                                <div className="ab_title">
                                    <h3>How we can help </h3>
                                </div>
                            </div>
                            <div className="main_about_content">
                                <p>
                                    We are an online lottery ticket messenger service providing customers with the opportunity to play the
                                    biggest lottery draws, with official lottery tickets, from anywhere in the world. As an independent
                                    third-party ticket purchasing service, we have been leading the online lottery industry since 2002,
                                    serving as the industry standard with a stellar reputation and professional 24/7 customer service.
                                    <br />
                                </p>



                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="about_img mt-5">
                                <img src="/assets/img/aboutimg4.jpg" alt="" className="img-fluid" />
                            </div>

                            <div className="overlay_description right">
                                <div className="">
                                    <h1>What is Lorem Ipsum?</h1>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    <br /> when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic</p>

                            </div>

                        </div>

                    </div>


                    <hr />
                    {/* <!-- torism betting --> */}
                    <div className="mt-5 "></div>
                    <div className="row">

                        <div className="col-md-6">
                            <div className="about_img">
                                <img src="/assets/img/aboutimg5.jpg" alt="" className="img-fluid" />
                            </div>

                            <div className="overlay_description right">
                                <div className="">
                                    <h1>What is Lorem Ipsum?</h1>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    <br /> when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic</p>

                            </div>

                        </div>


                        <div className="col-md-6 gap_right">
                            <div className="ab_title">
                                <h2 className="title_about"> 	Education and Tourism Betting</h2>
                                <h3>Introduction</h3>
                            </div>
                            <div className="main_about_content">
                                <p>
                                    We are an online lottery ticket messenger service providing customers with the opportunity to play the
                                    biggest lottery draws, with official lottery tickets, from anywhere in the world. As an independent
                                    third-party ticket purchasing service, we have been leading the online lottery industry since 2002,
                                    serving as the industry standard with a stellar reputation and professional 24/7 customer service.
                                    <br />
                                    <br />
                                    The website is operated by Serlo Limited, a company registered in the Isle of Man (registration number:
                                    134824C) having its registered office at Peveril Buildings, Peveril Square, Douglas, Isle of Man, IM99
                                    1RZ. Serlo Limited is licensed and regulated by the Isle of Man Gambling Supervision Commission under a
                                    license issued under the Online Gambling Regulation Act 2001 on 25 February 2022.
                                </p>


                                <div className="ab_title">
                                    <h3>How we can help </h3>
                                </div>
                            </div>
                            <div className="main_about_content">
                                <p>
                                    We are an online lottery ticket messenger service providing customers with the opportunity to play the
                                    biggest lottery draws, with official lottery tickets, from anywhere in the world. As an independent
                                    third-party ticket purchasing service, we have been leading the online lottery industry since 2002,
                                    serving as the industry standard with a stellar reputation and professional 24/7 customer service.
                                    <br />
                                </p>



                            </div>
                        </div>
                    </div>




                    {/* <!-- other betting --> */}


                </div>
            </main>
        </>
    )
}

export default AboutUs