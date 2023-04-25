import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, clearAddStatus, getCart } from '../../../services/slice/CartSlice'
import { buyNowItem } from '../../../services/slice/PaymentSlice'
import CommonCardTimer from '../../../util/CommonCardTimer'
import { currency_symbol, generalCurrency_symbol } from '../../../util/Currency'
// import PreLoader from '../preloader/PreLoader'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SliderCard = ({ item }) => {
    const { t } = useTranslation()
    const [round, setRound] = useState(0)
    const { ticket_name, main_image, is_image, _id, rounds } = item

    // ticket rounds calculation function
    const calculateRounds = () => {
        var currentDate = new Date().toISOString().slice(0, 10);
        let result = item?.rounds?.filter(item => item._time >= currentDate ? item : null)
        setRound(item?.rounds.indexOf(result[0]))
    }


    // discount calculation
    const discountedPrice = Number((rounds[round]?._price - ((rounds[round]?._price * rounds[round]?._dis) / 100)))
    const dispatch = useDispatch()

    // states from cartslice
    const { add_cart_status } = useSelector((state) => state.cartslice)
    // const cartLength = cart_data?.length
    const navigate = useNavigate()
    // userID
    const userID = (JSON.parse(window.localStorage.getItem("user")))?.user_id
    // Accesing token
    const token = JSON.parse(window.localStorage.getItem("token"))


    // baseUrl For Images
    const baseUrl = process.env.REACT_APP_NODE_HOST


    // add to cart
    const addToCart = () => {
        const cartData = { product_id: _id, user_id: userID, qty: 1, round_info: rounds[round], round_index: round }
        dispatch(addCart({ cartData, toast, navigate }))
        setTimeout(() => {
            dispatch(getCart())
        }, 300)
        // setIsrender(!isrender)
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


    useEffect(() => {
        calculateRounds()
        // console.log("mount");
        return () => {
            dispatch(clearAddStatus())
        }
    }, [dispatch, add_cart_status, item])



    return (
        <>
            {/* PreLoader */}
            {/* {loading && <PreLoader />} */}

            {/* { 
                // round >= 0 &&
                */}
            <div className="product_item_one m-2">
                <Link to={`/info/${_id}/${round}`}>
                    <div className="product_img">
                        <div className="pro_img">
                            {/* Image Condition */}
                            {
                                (is_image?.length) ? <img loading="lazy" src={baseUrl + main_image} alt="" className="img-fluid " />
                                    : <img loading="lazy" src="/assets/img/imageunavailable.jpeg" alt="" className="img-fluid " />
                            }
                        </div>
                    </div>
                </Link>
                <div className="product_content">
                    <Link to={`/info/${_id}/${round}`}>
                        <div className="product_price">
                            {
                                rounds[round] ?
                                    rounds[round]?._dis ?
                                        <h3>
                                            <span className="discountprice">{token ? currency_symbol : generalCurrency_symbol}&nbsp;{(discountedPrice).toFixed(2)}</span>&nbsp;&nbsp;<span>
                                                {token ? currency_symbol : generalCurrency_symbol}</span>
                                            <span className="text-decoration-line-through">&nbsp;{rounds[round]?._price}</span>&nbsp;&nbsp;
                                            {/* <span className="discount_percent">{rounds[round]?._dis}% off</span> */}
                                        </h3>
                                        :
                                        <h3>
                                            <span className="discountprice">{token ? currency_symbol : generalCurrency_symbol}  &nbsp;{(rounds[round]?._price).toFixed(2)}</span>
                                        </h3>
                                    : null
                            }
                        </div>
                        <div className="product_title">
                            <h2 className="card_title">{ticket_name}</h2>
                        </div>
                        {
                            rounds[round] ?
                                rounds[round]?._qty > 0 ?
                                    <h3 className="total_ticket">
                                        {/* <span className='mr-2'> */}
                                        <span>
                                            {t('Round')}: {(round + 1) + "/" + rounds?.length}
                                        </span>
                                        <br />
                                        {/* <span className='mx-3'> */}
                                        <span>
                                            {t('Remaining Tickets')}: {rounds[round]?._qty}
                                        </span>
                                    </h3>
                                    : <h3 className="total_ticket" style={{ "color": "#cb4154" }}>
                                        {t('All Tickets Sold For Round')} : {(round + 1)}
                                    </h3>
                                : null
                        }

                        {/* Condition for timer run-out */}
                        <CommonCardTimer
                            item={item}
                            round={round}
                        />
                    </Link>

                    <div className="add_buy_button">
                        <div className="product_btn">
                            {/* Add Cart Button */}
                            {
                                rounds[round] ?
                                    (rounds[round]?._qty) > 0 ?
                                        token ?
                                            <Link to="#!" onClick={addToCart} className="btn2">{t('Add To Cart')}</Link>
                                            : <Link to="/login" className="btn2">{t('Add To Cart')}</Link>
                                        : <Link to="#!" className="btn2_disabled" disabled>{t('Add To Cart')}</Link>
                                    : null
                            }
                            {/* Buy Now Button */}
                            {
                                rounds[round] ?
                                    (rounds[round]?._qty) > 0 ?
                                        token ?
                                            <Link to="/placeorder" onClick={() => buyNow(item)} className="btn2">{t('Buy Ticket')}</Link>
                                            : <Link to="/login" className="btn2">{t('Buy Ticket')}</Link>
                                        : <Link to="#!" className="btn2_disabled" disabled>{t('Buy Ticket')}</Link>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* } */}
        </>
    )
}

export default SliderCard