import React from 'react'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'

const WithdrawModal = () => {
    const [phone, setPhone] = useState('')
    const [phonecode, setPhonecode] = useState('')

    // handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(phone);
        console.log(phonecode);
    }


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
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div style={{ padding: "0 50px" }}>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label fs-4">Enter Your Registered Phone Number
                                            </label>
                                            <PhoneInput
                                                inputProps={{ required: true }}
                                                placeholder="Enter Your Phone Number"
                                                country={"cm"}
                                                enableSearch={true}
                                                onChange={
                                                    (value, data) => {
                                                        setPhone(value);
                                                        setPhonecode(data.dialCode)
                                                    }
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="amount" className="form-label fs-4">Enter Withdraw Amount</label>
                                            <input
                                                type="text"
                                                className="form-control form_input"
                                                id="amount"
                                                aria-describedby="emailHelp"
                                                placeholder='Enter Amount'
                                                pattern="[0-9]+"
                                                title="Enter positive numbers only"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn2 mt-3" style={{ alignItems: "center" }}>Withdraw</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default WithdrawModal