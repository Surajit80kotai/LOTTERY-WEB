import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userOrderHistory } from '../../../services/slice/UserSlice'
import { currency_symbol, generalCurrency_symbol } from '../../../util/Currency'
import PreLoader from '../preloader/PreLoader'
import SideNav from './SideNav'

const OrderHistory = () => {
    const [filteredOH, setFilteredOH] = useState([])
    const baseUrl = process.env.REACT_APP_NODE_HOST
    const [pageNumber, setPageNumber] = useState(0)
    const { order_history_data, loading } = useSelector(state => state.userslice)
    const dispatch = useDispatch()


    // for pagination
    const userPerPage = 8
    const pagesVisited = pageNumber * userPerPage
    const data = [...order_history_data]
    const orderHistoryData = data?.reverse().slice(pagesVisited, pagesVisited + userPerPage)
    const pageCount = Math.ceil(order_history_data?.length / userPerPage)


    // filter order history function
    const filterOrderHistory = (data) => {
        const newData = [...order_history_data]
        switch (data) {
            case "LtoH":
                setFilteredOH(newData?.sort((a, b) => a.total_discount_price - b.total_discount_price))
                break;
            case "HtoL":
                setFilteredOH(newData?.sort((a, b) => b.total_discount_price - a.total_discount_price))
                break;
            case "NF":
                setFilteredOH(newData?.sort((a, b) => a.createdAt - b.createdAt))
                break;
            case "OF":
                setFilteredOH(newData?.sort((a, b) => b.createdAt - a.createdAt))
                break;

            default:
                setFilteredOH(orderHistoryData)
                break;
        }
    }


    // userID
    const userID = (JSON.parse(window.localStorage.getItem("user")))?.user_id

    const changePage = (data) => {
        setPageNumber(data?.selected)
    }


    useEffect(() => {
        setFilteredOH(orderHistoryData)
    }, [order_history_data])


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(userOrderHistory())
    }, [dispatch])



    return (
        <>
            <main>
                {/* PreLoader */}
                {loading && <PreLoader />}

                <div className="sidebar_wrapper">
                    {/* Left Side */}
                    <SideNav />

                    {/* Right Side */}
                    <div className="content_wrapper">
                        {/* order history  */}
                        <div className="container ">
                            {/* Filter Dropdown */}
                            <div className='d-flex justify-content-end mt-4'>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle d-flex" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="/assets/img/filter.png" alt="img" style={{ "width": "18px", "height": "18px", "margin": "3px 4px" }} /> <h2 className='fw-bold'>Filter<i className="fa-solid fa-caret-down mx-2"></i></h2>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ "width": "180px" }}>
                                        {/* Clear Filter Button */}
                                        <li className=' text-center m-3'><button className="btn btn-secondary  fs-5" onClick={() => filterOrderHistory("")} >CLEAR FILTER</button></li>

                                        {/* Price Filter Options */}
                                        <p className='fw-bold fs-4 px-3'>Price:</p>
                                        <li><Link className="dropdown-item" to="#!" onClick={() => filterOrderHistory("LtoH")} >Low To High</Link></li>
                                        <li><Link className="dropdown-item" to="#!" onClick={() => filterOrderHistory("HtoL")} >High To Low</Link></li>
                                        <hr />

                                        {/* Date Filter Options */}
                                        <p className='fw-bold fs-4 px-3'>Date:</p>
                                        <li><Link className="dropdown-item" to="#!" onClick={() => filterOrderHistory("NF")} >Newest First</Link></li>
                                        <li><Link className="dropdown-item" to="#!" onClick={() => filterOrderHistory("OF")} >Oldest First</Link></li>
                                    </ul>
                                </div>
                                {/* <button className='d-flex fw-bold'>
                <img src="/assets/img/filter.png" alt="img" style={{"width":"18px", "height":"18px", "margin":"3px 4px"}} /> <h2 className='fw-bold'>Filter</h2>
            </button> */}
                            </div>
                            <div className="order_histry_wrapper scroll">
                                {/* order his item  */}
                                {
                                    orderHistoryData?.length ?
                                        filteredOH?.map((item) => {
                                            return (
                                                <div className="orderhistroy_item" key={item?._id}>
                                                    <div className="ribbon-wrapper-green">
                                                        {
                                                            item?.is_win === 'true' ?
                                                                <div className="ribbon-green">Won</div>
                                                                : null
                                                        }
                                                    </div>

                                                    <div className="pro_im_t">
                                                        <div className="product_history_img">
                                                            <img src={baseUrl + item?.image_link} alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="info_pro_title">
                                                            <h4>{item?.ticket_name}</h4>
                                                            <div className="num_of_tick">
                                                                <h4>Quantity : {item?.quantity}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="info_item">
                                                        <h3 className="dateofresult"><span></span>Round: {item?.round}</h3>
                                                    </div>
                                                    <div className="info_item">
                                                        <h3 className="dateofresult"><span></span>Price</h3>
                                                        <p>{userID ? currency_symbol : generalCurrency_symbol}&nbsp;{(item?.total_discount_price)}
                                                        </p>
                                                    </div>
                                                    <div className="info_item">
                                                        <h3 className="dateofresult"><span></span>Date Of Purchase</h3>
                                                        <p>{new Date(item?.createdAt).toLocaleString('en-US', {
                                                            month: 'short',
                                                            day: '2-digit',
                                                            year: 'numeric'
                                                        })}</p>
                                                    </div>
                                                    <div className="info_item">
                                                        <h3 className="dateofresult"><span></span>Date Of Result </h3>
                                                        <p>{new Date(item?.result_on).toLocaleString('en-US', {
                                                            month: 'short',
                                                            day: '2-digit',
                                                            year: 'numeric'
                                                        })}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : <h1 className='text-center'>No order history present</h1>
                                }
                            </div>
                            {/* Pagination */}
                            <div className="pagination pagination-style-three">
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
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default OrderHistory