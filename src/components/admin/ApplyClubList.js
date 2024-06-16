import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchApplyClubList } from "../../api/admin/AdminApi";
import ApplyClubDetail from "./ApplyClubDetail";

const ApplyClubList = () => {
  const [applyClubList, setApplyClubList] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchApplyClubList(token)
      .then((data) => {
        setApplyClubList(data);
      })
      .catch((error) => {
        setError("동아리 신청 목록을 불러오는 중 오류가 발생했습니다.");
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">관리자 페이지 - 동아리 신청 관리</h2>
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
                {/* Link 컴포넌트를 사용하여 동적 링크 설정 */}
                <Link to={`/admin/list/${applyClub.applyClubId}`}>
                  {applyClub.clubName} - {applyClub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Routes와 Route를 사용하여 ApplyClubDetail 컴포넌트와 URL 경로를 연결 */}
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
