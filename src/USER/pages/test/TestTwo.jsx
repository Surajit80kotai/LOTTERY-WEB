import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const debug = true;

const MyPaypalButton = ({ amount }) => {
    const [state, setState] = useState({
        amount: "",
        orderID: "",
        onApproveMessage: "",
        onErrorMessage: ""
    });

    const onChange = (event) => {
        setState({
            ...state,
            amount: event.target.value,
            orderID: "",
            onApproveMessage: "",
            onErrorMessage: ""
        });
    }

    const createOrder = (data, actions) => {
        if (debug) console.log("Creating order for amount", state.amount);
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: state.amount
                        }
                    }
                ]
            })
            .then((orderID) => {
                setState(prevState => ({ ...prevState, orderID }));
                return orderID;
            });
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            setState(prevState => ({ ...prevState, onApproveMessage: `Transaction completed by ${details.payer.name.given_name}!` }));
        });
    }

    const onError = (err) => {
        setState(prevState => ({ ...prevState, onErrorMessage: err.toString() }));
    }

    const onClick = () => {
        if (debug) console.log("When clicked, amount was", state.amount);
    }


    return (
        <>
            <div style={{ minHeight: "300px" }}>
                <table className="table" style={{ maxWidth: "400px" }}>
                    <tbody>
                        <tr>
                            <th>
                                <label htmlFor="amount">Order Amount: </label>
                            </th>
                            <td>
                                {/* <select onChange={onChange} name="amount" id="amount">
                                    <option value="2.00">$2.00</option>
                                    <option value="4.00">$4.00</option>
                                    <option value="6.00">$6.00</option>
                                </select> */}
                                <input type="text"
                                    onChange={onChange}
                                    name="amount"
                                    id="amount"
                                // value={state?.amount}
                                // hidden
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Order ID:</th>
                            <td>{state.orderID ? state.orderID : "unknown"}</td>
                        </tr>
                        <tr>
                            <th>On Approve Message: </th>
                            <td data-testid="message">{state.onApproveMessage}</td>
                        </tr>
                        <tr>
                            <th>On Error Message: </th>
                            <td data-testid="error">{state.onErrorMessage}</td>
                        </tr>
                    </tbody>
                </table>
                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_CLIENT_ID }}>
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        onClick={onClick}
                    />
                </PayPalScriptProvider>
            </div>
        </>
    )
}

export default MyPaypalButton