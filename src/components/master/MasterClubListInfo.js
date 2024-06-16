import React, { useEffect, useState } from 'react';
import { clublist, updateClubInfo, updateClubImageFileInfo, acceptMember } from '../../api/master/MasterApi';

const MasterClubListInfo = () => {
  const [clubData, setClubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedClubId, setExpandedClubId] = useState(null);
  const [editClub, setEditClub] = useState({});

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await clublist();
        setClubData(response.data);
      } catch (err) {
        setError(new Error('해당 동아리가 존재하지 않습니다'));
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, []);

  const toggleExpand = (id) => {
    setExpandedClubId(expandedClubId === id ? null : id);
  };

  const handleInputChange = (e, clubId) => {
    const { name, value } = e.target;
    setEditClub((prev) => ({
      ...prev,
      [clubId]: {
        ...prev[clubId],
        [name]: value,
      },
    }));
  };

  const handleSave = async (clubId) => {
    const club = editClub[clubId];
    try {
      const response = await updateClubInfo(clubId, club);
      setClubData((prev) =>
        prev.map((item) => (item.id === clubId ? response.data : item))
      );
      alert('클럽 정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('클럽 정보를 업데이트하는 중 오류가 발생했습니다.');
    }
  };

  const handleImageUpload = async (e, clubId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await updateClubImageFileInfo(clubId, formData);
      setClubData((prev) =>
        prev.map((item) => (item.id === clubId ? { ...item, imageRoute: response.url } : item))
      );
      alert('이미지가 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('이미지를 업로드하는 중 오류가 발생했습니다.');
    }
  };

  const handleAccept = async (memberId, clubId) => {
    try {
      await acceptMember(memberId);
      const updatedResponse = await clublist();
      setClubData(updatedResponse.data);
    } catch (error) {
      console.error('Error:', error);
      alert('멤버 승낙 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (memberId, clubId) => {
    try {
      const response = await fetch(`http://localhost:8080/master/club/applyMember/${memberId}?ApplyMemberStatus=NOT_CLUB_MEMBER`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('탈퇴 요청이 실패했습니다.');
      }

      const updatedResponse = await clublist();
      setClubData(updatedResponse.data);
    } catch (error) {
      console.error('Error:', error);
      alert('멤버 탈퇴 중 오류가 발생했습니다.');
    }
  };

  const handleMemberInfo = async (clubId, memberId) => {
    try {
      const response = await fetch(`http://localhost:8080/master/club/applyMember/${clubId}/${memberId}`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('멤버 신청서가 존재하지 않습니다.');
        }
        throw new Error('멤버 신청서를 가져오는 데 실패했습니다.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `member_${memberId}_apply.hwp`; // 파일 이름을 적절히 변경하세요
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      {clubData.map((club) => (
        <div key={club.id}>
          <h2 onClick={() => toggleExpand(club.id)} style={{ cursor: 'pointer' }}>
            {club.name}
          </h2>
          {expandedClubId === club.id && (
            <div>
              <div>
                <label>클럽 타입: </label>
                {club.clubType}
              </div>
              <div>
                <label>이름: </label>
                <input
                  type="text"
                  name="name"
                  value={editClub[club.id]?.name || club.name}
                  onChange={(e) => handleInputChange(e, club.id)}
                />
              </div>
              <div>
                <label>소개: </label>
                <input
                  type="text"
                  name="introduce"
                  value={editClub[club.id]?.introduce || club.introduce}
                  onChange={(e) => handleInputChange(e, club.id)}
                />
              </div>
              <div>
                <label>역사: </label>
                <input
                  type="text"
                  name="history"
                  value={editClub[club.id]?.history || club.history}
                  onChange={(e) => handleInputChange(e, club.id)}
                />
              </div>
              {club.imageRoute && (
                <div>
                  <img src={club.imageRoute} alt="클럽 이미지" style={{ width: '200px', height: '200px' }} />
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, club.id)}
                />
              </div>
              <div>
                <label>모임 시간: </label>
                <input
                  type="datetime-local"
                  name="meetingTime"
                  value={editClub[club.id]?.meetingTime || new Date(club.meetingTime).toISOString().slice(0, -1)}
                  onChange={(e) => handleInputChange(e, club.id)}
                />
              </div>
              <div>
                <label>회장: </label>
                <input
                  type="text"
                  name="president"
                  value={editClub[club.id]?.president || club.president}
                  onChange={(e) => handleInputChange(e, club.id)}
                />
              </div>
              <div>
                <label>부회장: </label>
                <input
                  type="text"
                  name="vicePresident"
                  value={editClub[club.id]?.vicePresident || club.vicePresident}
                  onChange={(e) => handleInputChange(e, club.id)}
                />
              </div>
              <div>
                <label>총무: </label>
                <input
                  type="text"
                  name="generalAffairs"
                  value={editClub[club.id]?.generalAffairs || club.generalAffairs}
                  onChange={(e) => handleInputChange(e, club.id)}
                />
              </div>
              <button onClick={() => handleSave(club.id)}>수정</button>
              <h3>회장: {club.president}</h3>
              <h3>부회장: {club.vicePresident}</h3>
              <h3>총무: {club.generalAffairs}</h3>
              <h3>교수: {club.professor.name}</h3>
              <p>전공: {club.professor.major}</p>
              <p>전화번호: {club.professor.phoneNum}</p>
              <p>이메일: {club.professor.email}</p>
              <h3>마스터 멤버: {club.masterMember.name}</h3>
              <p>전공: {club.masterMember.major}</p>
              <p>전화번호: {club.masterMember.phoneNum}</p>
              <p>이메일: {club.masterMember.email}</p>

              <h3>현 멤버:</h3>
              <ul>
                {club.applyMember
                  .filter((member) => member.applyMemberStatus === 'CLUB_MEMBER')
                  .map((member) => (
                    <li key={member.id}>
                      {member.member.name} ({member.member.major})
                      <button onClick={() => handleReject(member.id, club.id)}> 탈퇴</button>
                      <button onClick={() => handleMemberInfo(club.id, member.member.id)}>멤버 정보</button>
                    </li>
                  ))}
              </ul>

              <h3>신청 중인 멤버:</h3>
              <ul>
                {club.applyMember
                  .filter((member) => member.applyMemberStatus === 'NOT_CLUB_MEMBER')
                  .map((member) => (
                    <li key={member.id}>
                      {member.member.name} ({member.member.major})
                      <button onClick={() => handleAccept(member.id, club.id)}>승낙</button>
                      <button onClick={() => handleMemberInfo(club.id, member.member.id)}>멤버 정보</button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MasterClubListInfo;