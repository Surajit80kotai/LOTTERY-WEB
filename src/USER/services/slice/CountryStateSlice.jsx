import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { COUNTRY, PHONECODE, STATE, TESTAPI } from "../api/Api";

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

// test
export const testPhoneCode = createAsyncThunk("/phonecode.json", async () => {
    try {
        const result = await TESTAPI()
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
        loading: false,
        testPhoneCodeData: []
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


        //  For state fetch
        builder.addCase(testPhoneCode.pending, (state) => {
            state.msg = "Loading.."
            state.loading = true
        })
        builder.addCase(testPhoneCode.fulfilled, (state, { payload }) => {
            state.msg = "Success"
            state.loading = false
            state.testPhoneCodeData = payload
            // console.log(payload);
        })
        builder.addCase(testPhoneCode.rejected, (state) => {
            state.msg = "Failed"
            state.loading = false
        })
    }

})

export default CountryStateSlice.reducer