import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONTACTUS, ORDERHISTORY, UPDATEPROFILE, WALLETBALANCE } from "../api/Api";

// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
};

//get user balance
export const getBalance = createAsyncThunk("/auth/account/wallet/balance", async (navigate, { rejectWithValue }) => {
    try {
        const response = await WALLETBALANCE(header)
        // console.log(response?.data)
        return response?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        if (err.response.data.error === true) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            navigate('/')
            setTimeout(() => {
                window.location.reload()
                navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


//update profile
export const updateProfile = createAsyncThunk("/auth/update/profile", async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
        const response = await UPDATEPROFILE(formData, header)
        // console.log(response?.data?.user_details);
        window.localStorage.removeItem("user")
        toast.success("Profile Updated Successfully.\nPlease Login Again To See The Changes", {
            autoClose: 4500
        })
        window.localStorage.setItem("user", JSON.stringify(response?.data?.user_details))
        return response?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        if (err.response.data.error === true) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            navigate('/')
            setTimeout(() => {
                window.location.reload()
                navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


// order history
export const userOrderHistory = createAsyncThunk("/auth/order/history", async (navigate, { rejectWithValue }) => {
    try {
        const res = await ORDERHISTORY(header)
        return res?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data))
        return rejectWithValue(err.response.data)
    }
})


// contact us
export const contactUs = createAsyncThunk("/auth/contact", async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
        const res = await CONTACTUS(formData, header)
        // console.log(res?.data);
        if (res?.data?.responseCode === 200) {
            toast.success(res?.data?.message, {
                autoClose: 3500
            })
        } else if (res?.data?.responseCode === 452) {
            toast.info(res?.data?.message, {
                autoClose: 3500
            })
        }
        return res?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        if (err.response.data.error === true) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            navigate('/')
            setTimeout(() => {
                window.location.reload()
                navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


const initialState = {
    balance: [],
    profile_data: [],
    order_history_data: [],
    balance_status: "",
    loading: false,
    status: "",
    userSliceError: null
}

// Creating Slice
export const UserSlice = createSlice({
    name: "userslice",
    initialState,
    reducers: {
        clearUserSliceError(state) {
            state.userSliceError = null
        }
    },
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
        builder.addCase(getBalance.rejected, (state, { payload }) => {
            state.balance_status = "Failed"
            state.loading = false
            state.userSliceError = payload
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
        builder.addCase(updateProfile.rejected, (state, { payload }) => {
            state.balance_status = "Failed"
            state.loading = false
            state.userSliceError = payload
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
        builder.addCase(userOrderHistory.rejected, (state, { payload }) => {
            state.balance_status = "Failed"
            state.loading = false
            state.userSliceError = payload
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
        builder.addCase(contactUs.rejected, (state, { payload }) => {
            state.status = "Failed"
            state.loading = false
            state.userSliceError = payload
        })
    }
})

export const { clearUserSliceError } = UserSlice.actions
export default UserSlice.reducer