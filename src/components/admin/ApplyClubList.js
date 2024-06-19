import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { fetchApplyClubList } from "../../api/admin/AdminApi";
import ApplyClubDetail from "./ApplyClubDetail";

const ApplyClubList = () => {
  const [applyClubList, setApplyClubList] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이트 기능 추가

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetchApplyClubList(token)
      .then((data) => {
        setApplyClubList(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setError("접근 권한이 없습니다.");
        } else {
          setError("동아리 신청 목록을 불러오는 중 오류가 발생했습니다.");
          console.error(error);
        }
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          이전
        </button>
        <h2 className="text-center flex-grow-1">
          관리자 페이지 - 동아리 신청 관리
        </h2>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {notification && (
        <div className="alert alert-success mt-3">{notification}</div>
      )}
      <div className="row mt-4">
        <div className="col">
          <h3>동아리 신청 목록</h3>
          <ul className="list-group">
            {applyClubList.map((applyClub) => (
              <li
                key={applyClub.applyClubId}
                className="list-group-item"
                style={{ cursor: "pointer" }}
              >
                <Link to={`/admin/list/${applyClub.applyClubId}`}>
                  {applyClub.clubName} - {applyClub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Routes>
        <Route
          path="/admin/list/:applyClubId"
          element={<ApplyClubDetail onClose={() => setNotification(null)} />}
        />
      </Routes>
    </div>
  );
};

export default ApplyClubList;
