import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { userOrderHistory } from '../../../services/slice/UserSlice'
import PreLoader from '../preloader/PreLoader'

const OrderHistory = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const { order_history_data, loading } = useSelector(state => state.userslice)
    const dispatch = useDispatch()

    // for pagination
    const userPerPage = 8
    const pagesVisited = pageNumber * userPerPage
    const orderHistoryData = order_history_data?.slice(pagesVisited, pagesVisited + userPerPage)
    const pageCount = Math.ceil(order_history_data?.length / userPerPage)

    // currency variables
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
    const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL


    const changePage = (data) => {
        setPageNumber(data?.selected)
    }

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
                            orderHistoryData?.length ?
                                orderHistoryData?.map((item) => {
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
                                                <p>{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}&nbsp;{(item?.total_discount_price)}</p>
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
                    {/* Pagination */}
                    {/* <div className="pagination pagination-style-three"> */}
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel="&#11164;"
                        nextLabel="&#11166;"
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination pagination-style-three"}
                        // pageClassName={"page-item"}
                        // pageLinkClassName={"page-link"}
                        // previousClassName={"page-item"}
                        // previousLinkClassName={"page-link"}
                        // nextClassName={"page-item"}
                        // nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                        renderOnZeroPageCount={null}
                    />
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default OrderHistory