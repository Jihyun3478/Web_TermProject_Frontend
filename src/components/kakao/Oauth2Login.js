import React from 'react';

const Oauth2Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Kakao</button>
    </div>
  );
};

export default Oauth2Login;