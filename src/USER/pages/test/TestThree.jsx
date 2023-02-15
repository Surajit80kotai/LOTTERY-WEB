import React from 'react'

const Test3 = () => {
    return (
        <>
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
                        <div className="col-md-8">
                            <form className="accordion--form">

                                {/*********** Address Input section ***********/}
                                <fieldset className="accordion--form__fieldset" id="fieldset-one">
                                    <legend className="accordion--form__legend accordion--form__legend-active">YOUR ADDRESS</legend>

                                    <div className="accordion--form__wrapper accordion--form__wrapper-active">

                                        <div className="accordion--form__row">
                                            <label className="label_style" htmlFor="name">Address *</label> <br />
                                            <input
                                                className="accordion--form__text required"
                                                type="text"
                                                name="address"
                                                value={formValues.address}
                                                onChange={handleChange}
                                                id="address"
                                                placeholder="Enter You Address"
                                                required />
                                        </div>
                                        <div className="accordion--form__row">
                                            <button className="locationbtn"><span><i className="bi bi-compass"></i></span> Use my current location</button>
                                        </div>

                                        {/* <div className="accordion--form__invalid">{formError.address}</div> */}

                                        <button className="accordion--form__next-btn con" onClick={handleSubmit}>Continue</button>


                                    </div>
                                </fieldset>

                                <fieldset className="accordion--form__fieldset" id="fieldset-three">
                                    <legend className="accordion--form__legend">PAYMENT OPTION</legend>

                                    <div className="accordion--form__wrapper">

                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        UPI
                                                    </button>
                                                </h2>

                                                {/************ Radio Buttons section ************/}
                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="option_one">
                                                            <label className="radio">
                                                                <input
                                                                    type="radio"
                                                                    name="r"
                                                                    value="1"
                                                                    defaultChecked /> <span><img src="/assets/img/pay (2).png" className="radio_img" alt="" /></span> </label>
                                                            <label className="radio">
                                                                <input
                                                                    type="radio"
                                                                    name="r"
                                                                    value="1"
                                                                    defaultChecked /> <span><img src="/assets/img/pay (1).png" className="radio_img" alt="" /></span> </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingTwo">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Credit or Debit card
                                                    </button>
                                                </h2>

                                                {/*********** Card Payment input ***********/}
                                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="card_pay">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    id="card"
                                                                    name="card"
                                                                    aria-describedby=""
                                                                    placeholder="Enter Card Number" />
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control "
                                                                        id=""
                                                                        name=""
                                                                        aria-describedby=""
                                                                        placeholder="Expire Date" />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control "
                                                                        id="" name=""
                                                                        aria-describedby=""
                                                                        placeholder="CVC/CCV" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="btnarea mt-3">
                                            <Link className="accordion--form__prev-btn "><i className="bi bi-arrow-left"></i>Prev</Link>
                                            <button className="con">Continue</button>
                                        </div>

                                    </div>
                                </fieldset>


                            </form>


                        </div>

                        {/*********** Purchase Summary ***********/}
                        <div className="col-md-4">
                            <div className="price_area_wrapper">
                                <h3 className="price_title">Purchase Summary</h3>
                                <div className="price_inner">
                                    <div className="price_item borderbottom">
                                        <h4 className="price_text">Price <span> (0 Item):</span></h4>
                                        <h6 className="price_value"><span>€</span>0000</h6>
                                    </div>
                                    <div className="price_item mt-5">
                                        <h4 className="price_text">Total Payables:</h4>
                                        <h6 className="price_value"><span>€</span>0000</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Test3