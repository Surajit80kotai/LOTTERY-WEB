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


function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/howtoplay' element={<HowToPlay />} />
        <Route path='/charities' element={<Charities />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/info/:lid/:round' element={<LotteryInfo />} />
        {/* <Route path='/viewallhome' element={<ViewAllHome />} />
            <Route path='/viewallcars' element={<ViewAllCars />} />
            <Route path='/viewallstud_trv' element={<ViewAllStudyTravel />} />
            <Route path='/viewallcomp_phn' element={<ViewAllCompPhn />} />
            <Route path='/viewallcosmetics' element={<ViewAllCosmetics />} /> */}
        <Route path='/viewall/:categoryID' element={<ViewAll />} />

        {/* Private Route Part */}
        <Route element={<PrivateRoute />}>
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/wallet/:dueAmount' element={<Wallet />} />
          <Route path='/orderhistory' element={<OrderHistory />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/ordersuccess' element={<OrderSuccess />} />
        </Route>
      </Routes>
      <FooterMain />
    </div>
  );
}

export default App;
