import React, { useState, useContext } from "react";
import { signIn } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import Oauth2Login from "../kakao/Oauth2Login.js";
import { AuthContext } from "../../AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    loginId: "",
    loginPw: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      login(response.data.accessToken); // 로그인 상태 업데이트
      alert("로그인 성공");
      navigate("/"); // 로그인 성공 후 홈 페이지로 이동
    } catch (error) {
      alert("로그인 실패");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h2 className="centered-heading">로그인</h2>
        <div className="mb-3">
          <label className="form-label">로그인 아이디:</label>
          <input
            type="text"
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">비밀번호:</label>
          <input
            type="password"
            name="loginPw"
            value={formData.loginPw}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          로그인
        </button>
      </form>
      <Oauth2Login />
    </div>
  );
};

export default SignIn;
