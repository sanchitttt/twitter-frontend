import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Top from './Components/Top/index';
import Bottom from './Components/Bottom';
import HomePage from './Pages/Home';
import NotLoggedIn from './Pages/NotLoggedIn';
import LoginPage from './Pages/Login';
import SuccessfullLogin from '../AppDesktop/Components/NotLoggedIn/SuccessfulLogin';



function AppMobile() {
  return (
    <div>

      {/* <Routes> */}
      {/* <Route path='/' element={} /> */}
      {/* </Routes> */}
      <Routes>
        <Route path='/' element={<NotLoggedIn />} />
        <Route path='/login/success' element={<SuccessfullLogin />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>


    </div>
  )
}

export default AppMobile