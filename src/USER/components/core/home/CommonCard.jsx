import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTimer } from '../../../customHooks/useTimer'
import { addCart, clearAddStatus, getCart } from '../../../services/slice/CartSlice'
import { buyNowItem } from '../../../services/slice/PaymentSlice'
import PreLoader from '../preloader/PreLoader'

const CommonCard = ({ item, index, category }) => {
    const { time_left, ticket_name, ticket_price, ticket_quantity, discount_percentage, main_image, is_image, _id } = item
    // discount calculation
    const discountedPrice = Number((ticket_price - ((ticket_price * discount_percentage) / 100)))
    // defining states timer
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()
    const dispatch = useDispatch()

    // states from cartslice
    const { cart_data, add_cart_status, loading } = useSelector((state) => state.cartslice)
    const cartLength = cart_data?.length

    // userID
    const userID = (JSON.parse(window.localStorage.getItem("user")))?.user_id
    // Accesing token
    const token = JSON.parse(window.localStorage.getItem("token"))
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"))

    // currency variables
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
    const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL

    // baseUrl For Images
    const baseUrl = process.env.REACT_APP_NODE_HOST




    // add to cart
    const addToCart = () => {
        const cartData = { product_id: _id, user_id: userID, qty: 1 }
        dispatch(addCart(cartData))
    }

    // buyNow function
    const buyNow = (ticket) => {
        // dispatch(emptyCart())
        const subtotal = Number(ticket?.ticket_price)
        const total = (ticket?.discount_percentage ?
            (ticket?.ticket_price - ((ticket?.ticket_price * ticket?.discount_percentage) / 100))
            : ticket?.ticket_price)
        const discount = ((ticket?.ticket_price * ticket?.discount_percentage) / 100)
        const amount = { subtotal: subtotal, total: total, discount: discount }

        const newTicket = {
            product_id: ticket._id,
            unit_price: (ticket.ticket_price).toFixed(2),
            quantity: 1,
            discount: (ticket.discount_percentage).toFixed(2),
            total_price: (subtotal).toFixed(2),
            total_discount_price: (total).toFixed(2)
        }

        const orderData = { product_info: newTicket, amount: amount, ticket: ticket }
        dispatch(buyNowItem(orderData))
    }


    useEffect(() => {
        startTimer(Number(time_left))
    })

    useEffect(() => {
        // window.scrollTo(0, 0)
        return () => {
            dispatch(getCart())
            dispatch(clearAddStatus())
        }
    }, [dispatch, cartLength, add_cart_status])



    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}
            
            {/* <div className="first_row_title">
                <h2>House & Apartments</h2>
            </div> */}
            {
                !index || index < 7 ?
                    <div className="col-md-3 product_item">
                        <div className="product_item_one">
                            <Link to={`/info/${_id}`}>
                                <div className="product_img">
                                    <div className="pro_img">
                                        {/* Image Condition */}
                                        {
                                            (is_image?.length) ? <img src={baseUrl + main_image} alt="" className="img-fluid " />
                                                : <img src="/assets/img/imageunavailable.jpeg" alt="" className="img-fluid " />
                                        }
                                    </div>
                                </div>
                            </Link>
                            <div className="product_content">
                                <Link to={`/info/${_id}`}>
                                    <div className="product_price">
                                        {
                                            discount_percentage ?
                                                <h3>
                                                    <span className="discountprice">{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}&nbsp;{discountedPrice}</span>&nbsp;&nbsp;<span>{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}</span>
                                                    <span className="text-decoration-line-through">&nbsp;{ticket_price}</span>&nbsp;&nbsp;
                                                    <span className="discount_percent">{discount_percentage}% off</span>
                                                </h3>
                                                :
                                                <h3>
                                                    <span className="discountprice">{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}&nbsp;{ticket_price}</span>
                                                </h3>
                                        }
                                    </div>
                                    <div className="product_title">
                                        <h2 className="card_title">{ticket_name}</h2>
                                    </div>
                                    {
                                        (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                            ticket_quantity > 0 ?
                                                <h3 className="total_ticket">Ticket Quantity : {ticket_quantity}</h3>
                                                : <h3 className="total_ticket">All tickets sold</h3>
                                            : null
                                    }

                                    {/* Condition for timer run-out */}
                                    {
                                        (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                            <div className="time_left">
                                                <div id="coundown" className="countdown text-center">
                                                    <div className="timeleftarea">
                                                        <div id="days" className=" days">{timerDays}
                                                        </div>
                                                        <br /><span>Days</span>
                                                    </div>
                                                    <div className="timeleftarea">
                                                        <div id="hours" className=" hours">{timerHours}
                                                        </div>
                                                        <br /><span>Hours</span>
                                                    </div>
                                                    <div className="timeleftarea">
                                                        <div id="minutes" className=" minutes">{timerMinutes}
                                                        </div>
                                                        <br /><span>Mins</span>
                                                    </div>
                                                    <div className="timeleftarea">
                                                        <div id="seconds" className=" seconds">{timerSeconds}
                                                        </div>
                                                        <br /><span>Sec</span>
                                                    </div>
                                                </div>
                                            </div>
                                            : <h3 className='text-danger mt-3'>Ticket is unavailabe right now</h3>
                                    }
                                </Link>
                                <div className="product_btn">
                                    {/* Add Cart Button */}
                                    {
                                        (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                            ticket_quantity > 0 ?
                                                token || accessToken ?
                                                    <Link to="#!" onClick={addToCart} className="btn2">Add To Cart</Link>
                                                    : <Link to="/login" className="btn2">Add To Cart</Link>
                                                : <button to="#!" className="btn2_disabled" disabled>Add To Cart</button>
                                            : <button to="#!" className="btn2_disabled" disabled>Add To Cart</button>

                                    }
                                    {/* Buy Now Button */}
                                    {
                                        (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                            (ticket_quantity) > 0 ?
                                                token || accessToken ?
                                                    <Link to="/placeorder" onClick={() => buyNow(item)} className="btn2">Buy Ticket</Link>
                                                    : <Link to="/login" className="btn2">Buy Ticket</Link>
                                                : <button to="#!" className="btn2_disabled" disabled>Buy Ticket</button>
                                            : <button to="#!" className="btn2_disabled" disabled>Buy Ticket</button>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="col-md-3 product_item">
                        <div className="product_item_one">
                            <div className="view_all_bg">
                                <img src="/assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                <div className="viewall_btn">
                                    <h6>Looking More? Click Here</h6>
                                    <Link className="btn2" to={`/viewall/${category}`}>View All</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default CommonCard