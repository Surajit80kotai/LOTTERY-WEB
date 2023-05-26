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
import AgentsAndInfluencersSignup from './USER/pages/agents/AgentsAndInfluencersSignup';
import AgentsAndInfluencersLogin from './USER/pages/agents/AgentsAndInfluencersLogin';
import './i18n';
import AgentsAndInfluencersForgetPassword from './USER/pages/agents/AgentsAndInfluencersForgetPassword';
import LiveChatForAndroid from './USER/util/LiveChatForAndroid';

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
        <Route path='/agentSignup/:type' element={<AgentsAndInfluencersSignup />} />
        <Route path='/agentLogin' element={<AgentsAndInfluencersLogin />} />
        <Route path='/login' element={<Login text="/" />} />
        <Route path='/f_password' element={<ForgetPassword />} />
        <Route path='/ag_in_f_password' element={<AgentsAndInfluencersForgetPassword />} />
        {/* <Route path='/ordersuccess' element={<OrderSuccess />} /> */}
        <Route path='/livechat' element={<LiveChatForAndroid />} />
      </Routes>
    </Router>
    <ToastContainer style={{ "fontSize": "15px" }} transition={Flip} position="top-center" />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
