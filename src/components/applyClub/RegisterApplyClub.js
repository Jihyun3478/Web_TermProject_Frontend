import React, { useState } from "react";
import { createApplyClub } from "../../api/applyClub/ApplyClubApi.js";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterApplyClub = () => {
  const [formData, setFormData] = useState({
    clubType: "",
    clubName: "",
    name: "",
    major: "",
    stuNum: "",
    phoneNum: "",
    pName: "",
    pMajor: "",
    pPhoneNum: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const data = await createApplyClub(formData, token);
      setResponse(data);
    } catch (error) {
      setError("Error creating apply club");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">동아리 등록 신청</h2>
        <div className="mb-3">
          <label className="form-label">동아리 타입:</label>
          <input
            type="text"
            name="clubType"
            value={formData.clubType}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">동아리 이름:</label>
          <input
            type="text"
            name="clubName"
            value={formData.clubName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">회원 이름:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">회원 전공:</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">회원 학번:</label>
          <input
            type="text"
            name="stuNum"
            value={formData.stuNum}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">회원 전화번호:</label>
          <input
            type="text"
            name="phoneNum"
            value={formData.phoneNum}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">교수 이름:</label>
          <input
            type="text"
            name="pName"
            value={formData.pName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">교수 전공:</label>
          <input
            type="text"
            name="pMajor"
            value={formData.pMajor}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">교수 전화번호:</label>
          <input
            type="text"
            name="pPhoneNum"
            value={formData.pPhoneNum}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          신청
        </button>
      </form>
      {response && (
        <div className="alert alert-success mt-3">
          동아리 등록 신청 완료: {JSON.stringify(response)}
        </div>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default RegisterApplyClub;
