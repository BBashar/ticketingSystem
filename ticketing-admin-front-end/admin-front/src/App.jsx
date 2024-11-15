import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'


//import pages:
import Home from './pages/Home/Home';
import AllTickets from './pages/AllTickest/AllTickets';
import LoginPage from './pages/Auth/loginPage';
import SignUpPage from './pages/Auth/SignUpPage';
import NewTickets from './pages/NewTickets/NewTickets';
import AssignedTickets from './pages/AssignedTickets/AssignedTickets';
import TicketDetails from './pages/TicketDetails/TicketDetails';
import CreateTicket from './pages/CreateTicket/CreateTicket';
import MyProfile from './pages/MyProfile/MyProfile';
import UserList from './pages/users/users';
import Dashboard from './pages/Dashboard/dashboard';
function App() {

  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/auth' element={<SignUpPage />} />
      <Route path='/all' element={<AllTickets />} />
      <Route path='/new' element={<NewTickets />} />
      <Route path='/assigned' element={<AssignedTickets />} />
      <Route path="/details/:ticketId" element={<TicketDetails />} />
      <Route path="/create-ticket" element={<CreateTicket />} />
      <Route path="/adminprofile" element={<MyProfile />} />
      <Route path='/users' element={<UserList />} />
      <Route path='/dashboard' element={<Dashboard />} />








    </Routes>
  )
}

export default App
