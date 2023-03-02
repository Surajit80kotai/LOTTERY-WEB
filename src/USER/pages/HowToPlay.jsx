import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const HowToPlay = () => {



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
                        <h2>How to play</h2>

                    </div>

                </div>
                {/* <!-- breadcramp --> */}
                <div className="bradcramp_area">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">How to play</li>
                            </ol>
                        </nav>
                    </div>

                </div>


                {/* <!-- about section start --> */}

                <div className="container mb-5">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="ab_title">
                                <h2 className="title_about text-center">How to play</h2>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div className="step_area">
                                        <div className="img_icon">
                                            <img src="/assets/img/icon1.png" alt="" />
                                        </div>
                                        <div className="step_details">
                                            <h6>
                                                <Link to="/signup">Sign-up</Link> for a
                                                free account.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="step_area">
                                        <div className="img_icon">
                                            <img src="/assets/img/icon2.png" alt="" />
                                        </div>
                                        <div className="step_details">
                                            <h6>
                                                Choose a lottery and
                                                <Link to="/">Buy Your Ticket</Link>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="step_area">
                                        <div className="img_icon">
                                            <img src="/assets/img/icon4.png" alt="" />
                                        </div>
                                        <div className="step_details">
                                            <h6>
                                                We will notify you by email or SMS when you win.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="container mb-5">

                    <div className="faq_area">
                        <h1>Frequently Asked Questions</h1>
                        <div className="faq-container">
                            <div className="faq">
                                <h3 className="faq-title">
                                    Lorem ipsum dolor sit amet.
                                </h3>
                                <p className="faq-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nobis, repellat neque non
                                    dicta
                                    fugiat veritatis sit delectus perspiciatis quis?</p>
                                <button className="faq-toggle">
                                    <i className="fas fa-angle-down"></i>
                                </button>
                            </div>

                            <div className="faq active">
                                <h3 className="faq-title">
                                    Lorem ipsum dolor sit amet.
                                </h3>
                                <p className="faq-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nobis, repellat neque non
                                    dicta
                                    fugiat veritatis sit delectus perspiciatis quis?</p>
                                <button className="faq-toggle">
                                    <i className="fas fa-angle-down"></i>
                                </button>
                            </div>

                            <div className="faq">
                                <h3 className="faq-title">
                                    Lorem ipsum dolor sit amet.
                                </h3>
                                <p className="faq-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nobis, repellat neque non
                                    dicta
                                    fugiat veritatis sit delectus perspiciatis quis?</p>
                                <button className="faq-toggle">
                                    <i className="fas fa-angle-down"></i>
                                </button>
                            </div>

                            <div className="faq">
                                <h3 className="faq-title">
                                    Lorem ipsum dolor sit amet.
                                </h3>
                                <p className="faq-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nobis, repellat neque non
                                    dicta
                                    fugiat veritatis sit delectus perspiciatis quis?</p>
                                <button className="faq-toggle">
                                    <i className="fas fa-angle-down"></i>
                                </button>
                            </div>

                            <div className="faq">
                                <h3 className="faq-title">
                                    Lorem ipsum dolor sit amet.
                                </h3>
                                <p className="faq-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nobis, repellat neque non
                                    dicta
                                    fugiat veritatis sit delectus perspiciatis quis?</p>
                                <button className="faq-toggle">
                                    <i className="fas fa-angle-down"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </>
    )
}

export default HowToPlay