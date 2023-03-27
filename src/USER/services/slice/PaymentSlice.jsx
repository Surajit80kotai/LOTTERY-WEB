import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BUYNOW, GETALLTRANSACTION, PAYINIT, PLACEORDER, UPDATETRANSACTION } from "../api/Api";

const token = JSON.parse(window.localStorage.getItem("token"))
const userID = (JSON.parse(window.localStorage.getItem("user"))?.user_id)
// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
};


// cinetPay
export const cinetPay = createAsyncThunk("/v2/payment", async (formValue) => {
    var data = JSON.stringify({
        "apikey": "102219127563b7f7c53a41e9.62135970",
        "site_id": "126127",
        "transaction_id": Math.floor(Math.random() * 100000000).toString(),
        "amount": formValue.amount,
        "currency": "XAF",
        "alternative_currency": "",
        "description": " TEST INTEGRATION ",
        "customer_id": "172",
        "customer_name": "KOUADIO",
        "customer_surname": "Francisse",
        "customer_email": "harrissylver@gmail.com",
        "customer_phone_number": "698118056",
        "customer_address": "Antananarivo",
        "customer_city": "Antananarivo",
        "customer_country": "CM",
        "customer_state": "CM",
        "customer_zip_code": "06510",
        // "notify_url": window.location.origin + "/wallet",
        // "return_url": window.location.origin + "/wallet",
        "notify_url": process.env.REACT_APP_BASE_URL + "/auth/update/payment/process/" + userID + "/web",
        "return_url": process.env.REACT_APP_BASE_URL + "/auth/update/payment/process/" + userID + "/web",
        "channels": "ALL",
        "metadata": token,
        "lang": "FR",
        "invoice_data": {
            "Donnee1": "",
            "Donnee2": "",
            "Donnee3": ""
        }
    })

    var config = {
        method: 'post',
        url: 'https://api-checkout.cinetpay.com/v2/payment',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }
    try {
        const res = await axios(config)
        return res?.data
    } catch (err) {
        console.log(err)
    }
})


//payment initialization
export const initPay = createAsyncThunk("/auth/pay/init", async (paymentData) => {
    try {
        const res = await PAYINIT(paymentData, header)
        return res?.data
    } catch (err) {
        console.log(err)
    }
})


// get all transaction
export const getTransactions = createAsyncThunk("/auth/get/transaction", async () => {
    try {
        const res = await GETALLTRANSACTION(header)
        return res?.data
    } catch (err) {
        console.log(err)
    }
})


//update transaction 
export const updateTransactions = createAsyncThunk("/auth/update/transaction", async () => {
    try {
        const res = await UPDATETRANSACTION(header)
        return res?.data
    } catch (err) {
        console.log(err)
    }
})


// place order
export const placeOrder = createAsyncThunk("/auth/order", async (orderData) => {
    try {
        const res = await PLACEORDER(orderData, header)
        // console.log(res?.data);
        return res?.data
    } catch (err) {
        console.log(err?.data)
    }
})


//buy now
export const itemBuyNow = createAsyncThunk("/auth/order/buy/now", async (orderData) => {
    try {
        const res = await BUYNOW(orderData, header)
        // console.log("response", res?.data);
        return res?.data
    } catch (err) {
        console.log(err)
    }
})



const initialState = {
    paymentData: [],
    transaction_data: [],
    updated_transac_data: [],
    ordered_data: [],
    buy_now_data: [],
    status: "",
    loading: false
}


export const PaymentSlice = createSlice({
    name: "paymentslice",
    initialState,
    reducers: {
        buyNowItem(state, { payload }) {
            // console.log(payload)
            state.buy_now_data = payload
            window.localStorage.setItem("buy_now_data", JSON.stringify(payload))
        },
        emptyBuyNow(state) {
            state.buy_now_data = []
            window.localStorage.removeItem("buy_now_data")
        },
        clearOrderedData(state) {
            state.ordered_data = []
        },
        clearBuyNowData(state) {
            state.buy_now_data = []
            window.localStorage.removeItem("buy_now_data")
        }
    },
    extraReducers: (builder) => {
        // States for cinetPay
        builder.addCase(cinetPay.pending, (state) => {
            state.status = "pending"
            state.loading = true
        })
        builder.addCase(cinetPay.fulfilled, (state, { payload }) => {
            state.paymentData = payload
            // console.log({ paymentSlice: payload });
            state.status = "success"
            state.loading = false
        })
        builder.addCase(cinetPay.rejected, (state) => {
            state.status = "failed"
            state.loading = false
        })


        // States for payment initialization
        builder.addCase(initPay.pending, (state) => {
            state.status = "pending"
            state.loading = true
        })
        builder.addCase(initPay.fulfilled, (state, { payload }) => {
            state.paymentData = payload
            state.status = "success"
            state.loading = false
        })
        builder.addCase(initPay.rejected, (state) => {
            state.status = "failed"
            state.loading = false
        })


        // States for get all transaction
        builder.addCase(getTransactions.pending, (state) => {
            state.status = "pending"
            state.loading = true
        })
        builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
            state.transaction_data = payload
            state.status = "success"
            state.loading = false
        })
        builder.addCase(getTransactions.rejected, (state) => {
            state.status = "failed"
            state.loading = false
        })


        // States for update transaction
        builder.addCase(updateTransactions.pending, (state) => {
            state.status = "pending"
            state.loading = true
        })
        builder.addCase(updateTransactions.fulfilled, (state, { payload }) => {
            state.updated_transac_data = payload
            state.status = "success"
            state.loading = false
        })
        builder.addCase(updateTransactions.rejected, (state) => {
            state.status = "failed"
            state.loading = false
        })

        // States for place order
        builder.addCase(placeOrder.pending, (state) => {
            state.status = "pending"
            state.loading = true
        })
        builder.addCase(placeOrder.fulfilled, (state, { payload }) => {
            state.ordered_data = payload
            state.status = "success"
            state.loading = false
        })
        builder.addCase(placeOrder.rejected, (state) => {
            state.status = "failed"
            state.loading = false
        })

        // States for buy now
        builder.addCase(itemBuyNow.pending, (state) => {
            state.status = "pending"
            state.loading = true
        })
        builder.addCase(itemBuyNow.fulfilled, (state, { payload }) => {
            state.ordered_data = payload
            state.status = "success"
            state.loading = false
        })
        builder.addCase(itemBuyNow.rejected, (state) => {
            state.status = "failed"
            state.loading = false
        })
    }
})


export const { buyNowItem, emptyBuyNow, clearOrderedData, clearBuyNowData } = PaymentSlice.actions
export default PaymentSlice.reducer