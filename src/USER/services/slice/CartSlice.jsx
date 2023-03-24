import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADDTOCART, DELCART, FETCHCART, UPDATECART } from "../api/Api";
import { toast } from 'react-toastify'


// from socialuser
const socialuserID = (JSON.parse(window.localStorage.getItem("user")))?.uid

// Defining header
const header = {
    headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
}

// user ID
const userID = socialuserID ? socialuserID : (JSON.parse(window.localStorage.getItem("user"))?.user_id)




// AddCart post request handle
export const addCart = createAsyncThunk("/auth/add-cart", async ({ cartData, toast }) => {
    try {
        // console.log(cartData);
        const res = await ADDTOCART(cartData, header)
        if (res?.data?.status) {
            toast.success(res?.data?.message)
        } else {
            toast.error(res?.data?.message)
        }
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
export const getCart = createAsyncThunk("/auth/cart", async (rejectWithValue) => {
    try {
        if (userID && header) {
            const res = await FETCHCART(userID, header)
            // console.log("get cart called from slice")
            return res?.data
        }
    } catch (err) {
        // console.log("Cart data is not fetched", err)
        // console.log(err.response.data);
        return rejectWithValue(err.response.data)
    }
})


// updateCart get request handle
export const updateCart = createAsyncThunk("/auth/cart/qt_update", async ({ id, qty, flag }) => {
    try {
        const res = await UPDATECART(id, qty, flag, header)
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
        loading: false,
        error: ""
    },
    reducers: {
        emptyCart(state, { payload }) {
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
        },
        updateQTY(state, { payload }) {
            if (payload.qty) {
                const newCartData = state.cart_data.map(item => {
                    if (payload.id === item.resp._id) {
                        return {
                            ...item,
                            resp: {
                                ...item.resp,
                                quantity: payload.qty,
                            },
                        };
                    } else {
                        return item;
                    }
                });

                return {
                    ...state,
                    cart_data: newCartData,
                };
            }
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
        builder.addCase(getCart.rejected, (state, { payload }) => {
            state.status = "Failed"
            state.loading = false
            state.error = payload?.data
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
            if (!payload?.status) {
                toast.warning(payload.message)
            }
        })
        builder.addCase(updateCart.rejected, (state) => {
            state.status = "Failed"
            state.loading = false
        })
    }
})

export const { emptyCart, clearUpdateStatus, clearDeleteStatus, clearAddStatus, updateQTY } = CartSlice.actions
export default CartSlice.reducer