import React, { FC } from 'react';
import logo from './logo.svg';
// import './App.css';
import LoginForm from './Auth/SignUp/Login';
import Nav from './Component/Header/Nav';
import HomePage from './Component/Home/Home';
import Blogs from './Component/blogs/Blogs';
import Card from './Component/Home/Card/Card';
import About from './Component/About/About';
import { Route, Routes } from 'react-router-dom';
import { ServiceContent } from './Service/ServiceContent';
import RegistrationForm from './Auth/Login/SignUp';
import ResetPasswordForm from './Auth/ResetPassword/ResetPass';
import CalendarForm from './Component/Calendar/Calendar';
import FormCalendar from './Component/Calendar/FormmCalendar';
import FrameTimeForm from './Component/Calendar/AddFrameTime/AddframeTime';
import EditUserForm from './Service/EditUser/Edit';
import AddUserForm from './Service/AddUser/AddUser';
import { AuthWrapper } from './AuthWrapper';
import ForgotPassword from './Auth/ForgotPassWord/ForgotPassWord';
import { GlobalProvider } from './GlobalContext/GlobalContext';
import UserInfo from './Component/About/About';
import { Addproblem } from './Component/About/Addproblem/Addproblem';
import ItemRepair from './Component/About/ItemRepart/ItemRepair';
import AddItemRepair from './Component/About/AddItemRepair/AddItemRepair';
const App: FC = () => {
  return (
    <GlobalProvider>

      <div className="App">
        <header className="App-header">
          <Nav />
        </header >
        <Routes>
          <Route path="/" element={<AuthWrapper>{<HomePage />}</AuthWrapper>} />
          <Route path="/services" element={<AuthWrapper>{<ServiceContent />}</AuthWrapper>} />
          <Route path="/customer" element={<AuthWrapper>{<Blogs />}</AuthWrapper>} />
          <Route path="/cards" element={<AuthWrapper>{<FormCalendar />}</AuthWrapper>} />
          <Route path="/about" element={<AuthWrapper>{<UserInfo />}</AuthWrapper>} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/SignUp' element={<RegistrationForm />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPasswordForm />} />
          <Route path='/frame-time/create' element={<AuthWrapper>{<FrameTimeForm />}</AuthWrapper>} />
          <Route path='/service/add-staff' element={<AuthWrapper>{<AddUserForm />}</AuthWrapper>} />
          <Route path='/service/Edit-staff' element={<AuthWrapper>{<EditUserForm />}</AuthWrapper>} />
          <Route path='/about/create-problems' element={<AuthWrapper>{<Addproblem />}</AuthWrapper>} />
          <Route path='/about/item-repair' element={<AuthWrapper>{<ItemRepair />}</AuthWrapper>} />
          <Route path='/about/item-repair/Add-item' element={<AuthWrapper>{<AddItemRepair />}</AuthWrapper>} />
        </Routes>
        {/* <div style={{ color: "black", fontSize: '50px' }}>Zoe Check</div> */}

      </div>
    </GlobalProvider>

  );
}

export default App;
