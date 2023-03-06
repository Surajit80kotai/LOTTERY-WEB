import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { COUNTRY, PHONECODE, STATE } from "../api/Api";

// fetchCountry data
export const fetchCountry = createAsyncThunk("/countries", async () => {
    try {
        const result = await COUNTRY()
        // console.log(result?.data);
        return result?.data
    } catch (err) {
        console.log(err);
    }
})

// getPhone code
export const getPhoneCode = createAsyncThunk("/phone/code", async () => {
    try {
        const result = await PHONECODE()
        // console.log(result?.data);
        return result?.data
    } catch (err) {
        console.log(err);
    }
})

// fetchStates data
export const fetchStates = createAsyncThunk("/state", async (id) => {
    try {
        const result = await STATE(id)
        // console.log(result?.data);
        return result?.data
    } catch (err) {
        console.log(err);
    }
})


const CountryStateSlice = createSlice({
    name: "countrystateslice",
    initialState: {
        countryData: [],
        phoneCodeData: [],
        stateData: [],
        msg: "",
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // For country fetch
        builder.addCase(fetchCountry.pending, (state) => {
            state.msg = "Loading.."
            state.loading = true
        })
        builder.addCase(fetchCountry.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.countryData = payload
        })
        builder.addCase(fetchCountry.rejected, (state) => {
            state.msg = "Failed"
            state.loading = false
        })


        // Get Phone Code States
        builder.addCase(getPhoneCode.pending, (state) => {
            state.msg = "Loading.."
            state.loading = true
        })
        builder.addCase(getPhoneCode.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.phoneCodeData = payload
        })
        builder.addCase(getPhoneCode.rejected, (state) => {
            state.msg = "Failed"
            state.loading = false
        })


        //  For state fetch
        builder.addCase(fetchStates.pending, (state) => {
            state.msg = "Loading.."
            state.loading = true
        })
        builder.addCase(fetchStates.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.stateData = payload
        })
        builder.addCase(fetchStates.rejected, (state) => {
            state.msg = "Failed"
            state.loading = false
        })
    }

})

export default CountryStateSlice.reducer