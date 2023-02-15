import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userOrderHistory } from '../../../services/slice/UserSlice'
import PreLoader from '../preloader/PreLoader'

const OrderHistory = () => {
    const { order_history_data, loading } = useSelector(state => state.userslice)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userOrderHistory())
    }, [dispatch])

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <div className="content_wrapper">

                {/* order history  */}
                <div className="container ">
                    <div className="order_histry_wrapper scroll">
                        {/* order his item  */}
                        {
                            order_history_data?.length ?
                                order_history_data?.map((item) => {
                                    return (
                                        <div className="orderhistroy_item" key={item?._id}>
                                            <div className="ribbon-wrapper-green">
                                                <div className="ribbon-green">won</div>
                                            </div>

                                            <div className="pro_im_t">
                                                <div className="product_history_img">
                                                    <img src={item?.image_link} alt="" className="img-fluid" />
                                                </div>
                                                <div className="info_pro_title">
                                                    <h4>{item?.ticket_name}</h4>
                                                    <div className="num_of_tick">
                                                        <h4>Quantity : {item?.quantity}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info_item">
                                                <h3 className="dateofresult"><span></span>Total Price</h3>
                                                <p>{(item?.total_discount_price)}</p>
                                            </div>
                                            <div className="info_item">
                                                <h3 className="dateofresult"><span></span>Date Of Result </h3>
                                                <p>{new Date(item?.time_left).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: '2-digit',
                                                    year: 'numeric'
                                                })}</p>
                                            </div>
                                        </div>
                                    )
                                }).reverse()
                                : <h1>No order history present</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderHistory