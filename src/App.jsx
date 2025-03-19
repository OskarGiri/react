
import{
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Homepage from './pages/home/Homepage';
import Nopage from './pages/nopage/Nopage';
import ProductInfo from './pages/productinfo/productinfo';
import ScrollTop from './components/scrollTop/ScrollTop';
import AllRoom from './pages/Allroom/AllRoom';
import SignUp from './pages/Registration/SignUp';
import Login from './pages/Registration/Login';
import UserDashboard from './pages/User/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddRoomRentPage from './components/admin/AddRoomRentPage';
import UpdateProduct from './components/admin/Upadateproduct';
import RoomRentDetail from './components/admin/RoomRentDetail';
const App = () => {
  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Nopage />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route path = "/Allroom" element = {<AllRoom/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="home" element={<Homepage/>} />

        <Route path = "/user-dashboard" element = {<UserDashboard/>} />
        <Route path= "/admin-dashboard" element = {<AdminDashboard/>} />
        <Route path = "/addroom" element = {<AddRoomRentPage/>} />
        <Route path="/updateproduct" element = {<UpdateProduct/>} />
        
      </Routes>
    </Router>
  );
}



export default App;