import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/member/SignUp";
import SignIn from "./components/member/SignIn";
import MemberInfo from "./components/MemberInfo";
import MasterClubListInfo from "./components/master/MasterClubListInfo";
import NotApplyClubList from "./components/club/NotApplyClubList";
import Oauth2Login from "./components/kakao/Oauth2Login";
import LoginSuccess from "./components/kakao/LoginSuccess";
import RegisterApplyClub from "./components/applyClub/RegisterApplyClub";
import ApplyClubList from "./components/admin/ApplyClubList";
import ApplyClubDetail from "./components/admin/ApplyClubDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/memberInfo" element={<MemberInfo />} />
        <Route path="/admin" element={<ApplyClubList />} />
        <Route path="/admin/list/:applyClubId" element={<ApplyClubDetail />} />

        <Route path="/kakaoOauth2Login" element={<Oauth2Login />} />
        <Route path="/loginSuccess" element={<LoginSuccess />} />

        <Route path="/applyClub/create" element={<RegisterApplyClub />} />
        <Route path="/master/clubList" element={<MasterClubListInfo />} />
        <Route path="/notApplyClubList" element={<NotApplyClubList />} />
      </Routes>
    </Router>
  );
}

export default App;
