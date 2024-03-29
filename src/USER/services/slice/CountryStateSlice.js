import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { COUNTRY, PHONECODE, STATE } from "../api/Api";

// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
};


// fetchCountry data
export const fetchCountry = createAsyncThunk("/countries", async (payload, { rejectWithValue }) => {
    try {
        const result = await COUNTRY(header)
        // console.log(result?.data);
        return result?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        return rejectWithValue(err.response.data)
    }
})


// getPhone code
export const getPhoneCode = createAsyncThunk("/phone/code", async (payload, { rejectWithValue }) => {
    try {
        const result = await PHONECODE(header)
        // console.log(result?.data);
        return result?.data
    } catch (err) {
        // console.log(err);
        return rejectWithValue(err.response.data)
    }
})


// fetchStates data
export const fetchStates = createAsyncThunk("/state", async (id, { rejectWithValue }) => {
    try {
        const result = await STATE(id, header)
        // console.log(result?.data);
        return result?.data
    } catch (err) {
        // console.log(err);
        return rejectWithValue(err.response.data)
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
    }

})

export default CountryStateSlice.reducer