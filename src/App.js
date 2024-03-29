import { Routes, Route } from 'react-router-dom'
import Home from './USER/pages/Home';
import NavBar from './USER/components/common/navigationBar/NavBar';
import FooterMain from './USER/components/common/footer/FooterMain';
import LotteryInfo from './USER/pages/LotteryInfo';
import PrivateRoute from './USER/privateroute/PrivateRoute';
import Cart from './USER/pages/Cart';
import PlaceOrder from './USER/pages/PlaceOrder';
import Contact from './USER/pages/Contact';
import AboutUs from './USER/pages/AboutUs';
import HowToPlay from './USER/pages/HowToPlay';
import Charities from './USER/pages/Charities';
import OrderSuccess from './USER/pages/OrderSuccess';
import 'react-toastify/dist/ReactToastify.css';
import ViewAll from './USER/components/core/viewAllLottery/ViewAll';
import MyProfile from './USER/components/core/profile/MyProfile';
import Wallet from './USER/components/core/profile/Wallet';
import OrderHistory from './USER/components/core/profile/OrderHistory';
import { useSelector } from 'react-redux';
import ErrorPage from './USER/util/ErrorPage';
import PrivacyPolicy from './USER/pages/PrivacyPolicy';
import SignUpSuccessPage from './USER/pages/agents/SignUpSuccessPage';
import LiveChat from './USER/util/LiveChat';
import CookiesPolicy from './USER/util/CookiesPolicy';
import TermsAndConditions from './USER/pages/TermsAndConditions';
import CookiePolicy from './USER/pages/CookiePolicy';
import HowToDeposit from './USER/pages/HowToDeposit';
import BettingRule from './USER/pages/BettingRule';
import HowToRegister from './USER/pages/HowToRegister';
import WorkWithUs from './USER/pages/WorkWithUs';
// import TestOne from './USER/pages/test/TestOne';


function App() {

  const { net_error } = useSelector((state) => state.lotteryslice)
  const { error } = useSelector((state) => state.cartslice)

  return (
    <>
      {
        net_error !== undefined || error !== undefined ?
          <div>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} exact />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/howtoplay' element={<HowToPlay />} />
              <Route path='/charities' element={<Charities />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/info/:lid/:round' element={<LotteryInfo />} />
              <Route path='/viewall/:categoryID' element={<ViewAll />} />
              <Route path='/privacypolicy' element={<PrivacyPolicy />} />
              <Route path='/terms_condition' element={<TermsAndConditions />} />
              <Route path='/cookiepolicy' element={<CookiePolicy />} />
              <Route path='/howtodeposit' element={<HowToDeposit />} />
              <Route path='/bettingrule' element={<BettingRule />} />
              <Route path='/howtoregister' element={<HowToRegister />} />
              <Route path='/workwithus' element={<WorkWithUs />} />
              <Route path='/agentsignupsuccess' element={<SignUpSuccessPage />} />
              {/* Test Route */}
              {/* <Route path='/test' element={<TestOne />} /> */}

              {/* Private Route Part */}
              <Route element={<PrivateRoute />}>
                <Route path='/profile' element={<MyProfile />} />
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/wallet/:dueAmount' element={<Wallet />} />
                <Route path='/orderhistory' element={<OrderHistory />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/placeorder' element={<PlaceOrder />} />
                <Route path='/ordersuccess' element={<OrderSuccess />} />
              </Route>
            </Routes>
            <LiveChat />
            <CookiesPolicy />
            <FooterMain />
          </div>
          : <ErrorPage />
      }
    </>

  );
}

export default App;
