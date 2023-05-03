import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


const HowToRegister = () => {
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
                        <h2>{t("How to Register")}</h2>
                    </div>

                </div>
                <div className="bradcramp_area">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">{t("Home")}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{t("How to Register")}</li>
                            </ol>
                        </nav>
                    </div>

                </div>

                <div className="container">
                    <div className="ab_title mb-5">
                        <h2 className="title_about text-center">{t("How to Register")}</h2>
                    </div>
                    <div className="row mt-5 mb-5">
                        <div className="col-md-6">
                            <div className="heading">
                                <h4>{t("How to Register")}?</h4>
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
                                src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/03/companyregisteration1.jpg"
                                alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="row heading">
                        <div className="full_describtion">
                            <h4 className=" fw-bold ">Heading One</h4>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, in nihil adipisci quos asperiores fugit incidunt id illo ab provident labore quisquam et velit quaerat dicta doloribus hic quia placeat eius, aut sint eum reprehenderit nulla? Quae possimus consequuntur eum dicta sunt nisi eligendi recusandae nihil iusto modi accusantium, necessitatibus sequi deleniti voluptas dolorum reprehenderit alias, harum nesciunt explicabo sed officiis! Optio ipsam assumenda qui. Qui repellat repudiandae quia distinctio, quis odit, voluptatem minus quasi eum officia dicta delectus, explicabo temporibus possimus impedit vel veritatis praesentium porro magni consequuntur nam molestiae? Accusamus at eveniet quia dicta, suscipit asperiores qui? Veniam est maxime quia iste. Impedit.
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt laborum fugit facilis, obcaecati, illo deleniti nostrum, aliquid magnam quia esse mollitia dignissimos error dolores rem sint sapiente cumque pariatur dolorem sequi ullam cupiditate ipsam! Dolores dicta explicabo aspernatur exercitationem! Ullam aspernatur dolore harum quis eaque voluptate ea quas saepe! Voluptates quisquam vitae eum enim deserunt nostrum quis quidem? Blanditiis cum aperiam aliquid voluptatem quo? Soluta et perferendis deserunt non quam reprehenderit nesciunt eum odit officia placeat facilis eos expedita explicabo officiis totam recusandae error eius, quo, corrupti, porro quis maiores quod minus in! Ipsam fuga assumenda quos eos animi quas rerum itaque!
                            </p>

                        </div>
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

export default HowToRegister