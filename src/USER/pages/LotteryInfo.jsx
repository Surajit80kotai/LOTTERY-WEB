import React, { useEffect } from 'react'
import { Link, useNavigate, useNavigation, useParams } from 'react-router-dom'
import TrustedPayment from '../components/common/trustedPayment/TrustedPayment'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, clearAddStatus, getCart } from '../services/slice/CartSlice'
import { buyNowItem } from '../services/slice/PaymentSlice'
import PreLoader from '../components/core/preloader/PreLoader'
import { currency_symbol, generalCurrency_symbol } from '../util/Currency'
import { toast } from 'react-toastify'
import LotteryInfoTimer from '../util/LotteryInfoTimer'

const LotteryInfo = () => {
    const { lid, round } = useParams()
    const lottData = JSON.parse(window.localStorage.getItem("data"))
    const ticketInfo = lottData?.filter((item) => item._id === lid)
    // const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const userID = (JSON.parse(window.localStorage.getItem("user")))?.user_id
    // discount calculation
    const discountedPrice = Number((ticketInfo[0]?.rounds[round]?._price - ((ticketInfo[0]?.rounds[round]?._price * ticketInfo[0]?.rounds[round]?._dis) / 100)))
    const { cart_data, add_cart_status } = useSelector((state) => state.cartslice)
    const cartLength = cart_data?.length
    const { loading } = useSelector((state) => state.cartslice)
    const navigate = useNavigate()
    // Accesing token
    const token = JSON.parse(window.localStorage.getItem("token"))

    const mainimage = ticketInfo[0]?.main_image
    const is_image = ticketInfo[0]?.is_image
    const list_image = ticketInfo[0]?.list_image        //list_image list
    const baseUrl = process.env.REACT_APP_NODE_HOST           //base url link
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
        const cartData = { product_id: ticketInfo[0]._id, user_id: userID, qty: qty, round_info: ticketInfo[0]?.rounds[round], round_index: round }
        dispatch(addCart({ cartData, toast, navigate }))
    }

    // buyNow function
    const buyNow = (ticket) => {
        // dispatch(emptyCart())
        const subtotal = Number(ticket?.rounds[round]?._price)
        const total = (Number(ticket?.rounds[round]?._dis) ?
            (Number(ticket?.rounds[round]?._price) - ((Number(ticket?.rounds[round]?._price) * Number(ticket?.rounds[round]?._dis)) / 100))
            : Number(ticket?.rounds[round]?._price))
        const discount = ((Number(ticket?.rounds[round]?._price) * Number(ticket?.rounds[round]?._dis)) / 100)
        const amount = { subtotal: subtotal, total: total, discount: discount }

        const newTicket = {
            product_id: ticket._id,
            unit_price: (Number(ticket?.rounds[round]?._price)).toFixed(2),
            quantity: 1,
            discount: (Number(ticket?.rounds[round]?._dis)).toFixed(2),
            total_price: (subtotal).toFixed(2),
            total_discount_price: (total).toFixed(2),
            round_info: ticket?.rounds[round],
            round_index: round
        }

        const orderData = { product_info: newTicket, amount: amount, ticket: ticket }
        dispatch(buyNowItem(orderData))
    }


    // Download Brochure
    const handleDownload = (download_link, ticket_name) => {
        const fileUrl = download_link; // Replace with your file URL
        const fileExtension = download_link.substring(download_link.lastIndexOf(".") + 1)
        const fileName = ((ticket_name).trim().split(/\s+/).join('_').toLowerCase() + "." + fileExtension)

        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary URL to the blob
                const blobUrl = window.URL.createObjectURL(new Blob([blob]));
                // Create a new anchor element
                const a = document.createElement('a');
                // Set the download attribute to the file name
                a.setAttribute('download', fileName);
                // Set the href attribute to the temporary URL
                a.setAttribute('href', blobUrl);
                // Click the anchor element to start the download
                a.click();
                // Remove the temporary URL and anchor element
                window.URL.revokeObjectURL(blobUrl);
                a.remove();
            });
    };


    useEffect(() => {
        window.scrollTo(0, 0)
        return () => {
            dispatch(getCart())
            dispatch(clearAddStatus())
        }
    }, [dispatch, cartLength, add_cart_status, round])



    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main>
                {/* Product Info */}
                <div className="product_info_wraper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="product_slider_images">

                                    {/* carausal images */}
                                    <div className="mainproduct_image img-fluid">
                                        <div id="carouselExampleControls" className="carousel slide custom-carousel-slide" data-bs-ride="carousel">
                                            {/* Dynamic Image slider */}
                                            <div className="carousel-inner">
                                                {list_image?.length ?
                                                    list_image?.map((item, index) => {
                                                        let act = ""
                                                        if (index === 0) {
                                                            act = "active";
                                                        }
                                                        return (
                                                            <div className={`custom-carousel-item carousel-item ${act}`} key={index} data-bs-interval="5000" cycle="true">
                                                                <img src={baseUrl + item} className="d-block w-100" alt="" loading="lazy" />
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    (is_image?.length) ?
                                                        <div className="custom-carousel-item carousel-item active">
                                                            <img src={baseUrl + mainimage} className="d-block w-100" alt="" loading="lazy" />
                                                        </div>
                                                        : <div className="custom-carousel-item carousel-item active">
                                                            <img src="/assets/img/imageunavailable.jpeg" className="d-block w-100" alt="" loading="lazy" />
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
                                            ticketInfo[0]?.rounds[round]?._dis ?
                                                <h3>Ticket Price :&nbsp;&nbsp;
                                                    <span className="discountprice">
                                                        {token ? currency_symbol : generalCurrency_symbol}{(discountedPrice).toFixed(2)}</span>&nbsp;&nbsp;
                                                    <span className="text-decoration-line-through fs-4 fw-light">
                                                        {token ? currency_symbol : generalCurrency_symbol}
                                                        {ticketInfo[0]?.rounds[round]?._price}
                                                    </span>&nbsp;&nbsp;
                                                    <span className="discount_percent fs-4 ">{ticketInfo[0]?.rounds[round]?._dis}% off</span>
                                                </h3>
                                                :
                                                <h3>Ticket Price :&nbsp;&nbsp;
                                                    <span className="discountprice">
                                                        {token ? currency_symbol : generalCurrency_symbol}
                                                        {ticketInfo[0]?.rounds[round]?._price}
                                                    </span>
                                                </h3>
                                        }
                                    </div>
                                    {/* Promo area */}
                                    {/* {
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
                                    } */}

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
                                                <span className="discountprice">{userCurrency_symbol? userCurrency_symbol : generalCurrency_symbol}{(discountedPrice * qty).toFixed(2)}</span>&nbsp;&nbsp;
                                            </h3>
                                            :
                                            <h3>Ticket Price :&nbsp;&nbsp;
                                                <span className="discountprice">{userCurrency_symbol? userCurrency_symbol : generalCurrency_symbol}{(ticketInfo[0]?.ticket_price) * qty}</span>
                                            </h3>
                                    } */}

                                    {/* Add to cart buttton */}
                                    <div className="btn_area mt-5">
                                        {
                                            (ticketInfo[0]?.rounds[round]?._qty) > 0 ?
                                                token ?
                                                    <Link to="#!" onClick={addToCart} className="btn2">Add To Cart</Link>
                                                    : <Link to="/login" className="btn2">Add To Cart</Link>
                                                : <button to="#!" className="btn2_disabled" disabled>Add To Cart</button>
                                        }

                                        {/* Buy now button */}
                                        {
                                            (ticketInfo[0]?.rounds[round]?._qty) > 0 ?
                                                token ?
                                                    <Link to="/placeorder" onClick={() => buyNow(ticketInfo[0])} className="btn2">Buy Ticket</Link>
                                                    : <Link to="/login" className="btn2">Buy Ticket</Link>
                                                : <button to="#!" className="btn2_disabled" disabled>Buy Ticket</button>
                                        }
                                    </div>

                                    {/* Timer */}
                                    <LotteryInfoTimer
                                        ticketInfo={ticketInfo}
                                        round={round}
                                    />

                                    {/* Ticket quantity Slider */}
                                    <div className="ticket_sold">
                                        <div className="ticket_sold_title">
                                            {
                                                (ticketInfo[0]?.rounds[round]?._qty) > 0 ?
                                                    <h3>
                                                        <span style={{ "marginRight": "20px" }}>
                                                            <img className='mx-2' src="/assets/img/9121436 1.png" alt="" />Round : <strong>{((+round) + 1) + "/" + ticketInfo[0]?.rounds.length}</strong></span>
                                                        <span><img src="/assets/img/9121436 1.png" alt="" /></span>
                                                        Ticket Remains : <strong>{ticketInfo[0]?.rounds[round]?._qty}</strong>
                                                    </h3>
                                                    : <h3 style={{ "color": "#cb4154" }}>
                                                        All Tickets Sold For Round : {(Number(round) + 1)}
                                                    </h3>
                                            }

                                        </div>

                                        {/* Pogressbar area */}
                                        {/* <div className="progressarea">
                                        <div data-progress={ticketInfo[0]?.ticket_quantity}></div>
                                    </div> */}

                                        {/* Description Section */}
                                        <div>
                                            <div className="des_title">
                                                <h3>DESCRIPTION</h3>
                                                {
                                                    ticketInfo[0]?.brochure ?
                                                        <button
                                                            onClick={() => handleDownload(baseUrl + ticketInfo[0]?.brochure, ticketInfo[0]?.ticket_name)}
                                                            className='btn btn-outline-dark fs-5'
                                                            style={{ "borderRadius": "20px" }}
                                                        >Download Brochure <i className="fa-solid fa-download"></i></button>
                                                        : null
                                                }
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
                                            {/* <hr /> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="description_wrapper">
                                {/* Description Section */}
                                {/* <div>
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
                                </div> */}

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
                                            </div>
                                            <hr />
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
