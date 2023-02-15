import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBalance } from '../services/slice/UserSlice';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { itemBuyNow, placeOrder } from '../services/slice/PaymentSlice';
import PreLoader from '../components/core/preloader/PreLoader';
// import { emptyCart } from '../services/slice/CartSlice';


const PlaceOrder = () => {
    // State for price calculation
    const [amount, setAmount] = useState({ subtotal: 0, discount: 0, total: 0 })

    // States from slices
    const { cart_data } = useSelector((state) => state.cartslice)
    const { balance } = useSelector((state) => state.userslice)
    const { ordered_data, buy_now_data, loading } = useSelector((state) => state.paymentslice)
    const dispatch = useDispatch()

    const image = process.env.REACT_APP_NODE_HOST
    const dueAmount = Number(amount?.total - balance?.balance)

    // console.log(buy_now_data);

    // On orderPlace function
    const procced = () => {
        if (cart_data?.length) {
            const cartData = cart_data?.reduce((acc, { resp, info }) => {
                acc.push({
                    id: resp._id,
                    user_id: resp.user_id,
                    product_id: resp.product_id,
                    quantity: resp.quantity,
                    ticket_price: info[0].ticket_price,
                    discount_percentage: info[0].discount_percentage
                })
                return acc
            }, [])
            const orderData = { price: amount, product_info: cartData }
            // console.log(orderData);
            dispatch(placeOrder(orderData))
        } else if (buy_now_data) {
            const buyNowData = buy_now_data?.product_info
            // console.log(buyNowData);
            dispatch(itemBuyNow(buyNowData))
        }
    }


    // checkOrderData function
    const checkOrderData = () => {
        if (buy_now_data.error === "true" || ordered_data.error === "true") {
            const cartIds = ordered_data?.meta?.map((item) => item.cart_id)
            cartIds?.map((item) => {
                var element = document.getElementById(item);
                return element.style.backgroundColor = "#ff616170";
            })
            toast.error("Quantity Is Unavilabe !!")
        }
        else if (buy_now_data.message === "Order success" || ordered_data.message === "Order success") {
            toast.success("Order success")
        }
    }


    useEffect(() => {
        checkOrderData()
    }, [buy_now_data, ordered_data, balance])


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getBalance())
        calculateSum()
    }, [cart_data, dispatch])



    // Calculate Sum function
    const calculateSum = () => {
        let st = 0
        let dc = 0

        cart_data?.map(({ resp, info }) => {
            if (info[0].discount_percentage) {
                st += (Number((info[0].ticket_price * resp.quantity)))
                dc += (Number(((info[0].ticket_price) * (info[0].discount_percentage) / 100) * resp.quantity))
                return Number(st)
            } else {
                st += Number(info[0].ticket_price * resp.quantity)
                return st
            }
        })
        return setAmount({
            ...amount,
            subtotal: st,
            discount: dc,
            total: st - dc
        })
    }


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main>
                <div className="cart_list_wrapper pb-5">
                    <div className="container pt-5">
                        <div className="bred">
                            <div className="product_title_top">
                                <h3>You Order Payment</h3>
                            </div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                                </ol>
                            </nav>

                        </div>
                    </div>

                    <div className="container">
                        <div className="row">

                            {/* Left Side Of PlaceOrder */}
                            <div className="col-md-8">
                                <div className="payment_form_area">

                                    {/* <!-- payment information --> */}
                                    <div className="delivery_address">
                                        <h2 className="mb-2">Payment</h2>
                                        <hr />
                                    </div>
                                    <div className="payment_form">

                                        {/* Wallet */}
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="upi_one">
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label" htmlFor="inlineRadio1">
                                                            Wallet Balance
                                                            {
                                                                (balance?.balance) > 0 ?
                                                                    <span className="upi_icon fw-bolder">{(balance?.balance)?.toFixed(2)}</span> :
                                                                    <span className="upi_icon fw-bolder">0</span>
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* Wallet Validation */}
                                                {
                                                    ((amount.total).toFixed(2) > balance?.balance) ?
                                                        <div className="alert alert-danger mt-2  fs-4" role="alert">
                                                            <span><i className="fas fa-balance-scale-right"></i></span> Insaficinent Wallet Balance
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        {
                                            ((amount.total).toFixed(2) < balance?.balance) ?
                                                <button onClick={procced} className="btn2">Procced</button>
                                                : <Link to={`/profile/${dueAmount}`} className="btn2">Recharge Wallet</Link>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Of PlaceOrder */}
                            {
                                cart_data.length ?
                                    <div className="col-md-4 ">
                                        <div className="purches_sum fixed_right">
                                            <div className="price_area_wrapper ">
                                                <h3 className="price_title">Purchase Summary</h3>
                                                <div className="price_inner">
                                                    <div className="price_item borderbottom">
                                                        <h4 className="price_text">Price <span> ({cart_data?.length} Item):</span></h4>
                                                        <h6 className="price_value">
                                                            {cart_data ? <span>{cart_data[0]?.info[0]?.currency}</span> : 0}
                                                            {(amount.subtotal).toFixed(2)}
                                                        </h6>
                                                    </div>
                                                    <div className="price_item mb-5">
                                                        <h4 className="price_text">Total Discount :</h4>
                                                        <h6 className="price_value text-success">
                                                            {cart_data ? <span>{cart_data[0]?.info[0]?.currency}-</span> : 0}
                                                            {(amount.discount).toFixed(2)}
                                                        </h6>
                                                    </div>
                                                    <div className="price_item mt-5">
                                                        <h4 className="price_text">Total Payables:</h4>
                                                        <h6 className="price_value">
                                                            {cart_data ? <span>{cart_data[0]?.info[0]?.currency}</span> : 0}

                                                            {(amount.total).toFixed(2)}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="col-md-4 ">
                                        <div className="purches_sum fixed_right">
                                            <div className="price_area_wrapper ">
                                                <h3 className="price_title">Purchase Summary</h3>
                                                <div className="price_inner">
                                                    <div className="price_item borderbottom">
                                                        <h4 className="price_text">Price <span> ({buy_now_data?.length} Item):</span></h4>
                                                        <h6 className="price_value">
                                                            {buy_now_data ? <span>{buy_now_data?.product_info?.currency}</span> : 0}
                                                            {buy_now_data?.amount ? (buy_now_data?.amount?.subtotal).toFixed(2) : 0}
                                                        </h6>
                                                    </div>
                                                    <div className="price_item mb-5">
                                                        <h4 className="price_text">Total Discount :</h4>
                                                        <h6 className="price_value text-success">
                                                            {cart_data ? <span>{cart_data[0]?.info[0]?.currency}-</span> : 0}
                                                            {buy_now_data?.amount ? (buy_now_data?.amount?.discount).toFixed(2) : 0}
                                                        </h6>
                                                    </div>
                                                    <div className="price_item mt-5">
                                                        <h4 className="price_text">Total Payables:</h4>
                                                        <h6 className="price_value">
                                                            {cart_data ? <span>{cart_data[0]?.info[0]?.currency}</span> : 0}

                                                            {buy_now_data?.amount ? (buy_now_data?.amount?.total).toFixed(2) : 0}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }


                            {/* Item List */}
                            {
                                cart_data.length ?
                                    <div className="order_history_summary col-md-8">
                                        {
                                            cart_data?.length ?
                                                cart_data?.map((item) => {
                                                    // cart_data?.map((item) => {
                                                    return (
                                                        <div className="cart_list_item" key={item.resp._id} id={item.resp._id}>
                                                            <Link to={`/info/${item?.info[0]?._id}`}>
                                                                <div className="cart_item_img">
                                                                    <img src={image + item?.info[0]?.main_image} alt="" className="img-fluid" />
                                                                </div>
                                                            </Link>
                                                            <div className="cart_item_content">
                                                                <div className="cart_title">
                                                                    <h3>{item?.info[0]?.ticket_name}</h3>
                                                                </div>
                                                                <div className="other_info">
                                                                    <p className="amount fw-bold text-dark">Item Quantity : {item?.resp?.quantity}</p>
                                                                    {/* Calculation of discounted price */}
                                                                    <p className="tic_price fw-bold text-dark">Price Of Ticket :
                                                                        {
                                                                            (Number(item?.info[0]?.ticket_price - ((item?.info[0]?.ticket_price * item?.info[0]?.discount_percentage) / 100)) * item?.resp?.quantity).toFixed(2)
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="date_result">
                                                                    {/* Calculating the data */}
                                                                    <h5><span><img src="/assets/img/3135783 1.png" alt="" /></span>Result on <span className="fw-bold">
                                                                        {new Date(item?.info[0]?.time_left).toLocaleString('en-US', {
                                                                            month: 'short',
                                                                            day: '2-digit',
                                                                            year: 'numeric'
                                                                        })}
                                                                    </span></h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <div className='text-center' >
                                                    <img src="/assets/img/emptycart.png" alt="" />
                                                    <h2>Your Cart Is Empty</h2>
                                                </div>

                                        }
                                    </div>
                                    :
                                    <div className="order_history_summary col-md-8">

                                        <div className="cart_list_item">
                                            <Link to={`/info/${buy_now_data?.ticket?._id}`}>
                                                <div className="cart_item_img">
                                                    <img src={image + buy_now_data?.ticket?.is_image} alt="" className="img-fluid" />
                                                </div>
                                            </Link>
                                            <div className="cart_item_content">
                                                <div className="cart_title">
                                                    <h3>{buy_now_data?.ticket?.ticket_name}</h3>
                                                </div>
                                                <div className="other_info">
                                                    <p className="amount fw-bold text-dark">Item Quantity : {buy_now_data?.product_info?.quantity}</p>
                                                    {/* Calculation of discounted price */}
                                                    <p className="tic_price fw-bold text-dark">Price Of Ticket :
                                                        {buy_now_data?.product_info?.total_discount_price}
                                                    </p>
                                                </div>
                                                <div className="date_result">
                                                    {/* Calculating the data */}
                                                    <h5><span><img src="/assets/img/3135783 1.png" alt="" /></span>Result on <span className="fw-bold">
                                                        {new Date(buy_now_data?.ticket?.time_left).toLocaleString('en-US', {
                                                            month: 'short',
                                                            day: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default PlaceOrder