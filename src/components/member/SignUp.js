import React, { useState } from 'react';
import { signUp } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import Oauth2Login from '../kakao/Oauth2Login.js';

const SignUp = () => {
  const [formData, setFormData] = useState({
    loginId: "",
    loginPw: "",
    name: "",
    stuNum: "",
    major: "",
    phoneNum: "",
    email: "",
    gender: "",
    birthDate: "",
  });
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
      await signUp(formData);
      alert("회원가입 성공");
      navigate("/signIn");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h2 className="centered-heading">회원가입</h2>
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
        <div className="mb-3">
          <label className="form-label">이름:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">학번:</label>
          <input
            type="text"
            name="stuNum"
            value={formData.stuNum}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">전공:</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">전화번호:</label>
          <input
            type="text"
            name="phoneNum"
            value={formData.phoneNum}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">이메일:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">성별:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">선택</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">생년월일:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          회원가입
        </button>
      </form>
      <Oauth2Login />
    </div>
  );
};

export default SignUp;
