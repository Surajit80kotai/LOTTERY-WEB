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
                        <div className="accordion accordion-flush faq-container" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <span className='faq-title fs-2 py-2 px-3'>Accordion Item #1</span>
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body fs-4">
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <span className='faq-title fs-2 py-2 px-3'>Accordion Item #2</span>
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body fs-4">
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <span className='faq-title fs-2 py-2 px-3'>Accordion Item #3</span>
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body fs-4">
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </>
    )
}

export default HowToPlay