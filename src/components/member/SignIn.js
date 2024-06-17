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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container" style={{ maxWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2 className="centered-heading text-center">로그인</h2>
          <div className="mb-3">
            <label className="form-label">아이디</label>
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              name="loginPw"
              value={formData.loginPw}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            로그인
          </button>
        </form>
        <div className="text-center mt-3">
          <Oauth2Login />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
