import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GETLOGO } from "../api/Api"


// fetching all lottery data
export const getLogo = createAsyncThunk("/system/get/log", async (payload, { rejectWithValue }) => {
    try {
        const response = await GETLOGO()
        // console.log(response?.data)
        return response?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        return rejectWithValue(err.response.data)
    }
})


// initialize initialState
const initialState = {
    settings_data: null,
    settings_status: "",
    settings_error: ""
}

// Creating Slice
export const SettingsSlice = createSlice({
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
            state.settings_data = payload
        })
        builder.addCase(getLogo.rejected, (state, { payload }) => {
            state.settings_status = "Failed"
            state.loading = false
            state.settings_error = payload
        })
    }
})

export default SettingsSlice.reducer