import React, { useState, useEffect } from 'react';
import { fetchUserInfo } from './api/board/BoardApi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/member/SignUp';
import SignIn from './components/member/SignIn';
import MyApplyClubList from './components/member/MyApplyClubList';
import MyPage from './components/member/MyPage';
import MasterClubListInfo from './components/master/MasterClubListInfo';
import NotApplyClubList from './components/club/NotApplyClubList';
import AllClubList from './components/club/AllClubList';
import Oauth2Login from './components/kakao/Oauth2Login';
import LoginSuccess from './components/kakao/LoginSuccess';
import RegisterApplyClub from './components/applyClub/RegisterApplyClub';
import ApplyClubList from './components/admin/ApplyClubList';
import ApplyClubDetail from './components/admin/ApplyClubDetail';
import './App.css';
import PostManagement from './components/board/PostManagement';
import MainDashboard from './components/MainDashboard';
import NoticeClubBoard from './components/board/NoticeClubBoard';
import RecruitMemberBoard from './components/board/RecruitMemberBoard';
import ActivityVideoBoard from './components/board/ActivityVideoBoard';
import ActivityPhotoBoard from './components/board/ActivityPhotoBoard';
import PostNoticeClub from './components/board/PostNoticeClub'; // PostNoticeClub 컴포넌트 import
import { AuthProvider } from './AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // 실제 사용자의 로그인 상태와 역할을 확인하는 로직 (예: API 호출)
    const checkUserStatus = async () => {
      try {
        // API 호출 또는 다른 방식으로 사용자 정보 가져오기
        const userInfo = await fetchUserInfo(); // fetchUserInfo 함수 구현 필요
        setIsLoggedIn(userInfo.isLoggedIn);
        setUserRole(userInfo.role);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    checkUserStatus();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/posts/noticeClub" element={<NoticeClubBoard isLoggedIn={isLoggedIn} userRole={userRole} />} />
          <Route path="/posts/recruitMember" element={<RecruitMemberBoard />} />
          <Route path="/posts/activityVideo" element={<ActivityVideoBoard />} />
          <Route path="/posts/activityPhoto" element={<ActivityPhotoBoard />} />
          <Route path="/master/postManagement" element={<PostManagement />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/applyClubList" element={<MyApplyClubList />} />
          <Route path="/admin" element={<ApplyClubList />} />
          <Route path="/admin/list/:applyClubId" element={<ApplyClubDetail />} />
          <Route path="/kakaoOauth2Login" element={<Oauth2Login />} />
          <Route path="/loginSuccess" element={<LoginSuccess />} />
          <Route path="/applyClub/create" element={<RegisterApplyClub />} />
          <Route path="/master/clubList" element={<MasterClubListInfo />} />
          <Route path="/notApplyClubList" element={<NotApplyClubList />} />
          <Route path="/allClubList" element={<AllClubList />} />
          <Route path="/post-notice-club" element={<PostNoticeClub isLoggedIn={isLoggedIn} userRole={userRole} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;