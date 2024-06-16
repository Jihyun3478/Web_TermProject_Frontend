// src/components/member/MyApplyClubList.js

import React, { useState, useEffect } from "react";
import { getApplyClubList } from "../../api/member/MemberApi.js";

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
    <div>
      <h3>동아리 신청 목록</h3>
      {applyClubList.length > 0 ? (
        <ul>
          {applyClubList.map((club) => (
            <li key={club.applyClubId}>
              {club.clubName} ({club.clubType}) - {club.applyClubStatus}
            </li>
          ))}
        </ul>
      ) : (
        <p>신청한 동아리가 없습니다.</p>
      )}
    </div>
  );
};

export default MyApplyClubList;
