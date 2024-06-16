import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/member/SignUp.js';
import SignIn from './components/member/SignIn.js';
import MemberInfo from './components/MemberInfo';
import MasterClubListInfo from './components/master/MasterClubListInfo.js';
import NotApplyClubList from './components/club/NotApplyClubList.js';
import Oauth2Login from './components/kakao/Oauth2Login.js';
import LoginSuccess from './components/kakao/LoginSuccess.js';
import RegisterApplyClub from "./components/applyClub/RegisterApplyClub.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/memberInfo" element={<MemberInfo />} />
          <Route path="/applyClub/create" element={<RegisterApplyClub />} />

          <Route path="/master/clubList" element={<MasterClubListInfo />} />
          <Route path="/notApplyClubList" element={<NotApplyClubList />} />

          <Route path="/kakaoOauth2Login" element={<Oauth2Login />} />
          <Route path="/LoginSuccess" element={<LoginSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}
  
  export default App;