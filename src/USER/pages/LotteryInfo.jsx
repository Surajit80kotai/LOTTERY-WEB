import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import TrustedPayment from '../components/common/trustedPayment/TrustedPayment'
import { useTimer } from '../customHooks/useTimer'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, clearAddStatus, getCart } from '../services/slice/CartSlice'
import { buyNowItem } from '../services/slice/PaymentSlice'

const LotteryInfo = () => {
    const { lid } = useParams()
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()
    // const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const lottData = JSON.parse(window.localStorage.getItem("data"))
    const userID = (JSON.parse(window.localStorage.getItem("user")))?.user_id
    const ticketInfo = lottData?.filter((item) => item._id === lid)
    const discountedPrice = Number((ticketInfo[0]?.ticket_price - ((ticketInfo[0]?.ticket_price * ticketInfo[0]?.discount_percentage) / 100)))
    const { cart_data, add_cart_status } = useSelector((state) => state.cartslice)
    const cartLength = cart_data?.length
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"))

    // Accesing token
    const token = JSON.parse(window.localStorage.getItem("token"))

    const mainimage = ticketInfo[0]?.main_image
    const is_image = ticketInfo[0]?.is_image
    const list_image = ticketInfo[0]?.list_image        //list_image list
    const image = process.env.REACT_APP_NODE_HOST       //base url link
    const qty = 1                                       // default quantity of a ticket


    // IncQty function
    // const IncQty = () => {
    //     if (qty < 5) {
    //         setQty(qty + 1)
    //     }
    //     return qty
    // }
    // DecQty function
    // const DecQty = () => {
    //     if (qty > 1) {
    //         setQty(qty - 1)
    //     }
    //     return qty
    // }


    // Add ticket function
    const addToCart = () => {
        const cartData = { product_id: ticketInfo[0]._id, user_id: userID, qty: qty }
        dispatch(addCart(cartData))
    }

    // buyNow function
    const buyNow = (ticket) => {
        const subtotal = Number(ticket?.ticket_price * qty)
        const total = (ticket?.discount_percentage ?
            (ticket?.ticket_price - ((ticket?.ticket_price * ticket?.discount_percentage) / 100)) * qty
            : ticket?.ticket_price * qty)
        const discount = ((ticket?.ticket_price * ticket?.discount_percentage) / 100) * qty
        const amount = { subtotal: subtotal, total: total, discount: discount }

        const newTicket = {
            product_id: ticket._id,
            unit_price: (ticket.ticket_price).toFixed(2),
            quantity: qty,
            discount: (ticket.discount_percentage).toFixed(2),
            total_price: (subtotal).toFixed(2),
            total_discount_price: (total).toFixed(2)
        }

        const orderData = { product_info: newTicket, amount: amount, ticket: ticket }
        dispatch(buyNowItem(orderData))
    }



    useEffect(() => {
        window.scrollTo(0, 0)
        return () => {
            dispatch(getCart())
            dispatch(clearAddStatus())
        }
    }, [dispatch, cartLength, add_cart_status])



    useEffect(() => {
        startTimer(ticketInfo[0]?.time_left)
    })


    return (
        <>
            <main>
                {/* Product Info */}
                <div className="product_info_wraper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="product_slider_images">

                                    {/* carausal images */}
                                    <div className="mainproduct_image img-fluid">
                                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                            {/* Dynamic Image slider */}
                                            <div className="carousel-inner">
                                                {list_image?.length ?
                                                    list_image?.map((item, index) => {
                                                        let act = ""
                                                        if (index === 0) {
                                                            act = "active";
                                                        }
                                                        return (
                                                            <div className={`carousel-item ${act}`} key={index} >
                                                                <img src={image + item} className="d-block w-100" alt="" />
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    (is_image?.length) ?
                                                        <div className="carousel-item active">
                                                            <img src={mainimage} className="d-block w-100" alt="" />
                                                        </div>
                                                        : <div className="carousel-item active">
                                                            <img src="/assets/img/imageunavailable.jpeg" className="d-block w-100" alt="" />
                                                        </div>
                                                }

                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="product_information_area">
                                    <div className="main_product_title">
                                        <h1>{ticketInfo[0]?.ticket_name}</h1>
                                    </div>
                                    <div className="tic_of_price">
                                        {
                                            ticketInfo[0]?.discount_percentage ?
                                                <h3>Ticket Price :&nbsp;&nbsp;
                                                    <span className="discountprice">{ticketInfo[0]?.currency}{discountedPrice}</span>&nbsp;&nbsp;
                                                    <span className="text-decoration-line-through fs-4 fw-light">
                                                        {ticketInfo[0]?.currency}{ticketInfo[0]?.ticket_price}
                                                    </span>&nbsp;&nbsp;
                                                    <span className="discount_percent fs-4 ">{ticketInfo[0]?.discount_percentage}% off</span>
                                                </h3>
                                                :
                                                <h3>Ticket Price :&nbsp;&nbsp;
                                                    <span className="discountprice">{ticketInfo[0]?.currency}{ticketInfo[0]?.ticket_price}</span>
                                                </h3>
                                        }
                                    </div>
                                    {/* Promo area */}
                                    {
                                        ticketInfo[0]?.is_promo ?
                                            <div className="promo_area">
                                                <h3>Add a Promo</h3>
                                                <div className="promo_form">
                                                    <form action="">
                                                        <div className="promo_input_wrapper">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Your Promo Code" />
                                                            <button className="promobtn">Apply</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {/* Quantity area */}
                                    {/* <div className="quantity">
                                        <h3>Quantity</h3>
                                        <p className='fs-5' style={{ "color": "#f9772b" }}>You Can Buy Minimum 5 Tickets*</p>
                                        <div className="col-md-4">
                                            <div className="qty-container">
                                                <button className="qty-btn-minus btn-light" type="button" onClick={DecQty}><i className="fa fa-minus"></i></button>
                                                <div className="quantity_place">
                                                    <h1 className='quantity_title'>{qty}</h1>
                                                </div>
                                                <button className="qty-btn-plus btn-light" type="button" onClick={IncQty}><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* {
                                        ticketInfo[0]?.discount_percentage ?
                                            <h3>Total Price :&nbsp;&nbsp;
                                                <span className="discountprice">{ticketInfo[0]?.currency}{(discountedPrice * qty).toFixed(2)}</span>&nbsp;&nbsp;
                                            </h3>
                                            :
                                            <h3>Ticket Price :&nbsp;&nbsp;
                                                <span className="discountprice">{ticketInfo[0]?.currency}{(ticketInfo[0]?.ticket_price) * qty}</span>
                                            </h3>
                                    } */}

                                    {/* Add to cart buttton */}
                                    <div className="btn_area mt-5">
                                        {
                                            ticketInfo[0].ticket_quantity > 0 ?
                                                token || accessToken ?
                                                    <Link to="#!" onClick={addToCart} className="btn2">Add To Cart</Link>
                                                    : <Link to="/login" className="btn2">Add To Cart</Link>
                                                : <button to="#!" className="btn2_disabled" disabled>Add To Cart</button>
                                        }

                                        {
                                            ticketInfo[0].ticket_quantity > 0 ?
                                                token || accessToken ?
                                                    <Link to="/placeorder" onClick={() => buyNow(ticketInfo[0])} className="btn2">Buy Ticket</Link>
                                                    : <Link to="/login" className="btn2">Buy Ticket</Link>
                                                : <button to="#!" className="btn2_disabled" disabled>Buy Ticket</button>
                                        }
                                    </div>

                                    {/* Timer */}
                                    {
                                        (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                            <div className="product_time">
                                                <div id="coundown" className="countdown product_timeleftwrap">
                                                    <div className="product_timeleft">
                                                        <div id="days" className="time_left_style days">{timerDays}
                                                        </div>
                                                        <br /><span>Days</span>
                                                    </div>
                                                    <div className="product_timeleft">
                                                        <div id="hours" className="time_left_style hours">{timerHours}
                                                        </div>
                                                        <br /><span>Hours</span>
                                                    </div>
                                                    <div className="product_timeleft">
                                                        <div id="minutes" className="time_left_style minutes">{timerMinutes}
                                                        </div>
                                                        <br /><span>Mins</span>
                                                    </div>
                                                    <div className="product_timeleft">
                                                        <div id="seconds" className="time_left_style seconds">{timerSeconds}
                                                        </div>
                                                        <br /><span>Sec</span>
                                                    </div>
                                                </div>
                                            </div>
                                            : <h4 className='text-dark my-5'>Ticket is unavailabe right now</h4>
                                    }

                                    {/* Ticket quantity Slider */}
                                    <div className="ticket_sold">
                                        <div className="ticket_sold_title">
                                            {
                                                (ticketInfo[0]?.ticket_quantity) > 0 ?
                                                    <h3>
                                                        <span><img src="/assets/img/9121436 1.png" alt="" /></span>
                                                        Ticket Remains : <strong>{ticketInfo[0]?.ticket_quantity}</strong>
                                                    </h3> : <h3>All tickets sold</h3>
                                            }

                                        </div>

                                        {/* Pogressbar area */}
                                        {/* <div className="progressarea">
                                        <div data-progress={ticketInfo[0]?.ticket_quantity}></div>
                                    </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="description_wrapper">
                                {/* Description Section */}
                                <div>
                                    <div className="des_title">
                                        <h3>DESCRIPTION</h3>
                                    </div>
                                    <div className="description_item">
                                        <div className="describe_heading">
                                            <h4>{ticketInfo[0]?.ticket_name}</h4>
                                        </div>
                                        {
                                            (ticketInfo[0]?.description) ?
                                                <p className="description_para">
                                                    {ticketInfo[0]?.description}
                                                </p>
                                                : null
                                        }

                                    </div>
                                    <hr />
                                </div>

                                {/* Key feature body section */}
                                {
                                    (ticketInfo[0]?.highlights?.length) ?
                                        <div className="description_item">
                                            <div className="describe_heading">
                                                <h4>Highlights:</h4>
                                            </div>

                                            <div className="bullet_points">
                                                {
                                                    ticketInfo[0]?.highlights?.map((item, index) => {
                                                        return (
                                                            <li key={index}><span><i className="fas fa-circle"></i></span>{item}</li>
                                                        )
                                                    })
                                                }
                                                <hr />
                                            </div>
                                        </div>
                                        : null
                                }


                                {/* Specifications area */}
                                {
                                    (ticketInfo[0]?.specification) ?
                                        ticketInfo[0]?.specification?.map((item, index) => {
                                            return (
                                                <div className="description_item" key={index}>
                                                    <div className="describe_heading">
                                                        <h4>{item?.key}</h4>
                                                    </div>
                                                    <p className="description_para">{item?.value}</p>
                                                    {
                                                        (item?.key && item?.value) ? <hr /> : null
                                                    }

                                                </div>
                                            )
                                        })
                                        : null

                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trusted Pay */}
                <TrustedPayment />
            </main>
        </>
    )
}

export default LotteryInfo
