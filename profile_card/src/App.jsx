import React from 'react';
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './Pages/Profile/Profile'
// import Toggle_form from './Pages/Login/Toggle_form';
import Home from './Pages/Home/Home';
import Kid from './Pages/Clothes/Kid/Kid';
import Login from './Pages/Login/Login';
import Cart from './Pages/Cart/Cart';
import { Provider } from 'react-redux';
import store from './Store/store';

function App() {
  

  return (
    <Provider store= {store}>
       <Router>
          <div>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Home />} />
              
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path= '/category/kids' element={<Kid />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </div>
        </Router>
      </Provider>
  )
}

export default App
