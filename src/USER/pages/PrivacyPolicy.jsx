import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    const { t } = useTranslation()
    // openTab Function
    function openTab(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    document.getElementById("defaultOpen")?.click();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <main>
                <div className="bradcramp_area" style={{ "marginBottom": "0" }}>
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" className="text-color">{t("Home")}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{t("Privacy Policy")}</li>
                            </ol>
                        </nav>
                    </div>

                </div>

                <div className='d-flex  justify-content-between'>
                    <div className="tab">
                        <button className="tablinks" onClick={(event) => openTab(event, 'firstTab')} id="defaultOpen">{t("Privacy")}</button>
                        <button className="tablinks" onClick={(event) => openTab(event, 'secondTab')}>{t("Data collected")}</button>
                        <button className="tablinks" onClick={(event) => openTab(event, 'thirdTab')}>{t("How data is collected and processed")}</button>
                        <button className="tablinks" onClick={(event) => openTab(event, 'fouthTab')} id="defaultOpen">{t("Use of data")}</button>
                        <button className="tablinks" onClick={(event) => openTab(event, 'fifthTab')}>{t("Telephone communications")}</button>
                        <button className="tablinks" onClick={(event) => openTab(event, 'sixthTab')}>{t("Exempted disclosures")}</button>

                        <button className="tablinks" onClick={(event) => openTab(event, 'sevenTab')} id="defaultOpen">{t("Access")}</button>
                        <button className="tablinks" onClick={(event) => openTab(event, 'eightTab')}>{t("Acceptance of the use of electronic service providers")}</button>
                        <button className="tablinks" onClick={(event) => openTab(event, 'nineTab')} >{t("Acceptance of security controls")}</button >
                        <button className="tablinks" onClick={(event) => openTab(event, 'tenTab')} id="defaultOpen" >{t("Security")}</button >

                        <button className="tablinks" onClick={(event) => openTab(event, 'elevenTab')} id="defaultOpen" >{t("Protection of minors")}</button >
                        <button className="tablinks" onClick={(event) => openTab(event, 'twelveTab')} >{t("International transfers")}</button >
                        <button className="tablinks" onClick={(event) => openTab(event, 'thirteenTab')} >{t("Third party practices")}</button >
                        <button className="tablinks" onClick={(event) => openTab(event, 'fourteenTab')} id="defaultOpen" >{t("Disclaimer")}</button >
                        <button className="tablinks" onClick={(event) => openTab(event, 'fifteenTab')} >{t("Mergers and other events requiring transfer")}</button >
                        <button className="tablinks" onClick={(event) => openTab(event, 'sixteenTab')} >{t("Acceptance of privacy policy")}</button >

                    </div >
                    <div>

                        <div id="firstTab" className="tabcontent">
                            <h3>{t("Privacy")}</h3>
                            <h6 className="text-danger mb-4"><strong>Last Update : Dec 24,2023</strong> </h6>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* 
                                // <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                        </div>

                        <div id="secondTab" className="tabcontent">
                            <h3>Data collect</h3>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                        </div>

                        <div id="thirdTab" className="tabcontent">
                            <h3> How data is collected and processed</h3>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                        </div>

                        <div id="fouthTab" className="tabcontent">
                            <h3>Use of Data</h3>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                        </div>

                        <div id="fifthTab" className="tabcontent">
                            <h3>Telephone communications</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                        </div>
                        <div id="sixthTab" className="tabcontent">
                            <h3>Exempted disclosures</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper.
                                Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, </p>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                        </div>

                        <div id="sevenTab" className="tabcontent">
                            <h3>Access</h3>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <h4 className="content_title"><span><i className="far fa-check-circle" style={{ "color": "#f89130" }}></i></span> Heading </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat.
                                Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna
                                tincidunt volutpat. Nunc bibendum quam ut congue dignissim.
                                <br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus.
                                Donec vitae ullamcorper lacus, ut vehicula metus.
                                {/* <div className="mb-2"></div> */}

                            </p>
                            <p> <span><i className="fas fa-circle" style={{ "color": "#f29f2c" }}></i></span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum,  </p>
                            <p> <span><i className="fas fa-circle" style={{ "color": "#f29f2c" }}></i></span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                            <p> <span><i className="fas fa-circle" style={{ "color": "#f29f2c" }}></i></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum,  </p>

                            <p> <span><i className="fas fa-circle" style={{ "color": "#f29f2c" }}></i></span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        </div>

                        <div id="eightTab" className="tabcontent">
                            <h3>Second tab title</h3>
                            <p>Cras euismod, urna id blandit maximus, sapien lorem tristique ex, eget maximus nibh tellus in arcu. Suspendisse libero metus, eleifend elementum velit varius, dapibus rutrum ex. Ut tincidunt, felis auctor ornare fermentum, sem quam imperdiet turpis, quis porttitor purus lacus quis quam. Donec erat massa, sodales sit amet mollis pretium, tempor ac ex. Maecenas fermentum tristique venenatis. Vivamus sollicitudin consequat ligula eu facilisis. </p>
                        </div>

                        <div id="nineTab" className="tabcontent">
                            <h3>Third tab title</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                        </div>

                        <div id="tenTab" className="tabcontent">
                            <h3>Third tab title</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                        </div>


                        <div id="elevenTab" className="tabcontent">
                            <h3>First tab title</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim maximus enim, nec dictum diam pellentesque nec. Nulla facilisis, massa ut egestas bibendum, ex libero varius nisl, a aliquet dui ante sed purus. Donec vitae ullamcorper lacus, ut vehicula metus. Duis molestie ipsum quis nisl ultrices feugiat. Nam at purus ut ligula ultrices aliquet vitae nec eros. Aenean condimentum tellus eu urna tincidunt volutpat. Nunc bibendum quam ut congue dignissim. Aliquam congue velit at tortor consequat cursus ut ut diam. Fusce iaculis auctor purus.</p>
                        </div>

                        <div id="twelveTab" className="tabcontent">
                            <h3>Second tab title</h3>
                            <p>Cras euismod, urna id blandit maximus, sapien lorem tristique ex, eget maximus nibh tellus in arcu. Suspendisse libero metus, eleifend elementum velit varius, dapibus rutrum ex. Ut tincidunt, felis auctor ornare fermentum, sem quam imperdiet turpis, quis porttitor purus lacus quis quam. Donec erat massa, sodales sit amet mollis pretium, tempor ac ex. Maecenas fermentum tristique venenatis. Vivamus sollicitudin consequat ligula eu facilisis. </p>
                        </div>

                        <div id="thirteenTab" className="tabcontent">
                            <h3>Third tab title</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                        </div>

                        <div id="fourteenTab" className="tabcontent">
                            <h3>Fouth tab title</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                        </div>

                        <div id="fifteenTab" className="tabcontent">
                            <h3>fifth tab title</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                        </div>
                        <div id="sixteenTab" className="tabcontent">
                            <h3>sixth tab title</h3>
                            <p>Suspendisse lacinia sapien eget risus porttitor, sit amet faucibus velit ullamcorper. Quisque dictum erat neque, placerat dignissim ante tempor at. Nullam ullamcorper justo felis, nec pulvinar ex suscipit vel. Donec viverra leo ut ante iaculis, sit amet porta leo vehicula. Suspendisse fermentum congue ligula sed molestie. Praesent lacinia, massa non fringilla scelerisque, tellus arcu sodales nunc, in ultrices sapien ante et ante. In iaculis tellus urna, at convallis massa porta in. Proin vehicula facilisis varius. Pellentesque vitae purus non mauris ultricies porttitor nec sodales nulla.</p>
                        </div>
                    </div>
                </div>



            </main >
        </>
    )
}

export default PrivacyPolicy