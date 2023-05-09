import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Charities = () => {
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
                        <h2>{t("Charities")}</h2>
                    </div>

                </div>
                <div className="bradcramp_area">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">{t("Home")}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{t("Charities")}</li>
                            </ol>
                        </nav>
                    </div>

                </div>

                <div className="container">
                    <div className="ab_title mb-5">
                        <h2 className="title_about text-center">{t("Charities")}</h2>
                    </div>
                    <div className="row mt-5 mb-5">
                        <div className="col-md-6">
                            <div className="heading">
                                <h4>{t("Charities")}</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum nisi, esse repellendus delectus quo fuga ipsam quaerat itaque harum? Saepe eveniet commodi officia doloremque impedit qui aspernatur voluptatum voluptatem.</p>
                                <ul>
                                    <li><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus provident, dolores alias culpa dolor impedit sunt odio esse illo similique.
                                    </li>
                                    <li><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus provident, dolores alias culpa dolor impedit sunt odio esse illo similique.
                                    </li>
                                    <li><span><i className="fas fa-arrow-circle-right" style={{ color: "#f46b10" }}></i></span>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus provident, dolores alias culpa dolor impedit sunt odio esse illo similique.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="https://enlightio.com/wp-content/uploads/2022/04/reasons-why-charity-is-important.jpg"
                                alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="row heading">
                        <div className="full_describtion">
                            <h4 className=" fw-bold ">Heading One</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur totam ullam odit fuga consequatur suscipit error, labore, ipsum nisi atque soluta reiciendis nemo ad fugit! Recusandae repudiandae dignissimos dolorem inventore vel natus, eum est, voluptate nisi deserunt atque amet, voluptatibus illum! Porro voluptatem recusandae quaerat dolore rerum provident repudiandae nulla nemo quisquam alias esse fugiat necessitatibus a deserunt, corporis ad quis voluptates vitae tenetur labore accusamus laboriosam incidunt doloribus molestiae. Facere dolor et ea, minus, quasi laudantium earum nemo esse cumque assumenda laboriosam at magnam accusamus omnis facilis reprehenderit ab corrupti, non voluptatum inventore eveniet modi saepe eius corporis. Libero?
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos excepturi, fuga accusantium iure aliquid beatae optio aperiam ea. Excepturi nobis quod placeat expedita non, laborum sed quis hic velit quas ex sapiente obcaecati? Voluptatem, nam eum. Ullam, quis aut? Aut voluptatem debitis officiis quos quidem ad reiciendis, at vel maxime laboriosam fugit, sit quis? Rerum veritatis sapiente molestiae officiis eius minus nam recusandae, autem quia quisquam, totam deleniti quibusdam saepe facilis maxime! Similique possimus rerum nostrum unde necessitatibus dignissimos odit labore consequuntur voluptatibus quos! Libero harum dolores maiores consequuntur aperiam explicabo molestiae soluta eius qui, suscipit quasi consequatur cumque eveniet earum, nihil tenetur. Aut cupiditate illo fugit nam, ad eum at blanditiis atque quidem a eaque dolorem veniam ut quos!
                            </p>

                        </div>
                    </div>
                    <div className="row heading">
                        <div className="full_describtion">
                            <h4 className=" fw-bold ">Heading Two</h4>
                            <ul>
                                <li>1. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                <li>2. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                <li>3. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                <li>4. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                <li>5. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            </ul>

                        </div>
                    </div>

                </div>


            </main>
        </>
    )
}

export default Charities