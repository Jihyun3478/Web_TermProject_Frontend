import React, { useEffect, useState } from "react";
import { getMemberInfo } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MemberInfo = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo();
        setId(response.data.data);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };

    fetchMemberInfo();
  }, []);

  const handleButtonClickMasterClubList = () => {
    navigate("/master/clubList");
  };

  const handleButtonClickNotApplyClubList = () => {
    navigate("/notApplyClubList");
  };

  const handleButtonClickMyApplyClubList = () => {
    navigate("/mypage/applyClubList");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">마이페이지</h2>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mx-2"
          onClick={handleButtonClickMasterClubList}
        >
          마스터 동아리 보기
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={handleButtonClickNotApplyClubList}
        >
          미가입 동아리 목록 보기
        </button>
        <button
          className="btn btn-info mx-2"
          onClick={handleButtonClickMyApplyClubList}
        >
          동아리 신청 목록 보기
        </button>
      </div>
    </div>
  );
};

export default MemberInfo;
