import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { COOKIEPOLICY, GETCOMMONPAGEDATA, GETLOGO, PRIVACYPOLICY, TERMSANDCONDITIONS } from "../api/Api"


// fetching pageLogo
export const getLogo = createAsyncThunk("/system/get/log", async (payload, { rejectWithValue }) => {
    try {
        const response = await GETLOGO()
        return response?.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


// fetching termsAndConditons
export const termsAndConditons = createAsyncThunk("/system/get/tc", async (payload, { rejectWithValue }) => {
    try {
        const response = await TERMSANDCONDITIONS()
        return response?.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


// fetching privacyPolicy
export const privacyPolicy = createAsyncThunk("/system/get/pp", async (payload, { rejectWithValue }) => {
    try {
        const response = await PRIVACYPOLICY()
        return response?.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


// fetching cookiePolicy
export const cookiePolicy = createAsyncThunk("/system/get/cookie", async (payload, { rejectWithValue }) => {
    try {
        const response = await COOKIEPOLICY()
        return response?.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


// fetching getCommonPageData
export const getCommonPageData = createAsyncThunk("/system/get/common", async (payload, { rejectWithValue }) => {
    try {
        const response = await GETCOMMONPAGEDATA()
        return response?.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


// initialize initialState
const initialState = {
    site_logo_data: {},
    terms_conditons_data: [],
    privacy_policy_data: [],
    cookie_policy_data: [],
    common_page_data: [],
    settings_status: "",
    settings_error: ""
}

// Creating Slice
const SettingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // states for getLogo
        builder.addCase(getLogo.pending, (state) => {
            state.settings_status = "Loading"
            state.loading = true
        })
        builder.addCase(getLogo.fulfilled, (state, { payload }) => {
            state.settings_status = "Success"
            state.loading = false
            state.site_logo_data = payload
        })
        builder.addCase(getLogo.rejected, (state, { payload }) => {
            state.settings_status = "Failed"
            state.loading = false
            state.settings_error = payload
        })


        // states for termsAndConditons
        builder.addCase(termsAndConditons.pending, (state) => {
            state.settings_status = "Loading"
            state.loading = true
        })
        builder.addCase(termsAndConditons.fulfilled, (state, { payload }) => {
            state.settings_status = "Success"
            state.loading = false
            state.terms_conditons_data = payload
        })
        builder.addCase(termsAndConditons.rejected, (state, { payload }) => {
            state.settings_status = "Failed"
            state.loading = false
            state.settings_error = payload
        })


        // states for privacyPolicy
        builder.addCase(privacyPolicy.pending, (state) => {
            state.settings_status = "Loading"
            state.loading = true
        })
        builder.addCase(privacyPolicy.fulfilled, (state, { payload }) => {
            state.settings_status = "Success"
            state.loading = false
            state.privacy_policy_data = payload
        })
        builder.addCase(privacyPolicy.rejected, (state, { payload }) => {
            state.settings_status = "Failed"
            state.loading = false
            state.settings_error = payload
        })


        // states for cookiePolicy
        builder.addCase(cookiePolicy.pending, (state) => {
            state.settings_status = "Loading"
            state.loading = true
        })
        builder.addCase(cookiePolicy.fulfilled, (state, { payload }) => {
            state.settings_status = "Success"
            state.loading = false
            state.cookie_policy_data = payload
        })
        builder.addCase(cookiePolicy.rejected, (state, { payload }) => {
            state.settings_status = "Failed"
            state.loading = false
            state.settings_error = payload
        })


        // states for getCommonPageData
        builder.addCase(getCommonPageData.pending, (state) => {
            state.settings_status = "Loading"
            state.loading = true
        })
        builder.addCase(getCommonPageData.fulfilled, (state, { payload }) => {
            state.settings_status = "Success"
            state.loading = false
            state.common_page_data = payload
        })
        builder.addCase(getCommonPageData.rejected, (state, { payload }) => {
            state.settings_status = "Failed"
            state.loading = false
            state.settings_error = payload
        })
    }
})

export default SettingsSlice.reducer