import React from 'react'
import PhoneInput from 'react-phone-input-2'

const WithdrawModal = () => {
    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="withdrawModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-3" id="exampleModalLabel">Withdraw Money</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className='row'>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="phone" className="form-label fs-4">Enter Your Registered Phone Number</label>
                                        <PhoneInput
                                            inputProps={{ required: true }}
                                            placeholder="Enter Your Phone Number"
                                            country={"cm"}
                                            enableSearch={true}
                                        />
                                    </div>
                                    <div className="col-md-10 mb-3">
                                        <label htmlFor="amount" className="form-label fs-4">Enter Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            aria-describedby="emailHelp"
                                            placeholder='Enter Amount'
                                        />
                                    </div>
                                </div>
                                <button className="btn2 mt-3" style={{ alignItems: "center" }}>Withdraw</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithdrawModal