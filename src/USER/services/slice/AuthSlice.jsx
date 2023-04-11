import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FORGETPASSWORD, FORGETPASSWORDOTP, GETOTP, LOGIN, SETNEWPASSWORD, SIGNUP, VERIFYOTP } from "../api/Api";


//AsyncThunk For SignUp 
export const fetchSignUp = createAsyncThunk(
    "signup",
    async ({ formValues, navigate, toast }, { rejectWithValue }) => {

        try {
            const res = await SIGNUP(formValues)
            navigate('/login')
            toast.success('Registered Successfully.\nPlease login to continue', {
                autoClose: 4500
            })
            return res?.data
        } catch (err) {
            // console.log("Sign Slice", rejectWithValue(err.response.data.errors));
            return rejectWithValue(err.response.data.errors)
        }

    })


//AsyncThunk For Login 
export const fetchLogin = createAsyncThunk(
    "login", async ({ data, navigate, toast }, { rejectWithValue }) => {
        // console.log(data)
        try {
            const result = await LOGIN(data)
            window.localStorage.setItem("token", JSON.stringify(result?.data?.token))
            window.localStorage.setItem("user", JSON.stringify(result?.data?.user_details))
            navigate('/')

            // To reload the page autometically after login
            setTimeout(() => {
                window.location.reload()
            }, 3500)

            // react toast message
            toast.success('Logged In Successfully', {
                autoClose: 3000
            })
            return result?.data
        } catch (err) {
            // console.log(rejectWithValue(err.response.data));
            return rejectWithValue(err.response.data)
        }

    })


//AsyncThunk For ForgetPassword 
export const fetchForgetPass = createAsyncThunk(
    "forget", async ({ formValues }, { rejectWithValue }) => {
        try {
            const res = await FORGETPASSWORD(formValues)
            return res?.data
        } catch (err) {
            // console.log(rejectWithValue(err.response.data));
            return rejectWithValue(err.response.data)
        }

    })


//AsyncThunk For Register OTP
export const registerOTP = createAsyncThunk("/system/register/otp", async (data, { rejectWithValue }) => {
    try {
        const res = await GETOTP(data)
        console.log("register otp API try", res?.data);
        return res?.data
    } catch (err) {
        console.log(rejectWithValue(err?.response?.data));
        return rejectWithValue(err?.response?.data)
    }
})


//AsyncThunk For Register OTP
export const verifyOTP = createAsyncThunk("/system/register/otp/verify", async (data, { rejectWithValue }) => {
    try {
        const res = await VERIFYOTP(data)
        // console.log("verify otp API try", res?.data);
        return res?.data
    } catch (err) {
        // console.log("verify otp API catch", err?.response?.data);
        return rejectWithValue(err?.response?.data)
    }
})


// forget password otp
export const fetchForgetPassOTP = createAsyncThunk(
    "/system/forget/password/otp", async (data, { rejectWithValue }) => {
        try {
            const res = await FORGETPASSWORDOTP(data)
            return res?.data
        } catch (err) {
            // console.log(rejectWithValue(err.response.data));
            return rejectWithValue(err.response.data)
        }

    })


// set new password
export const setNewPassword = createAsyncThunk(
    "/system/set/password", async ({ data, navigate, toast }, { rejectWithValue }) => {
        try {
            const res = await SETNEWPASSWORD(data)
            navigate('/login')
            toast.success(`${res?.data?.message} Please login to continue`, {
                autoClose: 4500
            })
            return res?.data
        } catch (err) {
            // console.log(rejectWithValue(err.response.data));
            return rejectWithValue(err.response.data)
        }

    })



// defining initialState
const initialState = {
    user: null,
    token: "",
    msg: "",
    error: null,
    login: {
        error_user: "",
        error_password: ""
    },
    signupErr: {},
    loading: false,
    reg_otp: null,
    verify_otp: null,
    validPhoneNumber: null
}

// Creating Slice
export const AuthSlice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        // Logout reducer
        doLogOut: (state) => {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            state.user = null
            state.token = ""
            toast.success("You have successfully logged out", {
                autoClose: 3500
            })
            // To reload the page autometically after logout
            setTimeout(() => {
                window.location.reload()
            }, 3600)
        },
        clearVerifyOtp(state) {
            state.reg_otp = null;
            state.verify_otp = null;
        },
        storePhoneNumber(state, { payload }) {
            state.validPhoneNumber = payload
        }

    },
    extraReducers: (builder) => {
        //States for Signup
        builder.addCase(fetchSignUp.pending, (state) => {
            state.msg = "Pending"
            state.loading = true
        })
        builder.addCase(fetchSignUp.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.user = payload
        })
        builder.addCase(fetchSignUp.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.signupErr = payload
        })


        //States for Login
        builder.addCase(fetchLogin.pending, (state) => {
            state.msg = "Loading"
            state.loading = true
        })
        builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.user = payload
            window.localStorage.getItem("token")
        })
        builder.addCase(fetchLogin.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            if (payload?.data?.type === "user") {
                state.login.error_user = payload.data
                state.login.error_password = ""
            } else if (payload?.data?.type === "password") {
                state.login.error_password = payload.data
                state.login.error_user = ""
            }
        })


        //States for ForgetPass
        builder.addCase(fetchForgetPass.pending, (state) => {
            state.msg = "Loading"
            state.loading = true
        })
        builder.addCase(fetchForgetPass.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.user = payload
        })
        builder.addCase(fetchForgetPass.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.error = payload
        })


        //States for Register OTP
        builder.addCase(registerOTP.pending, (state) => {
            state.msg = "Loading"
            state.loading = true
        })
        builder.addCase(registerOTP.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.reg_otp = payload
            // console.log("reg otp success", payload.status);
        })
        builder.addCase(registerOTP.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.reg_otp = payload
            // console.log("reg otp error", payload.status);
        })


        //States for Verify OTP
        builder.addCase(verifyOTP.pending, (state) => {
            state.msg = "Loading"
            state.loading = true
        })
        builder.addCase(verifyOTP.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.verify_otp = payload
            // console.log("verify otp success", payload.status);
        })
        builder.addCase(verifyOTP.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.verify_otp = payload
            // console.log("verify otp error", payload.status);
        })


        //States for Register OTP
        builder.addCase(fetchForgetPassOTP.pending, (state) => {
            state.msg = "Loading"
            state.loading = true
        })
        builder.addCase(fetchForgetPassOTP.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.reg_otp = payload
            // console.log("reg otp success", payload.status);
        })
        builder.addCase(fetchForgetPassOTP.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.reg_otp = payload
            // console.log("reg otp error", payload.status);
        })


        //States for Set New Password
        builder.addCase(setNewPassword.pending, (state) => {
            state.msg = "Loading"
            state.loading = true
        })
        builder.addCase(setNewPassword.fulfilled, (state) => {
            state.msg = "Success"
            state.loading = false
        })
        builder.addCase(setNewPassword.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.error = payload?.message
        })
    }
})

export const { doLogOut, clearVerifyOtp, storePhoneNumber } = AuthSlice.actions
export default AuthSlice.reducer