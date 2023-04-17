import React from 'react'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'

const WithdrawModal = () => {
    const [phone, setPhone] = useState('')
    const [phonecode, setPhonecode] = useState('')
    const [formValues, setFormValues] = useState({ amount: '' })

    // handleChange function
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    // handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(phone);
        console.log(phonecode);
    }


    return (
        <>
            {/*  Button trigger modal */}
            <button type="button" className="btn2 mx-5 my-3" data-bs-toggle="modal" data-bs-target="#withdrawModal">
                Withdraw Money
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="withdrawModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-3" id="exampleModalLabel" style={{ padding: "0.3rem 15rem" }}>Withdraw Money</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <p className='text-center text-danger fs-5'>Minimum Withdraw Amount Should Be 500*</p>
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
                                                name='amount'
                                                id="amount"
                                                aria-describedby="emailHelp"
                                                placeholder='Enter Amount'
                                                pattern="[0-9]+"
                                                title="Enter positive numbers only"
                                                value={formValues?.amount}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {
                                        formValues?.amount >= 500 ?
                                            <button className="btn2 mt-3" style={{ alignItems: "center" }}>Withdraw</button>
                                            :
                                            <button className="btn2 mt-3" style={{ alignItems: "center", backgroundColor: "#00000078" }}>Withdraw</button>
                                    }
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