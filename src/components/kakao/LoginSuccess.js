import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      sessionStorage.setItem("token", token);
      navigate("/"); 
    }
  }, [location]);

  return (
    <div>
      <h1>Login Success</h1>
      <p>로그인에 성공했습니다!</p>
    </div>
  );
};

export default LoginSuccess;