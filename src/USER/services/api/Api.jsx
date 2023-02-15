import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

// login api function
export const LOGIN = (loginData) => API.post('/auth/login', loginData)

// signup api function
export const SIGNUP = (signupData) => API.post('/auth/signup', signupData)

// forgetpassword api function
export const FORGETPASSWORD = (formValue) => API.post('/auth/forget', formValue)

// country & state api function
export const COUNTRY = () => API.get('/countries')
export const STATE = (id) => API.get('/state/' + id)

// get Category api function
export const CATEGORY = () => API.get('/admin/get-category')

// get ticket api Function
export const TICKET = () => API.get('/ticket/get-tickets')

// post Add to Cart
export const ADDTOCART = (cartData, header) => API.post('/auth/add-cart', cartData, header)

// fetch cart item of user
export const FETCHCART = (id, header) => API.get("/auth/cart/" + id, header)

// delete cart item
export const DELCART = (id, header) => API.delete("/auth/cart/delete/" + id, header)

// update Cart item quantity
export const UPDATECART = (id, qty, header) => API.get("/auth/cart/qt_update/" + id + "/" + qty, header)

// user balance
export const WALLETBALANCE = (header) => API.get("/auth/account/wallet/balance", header)

// init transaction
export const PAYINIT = (paymentData, header) => API.post("/auth/pay/init", paymentData, header)

// get all transaction
export const GETALLTRANSACTION = (header) => API.get("/auth/get/transaction", header)

// update transaction
export const UPDATETRANSACTION = (header) => API.get("/auth/update/transaction", header)

// place order
export const PLACEORDER = (orderData, header) => API.post("/auth/order", orderData, header)

// buy now
export const BUYNOW = (orderData, header) => API.post("/auth/order/buy/now", orderData, header)

// update profile
export const UPDATEPROFILE = (formData, header) => API.post("/auth/update/profile", formData, header)

// update profile
export const ORDERHISTORY = (header) => API.get("/auth/order/history", header)

// contact us
export const CONTACTUS = (formData) => API.post("/auth/contact", formData)