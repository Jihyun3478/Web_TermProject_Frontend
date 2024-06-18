import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplyClub } from "../../api/applyClub/ApplyClubApi.js";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterApplyClub = () => {
  const navigate = useNavigate();
  const departments = [
    "건축학부",
    "경영학과",
    "고분자공학과",
    "광시스템공학과",
    "기계공학과",
    "기계시스템공학부",
    "기계시스템공학부 스마트모빌리티전공",
    "메디컬IT융합공학과",
    "산업공학과",
    "소재디자인공학과",
    "수리빅데이터학과",
    "신소재공학부",
    "전자공학부",
    "인공지능공학과",
    "컴퓨터공학과",
    "컴퓨터소프트웨어공학과",
    "토목공학과",
    "화학생명과학과",
    "화학공학과",
    "환경공학과",
    "IT융합학과",
  ];

  const clubTypes = ["중앙동아리", "학과동아리"];

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

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return phoneNumber;
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phoneNum" || name === "pPhoneNum") {
      value = formatPhoneNumber(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    try {
      const data = await createApplyClub(formData, token);
      setResponse("동아리 등록 신청이 완료되었습니다.");
      setError(null); // Clear error if the request was successful
    } catch (error) {
      setError("Error creating apply club");
      setResponse(null); // Clear response if there was an error
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col text-start">
          <button
            onClick={() => navigate("/allClubList")}
            className="btn btn-secondary"
          >
            이전
          </button>
        </div>
        <div className="col text-end">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            신청
          </button>
        </div>
      </div>
      <form>
        <h2 className="text-center">동아리 등록 신청</h2>
        <div className="mb-3">
          <label className="form-label">동아리 타입:</label>
          <select
            name="clubType"
            value={formData.clubType}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">선택하세요</option>
            {clubTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
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
          <select
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">선택하세요</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
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
          <select
            name="pMajor"
            value={formData.pMajor}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">선택하세요</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
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
      </form>
      {response && <div className="alert alert-success mt-3">{response}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default RegisterApplyClub;
