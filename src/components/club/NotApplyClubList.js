import React, { useState, useEffect } from 'react';
import {
  fetchClubs,
  downloadTemplate,
  uploadFile,
} from "../../api/applyMember/ApplyMemberApi.js";

const NotApplyClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getClubs = async () => {
      try {
        const data = await fetchClubs(token);
        setClubs(data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    getClubs();
  }, []);

  const handleClubClick = (id) => {
    setSelectedClubId((prevId) => (prevId === id ? null : id));
  };

  const handleDownloadTemplate = async () => {
    try {
      await downloadTemplate();
    } catch (error) {
      alert("신청서 양식을 다운로드하는 중 오류가 발생했습니다.");
    }
  };

  const handleFileUpload = async (e, clubId) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");

    try {
      const response = await uploadFile(file, clubId, token);

      if (response.status === 200) {
        alert("파일이 성공적으로 업로드되었습니다.");
      } else {
        throw new Error("파일 업로드 실패");
      }
    } catch (error) {
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="centered-heading">Club List</h1>
      <button className="btn btn-primary mb-3" onClick={handleDownloadTemplate}>
        동아리 가입 신청서 양식 다운로드
      </button>
      <div>
        {clubs.map((club) => (
          <div key={club.id} className="mb-3">
            <h2
              onClick={() => handleClubClick(club.id)}
              style={{ cursor: "pointer" }}
            >
              {club.name}
            </h2>
            {club.imageRoute && (
              <img
                src={club.imageRoute}
                alt={club.name}
                className="img-thumbnail"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
            {selectedClubId === club.id && (
              <div className="mt-3">
                <h2>Club Details</h2>
                <p>
                  <strong>Club Type:</strong> {club.clubType}
                </p>
                <p>
                  <strong>Name:</strong> {club.name}
                </p>
                <p>
                  <strong>Introduce:</strong> {club.introduce}
                </p>
                <p>
                  <strong>History:</strong> {club.history}
                </p>
                <p>
                  <strong>Meeting Time:</strong>{" "}
                  {new Date(club.meetingTime).toLocaleString()}
                </p>
                <p>
                  <strong>President:</strong> {club.president}
                </p>
                <p>
                  <strong>Vice President:</strong> {club.vicePresident}
                </p>
                <p>
                  <strong>General Affairs:</strong> {club.generalAffairs}
                </p>
                <h3>Professor</h3>
                <p>
                  <strong>Name:</strong> {club.professor.name}
                </p>
                <p>
                  <strong>Major:</strong> {club.professor.major}
                </p>
                <p>
                  <strong>Phone Number:</strong> {club.professor.phoneNum}
                </p>
                <p>
                  <strong>Email:</strong> {club.professor.email}
                </p>
                <h3>Master Member</h3>
                <p>
                  <strong>Name:</strong> {club.masterMember.name}
                </p>
                <p>
                  <strong>Student Number:</strong> {club.masterMember.stuNum}
                </p>
                <p>
                  <strong>Major:</strong> {club.masterMember.major}
                </p>
                <p>
                  <strong>Phone Number:</strong> {club.masterMember.phoneNum}
                </p>
                <p>
                  <strong>Email:</strong> {club.masterMember.email}
                </p>
                <p>
                  <strong>Gender:</strong> {club.masterMember.gender}
                </p>
                <p>
                  <strong>Birth Date:</strong> {club.masterMember.birthDate}
                </p>
                <label htmlFor="fileInput" className="btn btn-primary">
                  가입 신청
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".hwp"
                  onChange={(e) => handleFileUpload(e, club.id)}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotApplyClubList;
