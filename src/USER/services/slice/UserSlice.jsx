import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONTACTUS, ORDERHISTORY, UPDATEPROFILE, WALLETBALANCE } from "../api/Api";

// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
};

// const socialHeader = {
//     headers: {
//         Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("accessToken"))}`
//     }
// };

//get user balance
export const getBalance = createAsyncThunk("/auth/account/wallet/balance", async () => {
    try {
        const response = await WALLETBALANCE(header)
        // console.log(response?.data)
        return response?.data
    } catch (err) {
        console.log(err);
    }
})


//update profile
export const updateProfile = createAsyncThunk("/auth/update/profile", async ({ formValues, toast }) => {
    try {
        const response = await UPDATEPROFILE(formValues, header)
        toast.success("Profile Updated Successfully")
        window.localStorage.setItem("user", JSON.stringify(response?.data))
        return response?.data
    } catch (err) {
        console.log(err);
    }
})


// order history
export const userOrderHistory = createAsyncThunk("/auth/order/history", async () => {
    try {
        const res = await ORDERHISTORY(header)
        return res?.data
        // if (header) {
        //     const res = await ORDERHISTORY(header)
        //     return res?.data
        // } else if (socialHeader) {
        //     const res = await ORDERHISTORY(socialHeader)
        //     return res?.data
        // }
    } catch (err) {
        console.log(err)
    }
})


// contact us
export const contactUs = createAsyncThunk("/auth/contact", async ({ formData, toast }) => {
    try {
        const res = await CONTACTUS(formData)
        // console.log(res?.data);
        if (res?.data?.responseCode === 200) {
            toast.info(res?.data?.message)
        } else if (res?.data?.responseCode === 452) {
            toast.info(res?.data?.message)
        }
        return res?.data
    } catch (err) {
        console.log(err);
    }
})


const initialState = {
    balance: [],
    profile_data: [],
    order_history_data: [],
    balance_status: "",
    loading: false,
    status: ""
}

// Creating Slice
export const UserSlice = createSlice({
    name: "userslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // states for fetchLottery
        builder.addCase(getBalance.pending, (state) => {
            state.balance_status = "Loading"
            state.loading = true
        })
        builder.addCase(getBalance.fulfilled, (state, { payload }) => {
            state.balance_status = "Success"
            state.loading = false
            state.balance = payload
        })
        builder.addCase(getBalance.rejected, (state) => {
            state.balance_status = "Failed"
            state.loading = false
        })

        // states for updateProfile
        builder.addCase(updateProfile.pending, (state) => {
            state.balance_status = "Loading"
            state.loading = true
        })
        builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
            state.balance_status = "Success"
            state.loading = false
            state.profile_data = payload
            // console.log(payload);
        })
        builder.addCase(updateProfile.rejected, (state) => {
            state.balance_status = "Failed"
            state.loading = false
        })

        // states for orderHistory
        builder.addCase(userOrderHistory.pending, (state) => {
            state.balance_status = "Loading"
            state.loading = true
        })
        builder.addCase(userOrderHistory.fulfilled, (state, { payload }) => {
            state.balance_status = "Success"
            state.loading = false
            state.order_history_data = payload
        })
        builder.addCase(userOrderHistory.rejected, (state) => {
            state.balance_status = "Failed"
            state.loading = false
        })

        // states for contactUs
        builder.addCase(contactUs.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(contactUs.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
        })
        builder.addCase(contactUs.rejected, (state) => {
            state.status = "Failed"
            state.loading = false
        })
    }
})

export default UserSlice.reducer