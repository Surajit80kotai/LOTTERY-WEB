import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/core/home/Banner'
import TrustedPayment from '../components/common/trustedPayment/TrustedPayment'
import { fetchCategory, fetchLottery } from '../services/slice/LotterySlice'
import PreLoader from '../components/core/preloader/PreLoader'
import { Link, useNavigate } from 'react-router-dom'
import { clearCartSliceError, getCart } from '../services/slice/CartSlice'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import SliderCard from '../components/core/home/SliderCard'
import { clearUserSliceError } from '../services/slice/UserSlice'
import { clearPaymentSliceError } from '../services/slice/PaymentSlice'
import { toast } from 'react-toastify'


const Home = () => {
    const { fetch_lott_data, category_data } = useSelector((state) => state.lotteryslice)
    const { cart_data, loading, cartSliceError } = useSelector((state) => state.cartslice)
    const { paymentSliceError } = useSelector((state) => state.paymentslice)
    const { userSliceError } = useSelector((state) => state.userslice)
    const dispatch = useDispatch()
    const cartLength = cart_data?.length
    const navigate = useNavigate()
    const token = JSON.parse(window.localStorage.getItem("token"))
    const error = (cartSliceError?.error === true || paymentSliceError?.error === true || userSliceError?.error === true) ? true : false


    // Getting category_name & category_id
    const categoryObj = category_data?.reduce((acc, cur) => {
        return {
            ...acc,
            [cur.name]: cur._id
        }
    }, {});


    // slider array
    const catNames = Object.keys(categoryObj)
    const ticketArray = catNames.reduce((acc, cur) => {
        acc?.push(fetch_lott_data?.filter(item => item.category === categoryObj[cur]))
        return acc
    }, [])

    // finding a key from an object
    const getKey = (obj, value) => {
        for (const key in obj) {
            if (obj[key] === value) {
                return key
            }
        }
        return null
    }

    useEffect(() => {
        if (error) {
            toast.info("Your Session Is Expeired.\nPlease Login To Continue", {
                autoClose: 3500
            })
        }
        return () => {
            dispatch(clearCartSliceError())
            dispatch(clearUserSliceError())
            dispatch(clearPaymentSliceError())
        }
    }, [dispatch, error])

    // mount cycle
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchLottery())
        dispatch(fetchCategory())
        dispatch(getCart(navigate))
    }, [dispatch, navigate, cartLength, token])


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            {/* Banner */}
            <Banner />

            {/* <main> */}
            {/* Product Area */}
            <div className="prodcut_wrapper">
                <div className="one_row">

                    <div className="container-fluid" style={{ "width": "95%" }}>
                        {/* Mapping from ticketArray */}
                        {
                            ticketArray?.map((curItem, index) => {
                                return (
                                    <div className='row' key={index}>
                                        <div className="first_row_title">
                                            <h2>
                                                {
                                                    (getKey(categoryObj, curItem[0]?.category))?.toUpperCase()
                                                }
                                            </h2>
                                        </div>
                                        <div className="col-md-2">
                                            {
                                                curItem[0]?.category ?
                                                    <div className="view_all_bg">
                                                        <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                                        <div className="viewall_btn">
                                                            <h6>Looking More? Click Here</h6>
                                                            <Link to={`/viewall/${curItem[0]?.category}`} className="btn2">View All</Link>
                                                        </div>
                                                    </div>

                                                    : null
                                            }

                                        </div>
                                        <div className="col-md-10">
                                            <Swiper
                                                slidesPerView={4}
                                                spaceBetween={10}
                                                navigation={true}
                                                modules={[Navigation]}
                                                className="mySwiper"
                                                // loop={true}
                                                // autoplay={true}
                                                // autoplaySpeed={5000}
                                                // speed={4000}
                                                breakpoints={{
                                                    1920: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 10
                                                    },
                                                    1028: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 10
                                                    },
                                                    1024: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 10
                                                    },
                                                    640: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 10,
                                                    },
                                                    768: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 10,
                                                    },
                                                    375: {
                                                        slidesPerView: 1,
                                                        spaceBetween: 10
                                                    }

                                                }}
                                            >
                                                {
                                                    curItem?.map((item) => {
                                                        return (
                                                            <SwiperSlide key={item._id}>
                                                                <div className="swiper-slide">
                                                                    <SliderCard
                                                                        item={item}
                                                                    />
                                                                </div>
                                                            </SwiperSlide>
                                                        )
                                                    })
                                                }
                                            </Swiper>
                                        </div>

                                    </div>
                                )
                            })
                        }

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