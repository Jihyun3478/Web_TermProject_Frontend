import React, { useEffect, useState } from "react";
import { getMemberInfo } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

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

  if (id === null) {
    return <div>Loading...</div>;
  }

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
    <div>
      <h2>사용자 정보</h2>
      <p>사용자 고유 ID: {id}</p>
      <button onClick={handleButtonClickMasterClubList}>
        마스터 클럽 보기
      </button>
      <button onClick={handleButtonClickNotApplyClubList}>
        클럽 목록 보기
      </button>
      <button onClick={handleButtonClickMyApplyClubList}>
        동아리 신청 목록 보기
      </button>
    </div>
  );
};

export default MemberInfo;
