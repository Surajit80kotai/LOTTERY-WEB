import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { savePaymentDetails } from '../services/slice/PaymentSlice'

const MyPaypalButton = ({ amount }) => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const handleApprove = (data) => {
        const newData = { amount: amount, orderID: data.orderID }
        dispatch(savePaymentDetails(newData))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])


    return (
        <>
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_CLIENT_ID }}>
                <PayPalButtons
                    forceReRender={[amount]}
                    style={{
                        color: 'gold',
                        layout: 'horizontal',
                        height: 55,
                        tagline: 'false',
                        shape: 'pill',
                        label: 'paypal'
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
                    createOrder={async (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: amount,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        handleApprove(data)
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