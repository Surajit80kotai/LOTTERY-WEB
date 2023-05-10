import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CATEGORY, TICKET } from "../api/Api"


// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
}

// fetching all category data
export const fetchCategory = createAsyncThunk("/admin/get-category", async (payload, { rejectWithValue }) => {
    try {
        const response = await CATEGORY(header)
        // console.log(response?.data)
        return response?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        return rejectWithValue(err.response.data)
    }
})

// fetching all lottery data
export const fetchLottery = createAsyncThunk("ticket/get-tickets", async (payload, { rejectWithValue }) => {
    try {
        const response = await TICKET(header)
        // console.log(response?.data)
        return response?.data
    } catch (err) {
        // console.log(rejectWithValue(err.response.data));
        return rejectWithValue(err.response.data)
    }
})


// initialize initialState
const initialState = {
    fetch_lott_data: [],
    fetch_lott_status: "",
    category_data: [],
    category_status: "",
    loading: false,
    status: false,
    net_error: ""
}

// Creating Slice
export const LotterySlice = createSlice({
    name: "lotteryslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // states for fetchLottery
        builder.addCase(fetchLottery.pending, (state) => {
            state.fetch_lott_status = "Loading"
            state.loading = true
            state.status = true
        })
        builder.addCase(fetchLottery.fulfilled, (state, { payload }) => {
            state.fetch_lott_status = "Success"
            state.loading = false
            state.status = false
            state.fetch_lott_data = payload
            window.localStorage.setItem("data", JSON.stringify(payload))
        })
        builder.addCase(fetchLottery.rejected, (state, { payload }) => {
            state.fetch_lott_status = "Failed"
            state.loading = false
            state.status = false
            state.net_error = payload?.data
        })


        // states for fetchCategory
        builder.addCase(fetchCategory.pending, (state) => {
            state.category_status = "Loading"
            state.loading = true
            state.status = true
        })
        builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
            state.category_status = "Success"
            state.loading = false
            state.status = false
            state.category_data = payload
            window.localStorage.setItem("categoryData", JSON.stringify(payload))
        })
        builder.addCase(fetchCategory.rejected, (state, { payload }) => {
            state.category_status = "Failed"
            state.loading = false
            state.status = false
            state.net_error = payload?.data
        })
    }
})

export default LotterySlice.reducer