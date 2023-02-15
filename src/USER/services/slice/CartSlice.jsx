import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADDTOCART, DELCART, FETCHCART, UPDATECART } from "../api/Api";
import { toast } from 'react-toastify'


// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
};

const userID = (JSON.parse(window.localStorage.getItem("user"))?.user_id)


// AddCart post request handle
export const addCart = createAsyncThunk("/auth/add-cart", async (cartData) => {
    // console.log(cartData);
    try {
        const res = await ADDTOCART(cartData, header)
        return res?.data
    } catch (err) {
        console.log(err)
    }
})


// DeleteCart post request handle
export const delCartItem = createAsyncThunk("/auth/cart/delete", async (c_id) => {
    try {
        const res = await DELCART(c_id, header)
        return res?.data
    } catch (err) {
        console.log(err)
    }
})


// GetCart get request handle
export const getCart = createAsyncThunk("/auth/cart", async () => {
    try {
        if (userID && header) {
            const res = await FETCHCART(userID, header)
            // console.log("get cart called from slice")
            return res?.data
        }
    } catch (err) {
        console.log("Cart data is not fetched", err)
    }
})


// updateCart get request handle
export const updateCart = createAsyncThunk("/auth/cart/qt_update", async ({ id, qty }) => {
    try {
        const res = await UPDATECART(id, qty, header)
        return res?.data
    } catch (err) {
        console.log("Quantity not updated", err)
    }
})



export const CartSlice = createSlice({
    name: "cartslice",
    initialState: {
        cart_data: [],
        status: "",
        sub_total: 0,
        total: 0,
        add_cart_status: "",
        update_status: "",
        delete_status: "",
        loading: false
    },
    reducers: {
        emptyCart(state) {
            state.cart_data = []
        },
        clearAddStatus(state) {
            state.add_cart_status = ""
        },
        clearUpdateStatus(state) {
            state.update_status = ""
        },
        clearDeleteStatus(state) {
            state.delete_status = ""
        }
    },
    extraReducers: (builder) => {
        // Post request states for Addcart system
        builder.addCase(addCart.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(addCart.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
            state.add_cart_status = payload
        })
        builder.addCase(addCart.rejected, (state) => {
            state.status = "Failed"
            state.loading = false
        })


        // states for Deletecart system
        builder.addCase(delCartItem.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(delCartItem.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
            state.delete_status = payload
            // console.log(payload)
        })
        builder.addCase(delCartItem.rejected, (state) => {
            state.status = "Failed"
            state.loading = false
        })


        // Get request states for Gatcart system
        builder.addCase(getCart.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(getCart.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
            state.cart_data = payload
        })
        builder.addCase(getCart.rejected, (state) => {
            state.status = "Failed"
            state.loading = false
        })


        // states for Updatecart system
        builder.addCase(updateCart.pending, (state) => {
            state.status = "Loading"
            state.loading = true
        })
        builder.addCase(updateCart.fulfilled, (state, { payload }) => {
            state.status = "Success"
            state.loading = false
            state.update_status = payload
            if (payload.quantity > 5) {
                toast.warning(payload.message)
            }
        })
        builder.addCase(updateCart.rejected, (state) => {
            state.status = "Failed"
            state.loading = false
        })
    }
})

export const { emptyCart, clearUpdateStatus, clearDeleteStatus, clearAddStatus } = CartSlice.actions
export default CartSlice.reducer