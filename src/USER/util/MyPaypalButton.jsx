import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const MyPaypalButton = ({ amount }) => {
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    // const [newAmount, setNewAmount] = useState(amount)
    const [newAmount, setNewAmount] = useState(12)

    const handleApprove = (orderID) => {
        setNewAmount(null)
        setPaidFor(true)
    }

    useEffect(() => {
        if (paidFor) {
            toast.success("Payment Success")
        } else if (error) {
            toast.error(error)
        }
    }, [paidFor, error])


    return (
        <>
            {/* <PayPalScriptProvider options={{ "client-id": "test" }}> */}
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_CLIENT_ID }}>
                <PayPalButtons
                    style={{
                        color: 'silver',
                        layout: 'horizontal',
                        height: 55,
                        tagline: 'false',
                        shape: 'pill'
                    }}
                    onClick={(data, actions) => {
                        const alreadyPaid = false
                        if (alreadyPaid) {
                            setError("Already Paid")
                            return actions.reject()
                        } else {
                            return actions.resolve()
                        }
                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: newAmount,
                                        // value: Number(amount)?.toFixed(2),
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        return await actions.order.capture().then((details) => {
                            // const name = details.payer.name.given_name;
                            console.log(details);
                            handleApprove(data.orderID)
                        });
                    }}
                    onCancel={() => {
                        toast.error("Payment Cancelled", {
                            autoClose: 3500
                        })
                    }}
                    onError={(err) => {
                        setError(err)
                        console.log(err);
                    }}
                />
            </PayPalScriptProvider>
        </>
    )
}

export default MyPaypalButton