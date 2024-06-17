import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/member/SignUp";
import SignIn from "./components/member/SignIn";
import MyApplyClubList from "./components/member/MyApplyClubList";
import MemberInfo from "./components/member/MyPage";
import MasterClubListInfo from "./components/master/MasterClubListInfo";
import NotApplyClubList from "./components/club/NotApplyClubList";
import AllClubList from "./components/club/AllClubList";
import Oauth2Login from "./components/kakao/Oauth2Login";
import LoginSuccess from "./components/kakao/LoginSuccess";
import RegisterApplyClub from "./components/applyClub/RegisterApplyClub";
import ApplyClubList from "./components/admin/ApplyClubList";
import ApplyClubDetail from "./components/admin/ApplyClubDetail";
import "./App.css";
import PostManagement from "./api/master/PostManagement";
import MainDashboard from "./components/MainDashboard";
import NoticeClubBoard from "./components/board/NoticeClubBoard";
import RecruitMemberBoard from "./components/board/RecruitMemberBoard";
import ActivityVideoBoard from "./components/board/ActivityVideoBoard";
import ActivityPhotoBoard from "./components/board/ActivityPhotoBoard";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/posts/noticeClub" element={<NoticeClubBoard />} />
          <Route path="/posts/recruitMember" element={<RecruitMemberBoard />} />
          <Route path="/posts/activityVideo" element={<ActivityVideoBoard />} />
          <Route path="/posts/activityPhoto" element={<ActivityPhotoBoard />} />
          <Route path="/master/postManagement" element={<PostManagement />} />
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
          <Route path="/allClubList" element={<AllClubList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
