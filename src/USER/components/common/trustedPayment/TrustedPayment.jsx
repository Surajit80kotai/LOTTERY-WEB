import React from 'react'

const TrustedPayment = () => {
    return (
        <>
            <div className="trustedpayemt">
                <div className="sectitle">
                    <h1>Trusted  Payment Method</h1>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-2 col-md-2">
                            <div className="payment_item">
                                <img src="/assets/img/orange.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="payment_item">
                                <img src="/assets/img/mtn.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="payment_item">
                                <img src="/assets/img/master.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="payment_item">
                                <img src="/assets/img/paypal.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrustedPayment
