import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

// login api function
export const LOGIN = (loginData) => API.post('/auth/login', loginData)

// signup api function
export const SIGNUP = (signupData) => API.post('/auth/signup', signupData)

// agentsignup api function
export const AGENTSIGNUP = (signupData) => API.post('/auth/agent/signup', signupData)

// forgetpassword api function
export const FORGETPASSWORD = (formValue) => API.post('/auth/forget', formValue)

// forgetpassword api function
export const FORGETPASSWORDOTP = (phone) => API.post('/system/forget/password/otp', phone)

// set new password
export const SETNEWPASSWORD = (data) => API.post('/system/set/password', data)

// country & state api function
export const COUNTRY = (header) => API.get('/countries', header)
export const STATE = (id, header) => API.get('/state/' + id, header)
export const PHONECODE = (header) => API.get('/phone/code', header)

// get Category api function
export const CATEGORY = (header) => API.get('/admin/get-category', header)

// get ticket api Function
export const TICKET = (header) => API.get('/ticket/get-tickets', header)

// post Add to Cart
export const ADDTOCART = (cartData, header) => API.post('/auth/add-cart', cartData, header)

// fetch cart item of user
export const FETCHCART = (id, header) => API.get("/auth/cart/" + id, header)

// delete cart item
export const DELCART = (id, header) => API.delete("/auth/cart/delete/" + id, header)

// update Cart item quantity
export const UPDATECART = (id, qty, flag, header) => API.get("/auth/cart/qt_update/" + id + "/" + qty + "/" + flag, header)

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
export const CONTACTUS = (formData, header) => API.post("/auth/contact", formData, header)

// get otp api
export const GETOTP = (phone, header) => API.post("/system/register/otp", phone, header)

// verify otp api
export const VERIFYOTP = (formData, header) => API.post("/system/register/otp/verify", formData, header)

// Paypal api
export const PAYPAL = (amount) => API.post("/my-server/create-paypal-order/" + amount)


// test API
export const TESTAPI = () => API.get("http://localhost:3000/phonecode.json")