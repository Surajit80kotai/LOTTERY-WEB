import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CHECKPASSWORD, CONTACTUS, DETAILSPAGEVISIT, INITWITHDRAW, ORDERHISTORY, UPDATEPROFILE, WALLETBALANCE, WITHDRAW } from "../api/Api";
import { toast } from "react-toastify";

// from socialuser
const socialuserID = (JSON.parse(window.localStorage.getItem("user")))?.uid

// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
};

// user ID
const userID = socialuserID ? socialuserID : (JSON.parse(window.localStorage.getItem("user"))?.user_id)

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
                // navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


//update profile
export const updateProfile = createAsyncThunk("/auth/update/profile", async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
        const response = await UPDATEPROFILE(formData, header)
        window.localStorage.removeItem("user")
        toast.success("Profile Updated Successfully", {
            autoClose: 3000
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
                // navigate('/login')
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
        if (err.response.data.error === true) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            navigate('/')
            setTimeout(() => {
                window.location.reload()
                // navigate('/login')
            }, 3700)
        }
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
                // navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


// init-withdraw
export const initWithdraw = createAsyncThunk("/auth/withdraw-init", async (navigate, { rejectWithValue }) => {
    try {
        const response = await INITWITHDRAW()
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
                // navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


// withdraw
export const withdraw = createAsyncThunk("/auth/withdraw", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        const response = await WITHDRAW(data)
        if (response?.data?.status === 202) {
            toast.success("Withdraw Request Accepted.Please Refresh The Page To See The Changes", {
                autoClose: "5000"
            })
        }
        return response?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        if (err.response.data.error === true) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            navigate('/')
            setTimeout(() => {
                window.location.reload()
                // navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


// checkPassword
export const checkPassword = createAsyncThunk("/auth/email/phone/change", async ({ password, navigate }, { rejectWithValue }) => {
    try {
        const response = await CHECKPASSWORD(password, header)
        return response?.data
    } catch (err) {
        if (err.response.data.error === true) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            navigate('/')
            setTimeout(() => {
                window.location.reload()
                // navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})


// detailsPageVisit
export const detailsPageVisit = createAsyncThunk("/auth/product/visit/log", async ({ _id, navigate }, { rejectWithValue }) => {
    try {
        const response = await DETAILSPAGEVISIT(userID, _id)
        return response?.data
    } catch (err) {
        if (err.response.data.error === true) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            navigate('/')
            setTimeout(() => {
                window.location.reload()
                // navigate('/login')
            }, 3700)
        }
        return rejectWithValue(err.response.data)
    }
})



const initialState = {
    balance: [],
    profile_data: [],
    order_history_data: [],
    withdraw_data: [],
    balance_status: "",
    loading: false,
    status: "",
    userSliceError: null,
    password_data: []
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

        // states for initWithdraw
        builder.addCase(initWithdraw.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(initWithdraw.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
            state.withdraw_data = payload
        })
        builder.addCase(initWithdraw.rejected, (state, { payload }) => {
            state.status = "Failed"
            state.loading = false
            state.userSliceError = payload
        })

        // states for withdraw
        builder.addCase(withdraw.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(withdraw.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
            state.withdraw_data = payload
        })
        builder.addCase(withdraw.rejected, (state, { payload }) => {
            state.status = "Failed"
            state.loading = false
            state.userSliceError = payload
        })

        // states for checkPassword
        builder.addCase(checkPassword.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(checkPassword.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
            state.password_data = payload
            if (payload?.valid) {
                toast.success(payload?.message, {
                    autoClose: "3500"
                })
            } else {
                toast.error(payload?.message, {
                    autoClose: "3500"
                })
            }
        })
        builder.addCase(checkPassword.rejected, (state, { payload }) => {
            state.status = "Failed"
            state.loading = false
            state.userSliceError = payload
        })

        // states for detailsPageVisit
        builder.addCase(detailsPageVisit.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(detailsPageVisit.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
        })
        builder.addCase(detailsPageVisit.rejected, (state, { payload }) => {
            state.status = "Failed"
            state.loading = false
            state.userSliceError = payload
        })
    }
})

export const { clearUserSliceError } = UserSlice.actions
export default UserSlice.reducer