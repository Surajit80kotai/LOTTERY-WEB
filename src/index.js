import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './USER/pages/SignUp';
import Login from './USER/pages/Login';
import ForgetPassword from './USER/pages/ForgetPassword';
import { Store } from './USER/services/store/Store';
import VerifyPhone from './USER/pages/VerifyPhone';
import { Flip, ToastContainer } from 'react-toastify';
import ProtectedRoute from './USER/privateroute/ProtectedRoute';
// import OrderSuccess from './USER/pages/OrderSuccess';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <Router>
      <Routes>
        <Route path='*' element={
          <App />
        } />
        <Route path='/verifyphone' element={<VerifyPhone />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route path='/login' element={<Login text="/" />} />
        <Route path='/f_password' element={<ForgetPassword />} />
        {/* <Route path='/ordersuccess' element={<OrderSuccess />} /> */}
      </Routes>
    </Router>
    <ToastContainer style={{ "fontSize": "16px" }} transition={Flip} position="top-center" autoClose={3000} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
