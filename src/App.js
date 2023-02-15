import { Routes, Route } from 'react-router-dom'
import Home from './USER/pages/Home';
import NavBar from './USER/components/common/navigationBar/NavBar';
import FooterMain from './USER/components/common/footer/FooterMain';
import LotteryInfo from './USER/pages/LotteryInfo';
import ViewAllHome from './USER/components/core/viewAllLottery/ViewAllHome';
import ViewAllCars from './USER/components/core/viewAllLottery/ViewAllCars';
import PrivateRoute from './USER/privateroute/PrivateRoute';
import Profile from './USER/pages/Profile';
import Cart from './USER/pages/Cart';
import PlaceOrder from './USER/pages/PlaceOrder';
import Contact from './USER/pages/Contact';
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ViewAllStudyTravel from './USER/components/core/viewAllLottery/ViewAllStudyTravel';
import ViewAllCompPhn from './USER/components/core/viewAllLottery/ViewAllCompPhn';
import ViewAllCosmetics from './USER/components/core/viewAllLottery/ViewAllCosmetics';
import AboutUs from './USER/pages/AboutUs';
import HowToPlay from './USER/pages/HowToPlay';
import Charities from './USER/pages/Charities';
// import PreLoader from './USER/components/core/preloader/PreLoader';
// import TestFive from './USER/pages/test/TestFive';


function App() {
  return (
    <div>
      {/* <PreLoader /> */}
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/howtoplay' element={<HowToPlay />} />
        <Route path='/charities' element={<Charities />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/info/:lid' element={<LotteryInfo />} />
        <Route path='/viewallhome' element={<ViewAllHome />} />
        <Route path='/viewallcars' element={<ViewAllCars />} />
        <Route path='/viewallstud_trv' element={<ViewAllStudyTravel />} />
        <Route path='/viewallcomp_phn' element={<ViewAllCompPhn />} />
        <Route path='/viewallcosmetics' element={<ViewAllCosmetics />} />
        {/* <Route path='/test' element={<TestFive />} /> */}
        {/* Private Route Part */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:dueAmount' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Route>
      </Routes>
      <FooterMain />
      <ToastContainer style={{ "fontSize": "16px" }} transition={Flip} position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
