import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearDeleteStatus, clearUpdateStatus, delCartItem, getCart, updateCart, updateQTY } from '../services/slice/CartSlice'
import { useEffect } from 'react'
import { clearOrderedData, emptyBuyNow } from '../services/slice/PaymentSlice'
import PreLoader from '../components/core/preloader/PreLoader'
import { currency_symbol, generalCurrency_symbol } from '../util/Currency'
import { toast } from 'react-toastify'

const baseUrl = process.env.REACT_APP_NODE_HOST

const Cart = () => {
  const { cart_data, update_status, delete_status, loading } = useSelector((state) => state.cartslice)
  const dispatch = useDispatch()
  const cartLength = cart_data?.length
  const [amount, setAmount] = useState({ subtotal: 0, discount: 0, total: 0 })

  // Accesing token
  const token = JSON.parse(window.localStorage.getItem("token"))

  // console.log(cart_data);

  // CalculateSum Function
  const calculateSum = () => {
    setTimeout(() => {
      let st = 0
      let dc = 0
      cart_data?.map(({ resp }) => {
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
    }, 1000)

  }

  // console.log(cart_data);
  // IncQty function
  const IncQty = (qty, c_id) => {
    const u_qty = qty + 1
    const data = { id: c_id, qty: u_qty, flag: "cart" }
    dispatch(updateQTY(data))
    dispatch(updateCart(data))
  }

  // DecQty function
  const DecQty = (qty, c_id) => {
    const u_qty = qty - 1
    const data = { id: c_id, qty: u_qty, flag: "cart" }
    dispatch(updateQTY(data))
    dispatch(updateCart(data))
  }

  // removeItem function
  const removeItem = (id) => {
    dispatch(delCartItem(id))
    setTimeout(() => {
      toast.success("Item Removed From Cart", {
        autoClose: 3000
      })
    }, 300)
  }



  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getCart())

    if (update_status?.status) {
      calculateSum()
    }

    // cleanUp
    return () => {
      dispatch(clearUpdateStatus())
      dispatch(clearDeleteStatus())
      dispatch(clearOrderedData())
    }
  }, [dispatch, cartLength, update_status, delete_status])



  useEffect(() => {
    calculateSum()
  }, [cartLength])



  return (
    <>
      {/* PreLoader */}
      {loading && <PreLoader />}
      <main>
        <div className="cart_list_wrapper pb-5">
          <div className="container pt-5">
            <div className="bred">
              <div className="product_title_top">
                <h3>Your Cart Items</h3>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
              </nav>
            </div>
          </div>
          {/* Cart Item list */}
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="cart_list_area">
                  {
                    cart_data?.length ?
                      cart_data?.map((item) => {
                        // cart_data?.map((item) => {
                        return (

                          <div className="cart_list_item" key={item?.resp?._id}>
                            {/* Image */}
                            <Link to={`/info/${item?.info[0]?._id}/${item?.resp?.round_index}`}>
                              <div className="cart_item_img">
                                <img loading="lazy" src={baseUrl + item?.info[0]?.main_image} alt="" className="img-fluid" />
                              </div>
                            </Link>

                            {/* Item Info */}
                            <div className="cart_item_content">
                              <div className="cart_title">
                                <h3>{item?.info[0]?.ticket_name}</h3>
                              </div>
                              <div className="other_info">
                                <p className="amount fw-bold text-dark">Item Quantity : {item?.resp?.quantity}</p>
                                {/* Calculation of discounted price */}
                                <p className="tic_price fw-bold text-dark">Price Of Ticket : {token ? currency_symbol : generalCurrency_symbol}&nbsp;
                                  {
                                    (Number(item?.resp?.round_info?._price - ((item?.resp?.round_info?._price * item?.resp?.round_info?._dis) / 100)) * item?.resp?.quantity).toFixed(2)
                                  }
                                </p>
                              </div>
                              <div className="date_result">
                                {/* Calculating the data */}
                                <h5><span><img loading="lazy" src="/assets/img/3135783 1.png" alt="" /></span>Result on <span className="fw-bold">
                                  {new Date(item?.resp?.round_info?._time).toLocaleString('en-US', {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric'
                                  })}
                                </span></h5>
                                {/* Quantity */}
                                <div className="qty-container">
                                  <button onClick={() => DecQty(item?.resp?.quantity, item?.resp?._id)} className="qty-btn-minus btn-light" type="button"><i className="fa fa-minus"></i></button>
                                  <h1 className='quantity_title'>{item?.resp?.quantity}</h1>
                                  <button onClick={() => IncQty(item?.resp?.quantity, item?.resp?._id)} className="qty-btn-plus btn-light" type="button"><i className="fa fa-plus"></i></button>
                                </div>
                              </div>
                            </div>

                            {/* Remove button */}
                            <div className="remove_btn">
                              <button onClick={() => removeItem(item?.resp?._id)}><i className="bi bi-trash3"></i></button>
                            </div>

                          </div>
                        )
                      })
                      :
                      <div className='text-center' >
                        <img loading="lazy" src="/assets/img/emptycart.png" alt="" />
                        <h2>Your Cart Is Empty</h2>
                      </div>

                  }
                </div>
                {/* <!-- place order area --> */}
                {
                  cart_data?.length > 0 ?
                    <div className="placeorder_area sticky">
                      <Link to="/placeorder" onClick={() => dispatch(emptyBuyNow())} className="orderplace">Place Order</Link>
                    </div>
                    :
                    <div className="placeorder_area sticky">
                      <button disabled>No item left to place order</button>
                    </div>
                }

              </div>

              {/* Purchase Summery Section */}
              <div className="col-md-4">
                <div className="price_area_wrapper">
                  <h3 className="price_title">Purchase Summary</h3>
                  <div className="price_inner">

                    {/* Total Price calculation */}
                    <div className="price_item borderbottom">
                      <h4 className="price_text">Price <span> ({cart_data?.length} Item):</span></h4>
                      <h6 className="price_value">
                        {cart_data ? <span>{token ? currency_symbol : generalCurrency_symbol}</span> : 0}&nbsp;
                        {(amount.subtotal).toFixed(2)}
                      </h6>
                    </div>

                    {/* Discount Calculation */}
                    <div className="price_item borderbottom">
                      <h4 className="price_text">Total Discount :</h4>
                      <h6 className="price_value text-success">
                        {cart_data ? <span>{token ? currency_symbol : generalCurrency_symbol}&nbsp;-</span> : 0}
                        {(amount.discount).toFixed(2)}
                      </h6>
                    </div>

                    {/* Sub Total calculation */}
                    <div className="price_item mt-5">
                      <h4 className="price_text">Total Payables:</h4>
                      <h6 className="price_value">
                        {cart_data ? <span>{token ? currency_symbol : generalCurrency_symbol}</span> : 0}&nbsp;
                        {(amount.total).toFixed(2)}
                      </h6>
                    </div>
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

export default Cart