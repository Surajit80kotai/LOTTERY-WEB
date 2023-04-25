import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const MyPaypalButton = ({ amount }) => {
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    // const [newAmount, setNewAmount] = useState(amount)

    const handleApprove = (orderID) => {
        // setNewAmount(null)
        console.log("amount =>", amount);
        console.log("orderID =>", orderID);
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
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_CLIENT_ID }}>
                <PayPalButtons
                    forceReRender={[amount]}
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
                                        value: amount,
                                        // value: Number(amount)?.toFixed(2),
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        // const order = await actions.order.capture
                        // console.log(order);
                        handleApprove(data.orderID)
                    }}
                    onCancel={() => {
                        toast.error("Payment Cancelled")
                    }}
                    onError={(err) => {
                        setError(err)
                    }}
                />
            </PayPalScriptProvider>
        </>
    )
}

export default MyPaypalButton