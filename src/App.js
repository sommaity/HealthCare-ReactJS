import './App.css';

import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';

import Registration from './pages/registration';
import Login from './pages/login';
import InventoryItems from './pages/InventoryItems';
import CreateOrder from './pages/createOrder';
import OrderStatus from './pages/orderStatus';
import Logout from './pages/logout';
import Home from './pages/home';
//import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/registration' element={<Registration/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/items' element={<InventoryItems/>} />
        <Route path='/createOrder' element={<CreateOrder/>} />
        <Route path='/order' element={<OrderStatus/>} />
        <Route path='/logOut' element={<Logout/>} />

      </Routes>
    </Router>
   
  );
}

export default App;
