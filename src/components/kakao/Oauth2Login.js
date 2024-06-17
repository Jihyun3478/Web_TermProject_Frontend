import React from 'react';
import styled from "styled-components";

const KakaoButton = styled.button`
  background-color: #fee500;
  color: #3c1e1e;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 추가 */
  cursor: pointer;
  width: 100%; /* 버튼 너비를 부모 요소에 맞춤 */

  &:hover {
    background-color: #ffd700;
  }
`;

const KakaoLogo = styled.img`
  width: 40px; /* 로고 크기 키우기 */
  height: 40px; /* 로고 크기 키우기 */
  margin-right: 10px;
`;

const Oauth2Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <KakaoButton onClick={handleLogin}>
      <KakaoLogo
        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
        alt="Kakao Logo"
      />
      Login with Kakao
    </KakaoButton>
  );
};

export default Oauth2Login;
