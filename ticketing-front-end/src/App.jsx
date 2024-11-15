import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//import pages:
import Home from './pages/Home/Home'
import MyProfile from './pages/MyProfile/MyProfile'
import CreateTicket from './pages/CreateTicket/CreateTicket'
import TicketPage from './pages/Ticket/TicketPage';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/loginPage';
import TicketDetails from './pages/TicketDetails/TicketDetails';
import FilteredPage from './pages/FilteredPage/FilteredPage';
//import components

import ProtectedRoute from './components/protectedRoute/protectedRoute';


function App() {
  //userId




  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-ticket' element={<CreateTicket />} />
      <Route path='/ticket-page' element={<TicketPage />} />
      <Route path='/myprofile' element={<MyProfile />} />

      <Route path='/sign-up-local' element={<SignUpPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path="/ticket/:ticketId" element={<TicketDetails />} />

      <Route path="/filter" element={<FilteredPage />} />






    </Routes>

  )
}

export default App

