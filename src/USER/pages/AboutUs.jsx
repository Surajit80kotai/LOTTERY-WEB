import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <main>
                <div className="inner_pages_title_banner">
                    <div className="page_title_banner">
                        <img src="/assets/img/Untitled-1.jpg" alt="" className="img-fluid" />
                    </div>

                    <div className="page_title">
                        <h2>About Us</h2>
                    </div>

                </div>
                {/* <!-- breadcramp --> */}

                <div className="bradcramp_area">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">About</li>
                            </ol>
                        </nav>
                    </div>

                </div>


                {/* <!-- about section start --> */}

                <div className="container ">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="ab_title">
                                <h2 className="title_about">About Es-Play</h2>
                                <h3>Who We Are?</h3>
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

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="about_img">
                                <img src="/assets/img/about.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AboutUs