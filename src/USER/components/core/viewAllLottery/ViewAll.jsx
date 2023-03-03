import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCategory, fetchLottery } from '../../../services/slice/LotterySlice'
import TrustedPayment from '../../common/trustedPayment/TrustedPayment'
import CommonCard from '../home/CommonCard'
// import HomeLottery from '../home/HomeLottery'
import PreLoader from '../preloader/PreLoader'

const ViewAll = () => {
    const { categoryID } = useParams()
    const { fetch_lott_data, category_data, loading } = useSelector((state) => state.lotteryslice)
    const dispatch = useDispatch()

    const categoryObj = category_data?.reduce((acc, cur) => {
        return {
            ...acc,
            [cur.name]: cur._id
        }
    }, {});

    // finding a key from an object
    const getKey = (obj, value) => {
        for (const key in obj) {
            if (obj[key] === value) {
                return key
            }
        }
        return null
    }
    // category name
    const categoryName = getKey(categoryObj, categoryID)

    // Filtering category from data
    const LotteryCategory = fetch_lott_data?.filter((item) => item.category === categoryID)
    // console.log(LotteryCategory);

    useEffect(() => {
        dispatch(fetchLottery())
        dispatch(fetchCategory())
        window.scrollTo(0, 0)
    }, [dispatch])

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main>
                <div className="prodcut_wrapper">
                    <div className="one_row">

                        <div className="container">
                            <div className="row ">

                                {/* Home Lottery */}
                                <div className="first_row_title">
                                    <h2>{categoryName?.toUpperCase()}</h2>
                                </div>
                                {
                                    LotteryCategory?.map((item) => {
                                        return <CommonCard
                                            item={item}
                                            key={item._id}
                                        />
                                    })
                                }
                                {/* trused payment */}
                                <TrustedPayment />

                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default ViewAll