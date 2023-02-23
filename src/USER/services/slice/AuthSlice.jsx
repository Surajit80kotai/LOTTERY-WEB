import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FORGETPASSWORD, GETOTP, LOGIN, SIGNUP, VERIFYOTP } from "../api/Api";


//AsyncThunk For SignUp 
export const fetchSignUp = createAsyncThunk(
    "signup",
    async ({ formValues, navigate, toast }, { rejectWithValue }) => {

        try {
            const res = await SIGNUP(formValues)
            navigate('/login')
            toast.success('Registered Successfully. Please login to continue')
            return res?.data
        } catch (err) {
            // console.log("Sign Slice", rejectWithValue(err.response.data.errors));
            return rejectWithValue(err.response.data.errors)
        }

    })


//AsyncThunk For Login 
export const fetchLogin = createAsyncThunk(
    "login", async ({ formValues, navigate, toast }, { rejectWithValue }) => {
        try {
            const result = await LOGIN(formValues)
            window.localStorage.setItem("token", JSON.stringify(result?.data?.token))
            window.localStorage.setItem("user", JSON.stringify(result?.data?.user_details))
            navigate('/')

            // To reload the page autometically after login
            setTimeout(() => {
                window.location.reload()
            }, 3500)

            // react toast message
            toast.success('Loged In Successfully')

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
        console.log(res?.data);
        return res?.data
    } catch (err) {
        return rejectWithValue(err)
    }
})


//AsyncThunk For Register OTP
export const verifyOTP = createAsyncThunk("/system/register/otp/verify", async (data, { rejectWithValue }) => {
    try {
        const res = await VERIFYOTP(data)
        console.log(res?.data);
        return res?.data
    } catch (err) {
        return rejectWithValue(err)
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
    reg_otp: "",
    verify_otp: ""
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
        },
        clearVerifyOtp(state) {
            state.verify_otp = ""
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
            state.reg_otp = payload?.message
            console.log("reg otp success", typeof payload);
        })
        builder.addCase(registerOTP.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.reg_otp = payload?.message
            console.log("reg otp error", typeof payload);
        })


        //States for Verify OTP
        builder.addCase(verifyOTP.pending, (state) => {
            state.msg = "Loading"
            state.loading = true
        })
        builder.addCase(verifyOTP.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.verify_otp = payload?.message
            console.log("verify otp success", payload);
        })
        builder.addCase(verifyOTP.rejected, (state, { payload }) => {
            state.msg = "Failed"
            state.loading = false
            state.verify_otp = payload?.message
            console.log("verify otp error", payload);
        })
    }
})

export const { doLogOut, clearVerifyOtp } = AuthSlice.actions
export default AuthSlice.reducer