import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/core/home/Banner'
import TrustedPayment from '../components/common/trustedPayment/TrustedPayment'
import { fetchCategory, fetchLottery } from '../services/slice/LotterySlice'
import { getCart } from '../services/slice/CartSlice'
import PreLoader from '../components/core/preloader/PreLoader'
import CommonCard from '../components/core/home/CommonCard'
import { Link } from 'react-router-dom'


const Home = () => {
    const { fetch_lott_data, category_data, loading } = useSelector((state) => state.lotteryslice)
    const dispatch = useDispatch()

    // Getting category_name & category_id
    const categoryObj = category_data?.reduce((acc, cur) => {
        return {
            ...acc,
            [cur.name]: cur._id
        }
    }, {});



    // Filtering category from data
    const house = fetch_lott_data?.filter((item) => item.category === categoryObj["House"])
    const vehicle = fetch_lott_data?.filter((item) => item.category === categoryObj["Cars & Bike"])
    const cosmetics = fetch_lott_data?.filter((item) => item.category === categoryObj["Cosmetic"])
    const study_travel = fetch_lott_data?.filter((item) => item.category === categoryObj["Study & abroad"])
    const comp_phn = fetch_lott_data?.filter((item) => item.category === categoryObj["computers & phones"])

    // slider array
    const sliderArray = [0, 1]
    // const ticketArray = [house, vehicle, cosmetics, study_travel, comp_phn]

    // console.log(ticketArray);

    // mount cycle
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchLottery())
        dispatch(fetchCategory())
        dispatch(getCart())
    }, [dispatch])



    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            {/* Banner */}
            <Banner
                house={house}
                vehicle={vehicle}
            />

            {/* <main> */}
            {/* Product Area */}
            <div className="prodcut_wrapper">
                <div className="one_row">

                    <div className="container-fluid">

                        {/* {
                            ticketArray?.map((curItem, index) => {
                                return (
                                    <div className='row' key={index}>
                                        <div className="first_row_title">
                                            <h2>House & Apartments</h2>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="view_all_bg">
                                                <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                                <div className="viewall_btn">
                                                    <h6>Looking More? Click Here</h6>
                                                    <Link to={`/viewall/${house[0]?.category}`} className="btn2">View All</Link>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-md-10">
                                            <div id="carouselExampleControls-house" className="carousel slide" data-bs-ride="carousel">
                                                <div className="carousel-inner">
                                                    {
                                                        sliderArray?.map((index) => {
                                                            let act = ""
                                                            if (index === 0) {
                                                                act = "active";
                                                            }
                                                            return (
                                                                <div className={`carousel-item ${act}`
                                                                } key={index}>
                                                                    <div className="mx-2">
                                                                        <div className="cards-wrapper">
                                                                            {
                                                                                curItem?.map((item, index) => {
                                                                                    return <CommonCard
                                                                                        item={item}
                                                                                        key={item._id}
                                                                                        index={index}
                                                                                        category={item.category}
                                                                                    />
                                                                                }).slice(0, 8)
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-house"
                                                        data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-house"
                                                        data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        } */}

                        <div className='row'>
                            {/* Home Lottery */}
                            <div className="first_row_title">
                                <h2>House & Apartments</h2>
                            </div>
                            {/* View All Div */}
                            <div className="col-md-2">
                                <div className="view_all_bg">
                                    <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                    <div className="viewall_btn">
                                        <h6>Looking More? Click Here</h6>
                                        <Link to={`/viewall/${house[0]?.category}`} className="btn2">View All</Link>
                                    </div>
                                </div>

                            </div>

                            {/* Card Slider Div */}
                            <div className="col-md-10">
                                <div id="carouselExampleControls-house" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            sliderArray?.map((index) => {
                                                let act = ""
                                                if (index === 0) {
                                                    act = "active";
                                                }
                                                return (
                                                    <div className={`carousel-item ${act}`
                                                    } key={index}>
                                                        <div className="mx-2">
                                                            <div className="cards-wrapper">
                                                                {
                                                                    house?.map((item, index) => {
                                                                        return <CommonCard
                                                                            item={item}
                                                                            key={item._id}
                                                                            index={index}
                                                                            category={item.category}
                                                                        />
                                                                    }).slice(0, 8)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-house"
                                            data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-house"
                                            data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* divider */}
                        <div className="divider"></div>

                        <div className="row ">
                            {/* <!-- car bike --> */}
                            <div className="first_row_title">
                                <h2>Cars & Bikes</h2>
                            </div>
                            {/* View All Div */}
                            <div className="col-md-2">
                                <div className="view_all_bg">
                                    <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                    <div className="viewall_btn">
                                        <h6>Looking More? Click Here</h6>
                                        <Link to={`/viewall/${vehicle[0]?.category}`} className="btn2">View All</Link>
                                    </div>
                                </div>

                            </div>

                            {/* Card Slider Div */}
                            <div className="col-md-10">
                                <div id="carouselExampleControls-vehicle" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            sliderArray?.map((index) => {
                                                let act = ""
                                                if (index === 0) {
                                                    act = "active";
                                                }
                                                return (
                                                    <div className={`carousel-item ${act}`
                                                    } key={index}>
                                                        <div className="mx-2">
                                                            <div className="cards-wrapper">
                                                                {
                                                                    vehicle?.map((item, index) => {
                                                                        return <CommonCard
                                                                            item={item}
                                                                            key={item._id}
                                                                            index={index}
                                                                            category={item.category}
                                                                        />
                                                                    }).slice(0, 8)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-vehicle"
                                            data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-vehicle"
                                            data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className="divider"></div>

                        <div className="row ">
                            {/* <!-- stydy travel --> */}
                            <div className="first_row_title">
                                <h2>Study & Travel</h2>
                            </div>
                            {/* View All Div */}
                            <div className="col-md-2">
                                <div className="view_all_bg">
                                    <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                    <div className="viewall_btn">
                                        <h6>Looking More? Click Here</h6>
                                        <Link to={`/viewall/${study_travel[0]?.category}`} className="btn2">View All</Link>
                                    </div>
                                </div>

                            </div>

                            {/* Card Slider Div */}
                            <div className="col-md-10">
                                <div id="carouselExampleControls-study_travel" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            sliderArray?.map((index) => {
                                                let act = ""
                                                if (index === 0) {
                                                    act = "active";
                                                }
                                                return (
                                                    <div className={`carousel-item ${act}`
                                                    } key={index}>
                                                        <div className="mx-2">
                                                            <div className="cards-wrapper">
                                                                {
                                                                    study_travel?.map((item, index) => {
                                                                        return <CommonCard
                                                                            item={item}
                                                                            key={item._id}
                                                                            index={index}
                                                                            category={item.category}
                                                                        />
                                                                    }).slice(0, 8)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-study_travel"
                                            data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-study_travel"
                                            data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className="divider"></div>

                        <div className="row ">
                            {/* <!-- computers & phones --> */}
                            <div className="first_row_title">
                                <h2>Computer & Phones</h2>
                            </div>
                            {/* View All Div */}
                            <div className="col-md-2">
                                <div className="view_all_bg">
                                    <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                    <div className="viewall_btn">
                                        <h6>Looking More? Click Here</h6>
                                        <Link to={`/viewall/${comp_phn[0]?.category}`} className="btn2">View All</Link>
                                    </div>
                                </div>

                            </div>

                            {/* Card Slider Div */}
                            <div className="col-md-10">
                                <div id="carouselExampleControls-comp_phn" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            sliderArray?.map((index) => {
                                                let act = ""
                                                if (index === 0) {
                                                    act = "active";
                                                }
                                                return (
                                                    <div className={`carousel-item ${act}`
                                                    } key={index}>
                                                        <div className="mx-2">
                                                            <div className="cards-wrapper">
                                                                {
                                                                    comp_phn?.map((item, index) => {
                                                                        return <CommonCard
                                                                            item={item}
                                                                            key={item._id}
                                                                            index={index}
                                                                            category={item.category}
                                                                        />
                                                                    }).slice(0, 8)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-comp_phn"
                                            data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-comp_phn"
                                            data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className="divider"></div>

                        <div className="row ">
                            {/* <!-- cosmetic --> */}
                            <div className="first_row_title">
                                <h2>Cosmetics</h2>
                            </div>
                            {/* View All Div */}
                            <div className="col-md-2">
                                <div className="view_all_bg">
                                    <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                    <div className="viewall_btn">
                                        <h6>Looking More? Click Here</h6>
                                        <Link to={`/viewall/${cosmetics[0]?.category}`} className="btn2">View All</Link>
                                    </div>
                                </div>

                            </div>

                            {/* Card Slider Div */}
                            <div className="col-md-10">
                                <div id="carouselExampleControls-cosmetics" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            sliderArray?.map((index) => {
                                                let act = ""
                                                if (index === 0) {
                                                    act = "active";
                                                }
                                                return (
                                                    <div className={`carousel-item ${act}`
                                                    } key={index}>
                                                        <div className="mx-2">
                                                            <div className="cards-wrapper">
                                                                {
                                                                    cosmetics?.map((item, index) => {
                                                                        return <CommonCard
                                                                            item={item}
                                                                            key={item._id}
                                                                            index={index}
                                                                            category={item.category}
                                                                        />
                                                                    }).slice(0, 8)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-cosmetics"
                                            data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-cosmetics"
                                            data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="text-center ">
                                <button className="btn3">Load More</button>
                            </div> */}

                        {/* trused payment */}
                        <TrustedPayment />

                    </div>

                </div>
            </div>
            {/* </main> */}
        </>
    )
}

export default Home
