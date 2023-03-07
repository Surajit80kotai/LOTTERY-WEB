import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/core/home/Banner'
import TrustedPayment from '../components/common/trustedPayment/TrustedPayment'
import { fetchCategory, fetchLottery } from '../services/slice/LotterySlice'
import { getCart } from '../services/slice/CartSlice'
import PreLoader from '../components/core/preloader/PreLoader'
import CommonCard from '../components/core/home/CommonCard'


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

                    <div className="container">
                        <div className="row ">

                            {/* Home Lottery */}
                            <div className="first_row_title">
                                <h2>House & Apartments</h2>
                            </div>
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
                            {/* divider */}
                            <div className="divider"></div>

                            {/* <!-- car bike --> */}
                            <div className="first_row_title">
                                <h2>Cars & Bikes</h2>
                            </div>
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

                            {/* divider */}
                            <div className="divider"></div>
                            {/* <!-- stydy travel --> */}
                            <div className="first_row_title">
                                <h2>Study & Travel</h2>
                            </div>
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

                            {/* divider */}
                            <div className="divider"></div>

                            {/* <!-- computers & phones --> */}
                            <div className="first_row_title">
                                <h2>Computer & Phones</h2>
                            </div>
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

                            {/* divider */}
                            <div className="divider"></div>

                            {/* <!-- cosmetic --> */}
                            <div className="first_row_title">
                                <h2>Cosmetics</h2>
                            </div>
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

                            {/* <div className="text-center ">
                                <button className="btn3">Load More</button>
                            </div> */}

                            {/* trused payment */}
                            <TrustedPayment />

                        </div>
                                               
                    </div>
                </div>

            </div>
            {/* </main> */}
        </>
    )
}

export default Home
