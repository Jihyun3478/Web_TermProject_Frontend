import React, { useState, useEffect } from "react";
import { getApplyClubList } from "../../api/member/MemberApi.js";
import "bootstrap/dist/css/bootstrap.min.css";

const MyApplyClubList = () => {
  const [applyClubList, setApplyClubList] = useState([]);

  useEffect(() => {
    const fetchApplyClubList = async () => {
      try {
        const response = await getApplyClubList();
        setApplyClubList(response.data.data);
      } catch (error) {
        console.error("동아리 신청 목록 가져오기 실패:", error);
      }
    };

    fetchApplyClubList();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">동아리 신청 목록</h3>
      {applyClubList.length > 0 ? (
        <div className="row">
          {applyClubList.map((club) => (
            <div key={club.applyClubId} className="col-md-6 mb-4">
              {" "}
              {/* col-md-6으로 변경 */}
              <div className="card h-100" style={{ minHeight: "160px" }}>
                {" "}
                {/* 카드 높이 조정 */}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "1.5rem" }}>
                    동아리 이름 : {club.clubName}
                  </h5>
                  <h6
                    className="card-subtitle mb-2 text-muted"
                    style={{ fontSize: "1.2rem" }}
                  >
                    동아리 종류 : {club.clubType}
                  </h6>
                  <p className="card-text">
                    동아리 신청 현황 : {club.applyClubStatus}
                  </p>
                  {club.refuseReason && (
                    <p className="card-text text-danger">
                      <strong>거절 사유 : </strong> {club.refuseReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          신청한 동아리가 없습니다.
        </div>
      )}
    </div>
  );
};

export default MyApplyClubList;
