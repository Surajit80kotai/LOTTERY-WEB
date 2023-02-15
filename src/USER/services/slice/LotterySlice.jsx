import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CATEGORY, TICKET } from "../api/Api"

// fetching all category data
export const fetchCategory = createAsyncThunk("/admin/get-category", async () => {
    try {
        const response = await CATEGORY()
        // console.log(response?.data)
        return response?.data
    } catch (err) {
        console.log(err);
    }
})

// fetching all lottery data
export const fetchLottery = createAsyncThunk("ticket/get-tickets", async () => {
    try {
        const response = await TICKET()
        // console.log(response?.data)
        return response?.data
    } catch (err) {
        console.log(err);
    }
})


// initialize initialState
const initialState = {
    fetch_lott_data: [],
    fetch_lott_status: "",
    category_data: [],
    category_status: "",
    loading: false
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
        })
        builder.addCase(fetchLottery.fulfilled, (state, { payload }) => {
            state.fetch_lott_status = "Success"
            state.loading = false
            state.fetch_lott_data = payload
            window.localStorage.setItem("data", JSON.stringify(payload))
        })
        builder.addCase(fetchLottery.rejected, (state) => {
            state.fetch_lott_status = "Failed"
            state.loading = false
        })


        // states for fetchCategory
        builder.addCase(fetchCategory.pending, (state) => {
            state.category_status = "Loading"
            state.loading = true
        })
        builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
            state.category_status = "Success"
            state.loading = false
            state.category_data = payload
            window.localStorage.setItem("categoryData", JSON.stringify(payload))
        })
        builder.addCase(fetchCategory.rejected, (state) => {
            state.category_status = "Failed"
            state.loading = false
        })
    }
})

export default LotterySlice.reducer