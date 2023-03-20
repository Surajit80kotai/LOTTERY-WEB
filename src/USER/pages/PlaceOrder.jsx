import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getBalance } from '../services/slice/UserSlice';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { clearOrderedData, emptyBuyNow, itemBuyNow, placeOrder } from '../services/slice/PaymentSlice';
import PreLoader from '../components/core/preloader/PreLoader';
import { emptyCart } from '../services/slice/CartSlice';
import { currency_symbol, generalCurrency_symbol } from '../util/Currency';


const PlaceOrder = () => {
    // State for price calculation
    const [amount, setAmount] = useState({ subtotal: 0, discount: 0, total: 0 })
    const navigate = useNavigate()

    // States from slices
    const { cart_data } = useSelector((state) => state.cartslice)
    const { balance } = useSelector((state) => state.userslice)
    const { ordered_data, buy_now_data, loading } = useSelector((state) => state.paymentslice)
    const dispatch = useDispatch()


    const baseUrl = process.env.REACT_APP_NODE_HOST
    const dueAmount = Number(amount?.total - balance?.balance)

    const buyNowDataObj = Object.keys(buy_now_data)

    // Accesing token
    const token = JSON.parse(window.localStorage.getItem("token"))

    // On orderPlace function
    const procced = () => {
        if (buyNowDataObj?.length) {
            const buyNowData = buy_now_data?.product_info
            dispatch(itemBuyNow(buyNowData))
        } else if (cart_data?.length) {
            const cartData = cart_data?.reduce((acc, { resp }) => {
                acc.push({
                    id: resp._id,
                    user_id: resp.user_id,
                    product_id: resp.product_id,
                    quantity: resp.quantity,
                    ticket_price: resp?.round_info?._price,
                    discount_percentage: resp?.round_info?._dis,
                    round_index: resp.round_index
                })
                return acc
            }, [])
            const orderData = { price: amount, product_info: cartData }
            dispatch(placeOrder(orderData))
        }
    }


    // checkOrderData function
    const checkOrderData = () => {
        if (ordered_data?.error === "true") {
            const cartIds = ordered_data?.meta?.map((item) => item.cart_id)
            cartIds?.map((item) => {
                var element = document.getElementById(item);
                return element.style.backgroundColor = "#ff616170";
            })
            toast.error("Quantity Is Unavilabe !!")
            dispatch(clearOrderedData())
        }
        else if (ordered_data?.message === "Order success") {
            if (ordered_data?.meta?.length === 0) {
                dispatch(emptyCart())
                dispatch(emptyBuyNow())
            }
            // toast.success("Order success")
            navigate('/ordersuccess')
            dispatch(emptyCart())
        }
    }


    useEffect(() => {
        console.log(buy_now_data);
        checkOrderData()
    }, [ordered_data, balance])


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getBalance())
        calculateSum()
    }, [cart_data, dispatch])



    // Calculate Sum function
    const calculateSum = () => {
        let st = 0
        let dc = 0
        if (buyNowDataObj?.length) {
            setAmount({
                ...amount,
                subtotal: buy_now_data?.amount?.subtotal,
                discount: buy_now_data?.amount?.discount,
                total: buy_now_data?.amount?.total
            })
        } else {
            cart_data?.map(({ resp, info }) => {
                if (Number(resp?.round_info?._dis)) {
                    st += (Number((resp?.round_info?._price * resp.quantity)))
                    dc += (Number(((resp?.round_info?._price) * (Number(resp?.round_info?._dis)) / 100) * resp.quantity))
                    return Number(st)
                } else {
                    st += Number(resp?.round_info?._price * resp.quantity)
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
                                <h3>Payment For Your Order</h3>
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


                                {/* Item List */}
                                {
                                    buyNowDataObj?.length > 0 ?
                                        <div className="order_history_summary col-md-8">
                                            <div className="cart_list_item">
                                                <Link to={`/info/${buy_now_data?.ticket?._id}/${buy_now_data?.product_info?.round_index}`}>
                                                    <div className="cart_item_img">
                                                        <img loading="lazy" src={baseUrl + buy_now_data?.ticket?.is_image} alt="" className="img-fluid" />
                                                    </div>
                                                </Link>
                                                <div className="cart_item_content">
                                                    <div className="cart_title">
                                                        <h3>{buy_now_data?.ticket?.ticket_name}</h3>
                                                    </div>
                                                    <div className="other_info">
                                                        <p className="amount fw-bold text-dark">Item Quantity : {buy_now_data?.product_info?.quantity}</p>
                                                        <p className="tic_price fw-bold text-dark">Price Of Ticket :
                                                            {token ? currency_symbol : generalCurrency_symbol}
                                                            &nbsp;{buy_now_data?.product_info?.total_discount_price}
                                                        </p>
                                                    </div>
                                                    <div className="date_result">
                                                        <h5><span><img loading="lazy" src="/assets/img/3135783 1.png" alt="" /></span>Result on <span className="fw-bold">
                                                            {new Date(buy_now_data?.product_info?.round_info?._time).toLocaleString('en-US', {
                                                                month: 'short',
                                                                day: '2-digit',
                                                                year: 'numeric'
                                                            })}
                                                        </span></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="order_history_summary ">
                                            {
                                                cart_data?.length ?
                                                    cart_data?.map((item) => {
                                                        return (
                                                            <div className="cart_list_item" key={item.resp._id} id={item.resp._id}>
                                                                <Link to={`/info/${item?.info[0]?._id}/${item?.resp?.round_index}`}>
                                                                    <div className="cart_item_img">
                                                                        <img loading="lazy" src={baseUrl + item?.info[0]?.main_image} alt="" className="img-fluid" />
                                                                    </div>
                                                                </Link>
                                                                <div className="cart_item_content">
                                                                    <div className="cart_title">
                                                                        <h3>{item?.info[0]?.ticket_name}</h3>
                                                                    </div>
                                                                    <div className="other_info">
                                                                        <p className="amount fw-bold text-dark">Item Quantity : {item?.resp?.quantity}</p>
                                                                        <p className="tic_price fw-bold text-dark">Price Of Ticket : {token ? currency_symbol : generalCurrency_symbol}&nbsp;
                                                                            {
                                                                                (Number((item?.resp?.round_info?._price) - (((item?.resp?.round_info?._price) * (item?.resp?.round_info?._dis)) / 100)) * (item?.resp?.quantity)).toFixed(2)
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="date_result">
                                                                        <h5><span><img loading="lazy" src="/assets/img/3135783 1.png" alt="" /></span>Result on <span className="fw-bold">
                                                                            {new Date(item?.resp?.round_info?._time).toLocaleString('en-US', {
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
                                                        <img loading="lazy" src="/assets/img/emptycart.png" alt="" />
                                                        <h2>Your Order List Is Empty</h2>
                                                    </div>

                                            }
                                        </div>
                                }
                            </div>

                            {/* Right Side Of PlaceOrder */}
                            <div className="col-md-4">
                                {
                                    buyNowDataObj?.length > 0 ?
                                        <div className="">
                                            <div className="purches_sum fixed_right">
                                                <div className="price_area_wrapper ">
                                                    <h3 className="price_title">Purchase Summary</h3>
                                                    <div className="price_inner">
                                                        <div className="price_item borderbottom">
                                                            <h4 className="price_text">Price <span> ({buy_now_data?.product_info?.quantity} Item):</span></h4>
                                                            <h6 className="price_value">
                                                                {buy_now_data ? <span>{token ? currency_symbol : generalCurrency_symbol}</span> : 0}
                                                                &nbsp;{buy_now_data?.amount ? (buy_now_data?.amount?.subtotal).toFixed(2) : 0}
                                                            </h6>
                                                        </div>
                                                        <div className="price_item mb-5">
                                                            <h4 className="price_text">Total Discount :</h4>
                                                            <h6 className="price_value text-success">
                                                                {buy_now_data ? <span>&nbsp;-{token ? currency_symbol : generalCurrency_symbol}</span> : 0}
                                                                {buy_now_data?.amount ? (buy_now_data?.amount?.discount).toFixed(2) : 0}
                                                            </h6>
                                                        </div>
                                                        <div className="price_item mt-5">
                                                            <h4 className="price_text">Total Payables:</h4>
                                                            <h6 className="price_value">
                                                                {buy_now_data ? <span>{token ? currency_symbol : generalCurrency_symbol}</span> : 0}

                                                                &nbsp;{buy_now_data?.amount ? (buy_now_data?.amount?.total).toFixed(2) : 0}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="">
                                            <div className="purches_sum fixed_right">
                                                <div className="price_area_wrapper ">
                                                    <h3 className="price_title">Purchase Summary</h3>
                                                    <div className="price_inner">
                                                        <div className="price_item borderbottom">
                                                            <h4 className="price_text">Price <span> ({cart_data?.length} Item):</span></h4>
                                                            <h6 className="price_value">
                                                                {cart_data ? <span>{token ? currency_symbol : generalCurrency_symbol}</span> : 0}
                                                                &nbsp;{(amount.subtotal).toFixed(2)}
                                                            </h6>
                                                        </div>
                                                        <div className="price_item mb-5">
                                                            <h4 className="price_text">Total Discount :</h4>
                                                            <h6 className="price_value text-success">
                                                                {cart_data ? <span>{token ? currency_symbol : generalCurrency_symbol}&nbsp;-</span> : 0}
                                                                {(amount.discount).toFixed(2)}
                                                            </h6>
                                                        </div>
                                                        <div className="price_item mt-5">
                                                            <h4 className="price_text">Total Payables:</h4>
                                                            <h6 className="price_value">
                                                                {cart_data ? <span>{token ? currency_symbol : generalCurrency_symbol}</span> : 0}

                                                                &nbsp;{(amount.total).toFixed(2)}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }

                                <div className="payment_form_area ">

                                    {/* <!-- payment information --> */}
                                    <div className="delivery_address">
                                        <h2 className="mb-2">Payment</h2>
                                        <hr />
                                    </div>
                                    <div className="payment_form mt-2">

                                        {/* Wallet */}
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="upi_one">
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label" htmlFor="inlineRadio1">
                                                            <span className='fw-bold fs-3'>Wallet Balance&nbsp;:</span>&nbsp;&nbsp;
                                                            {
                                                                (balance?.balance) > 0 ?
                                                                    <span className="upi_icon fw-bolder fs-4">{token ? currency_symbol : generalCurrency_symbol}&nbsp;{(balance?.balance)?.toFixed(2)}</span> :
                                                                    <span className="upi_icon fw-bolder">0</span>
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* Wallet Validation */}
                                                {
                                                    ((amount.total).toFixed(2) > balance?.balance) ?
                                                        <div className="alert alert-danger mt-2  fs-4" role="alert">
                                                            <span><i className="fas fa-balance-scale-right"></i></span> Insufficient Wallet Balance
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
                                                : <Link to={`/wallet/${dueAmount}`} className="btn2">Recharge Wallet</Link>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default PlaceOrder