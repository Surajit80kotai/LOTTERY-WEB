import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory, fetchLottery } from '../../../services/slice/LotterySlice'
import TrustedPayment from '../../common/trustedPayment/TrustedPayment'
import Cosmetics from '../home/Cosmetics'
import PreLoader from '../preloader/PreLoader'

const ViewAllCosmetics = () => {
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
    const cosmetics = fetch_lott_data?.filter((item) => item.category === categoryObj["Cosmetic"])

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
                                    <h2>Cosmetics</h2>
                                </div>
                                {
                                    cosmetics.map((item) => {
                                        return <Cosmetics
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

export default ViewAllCosmetics
