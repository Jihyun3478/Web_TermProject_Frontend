import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Accordion,
} from "react-bootstrap";
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

  if (loading)
    return (
      <Container className="text-center">
        <Spinner animation="border" />
      </Container>
    );
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container className="mt-4">
      <Row>
        {clubData.map((club) => (
          <Col md={6} lg={4} key={club.id} className="mb-3">
            <Card>
              <Accordion>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  onClick={() => toggleExpand(club.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Title>{club.name}</Card.Title>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form>
                      <Form.Group controlId={`clubType${club.id}`}>
                        <Form.Label>클럽 타입</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          defaultValue={club.clubType}
                        />
                      </Form.Group>
                      <Form.Group controlId={`name${club.id}`}>
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          defaultValue={club.name}
                          onChange={(e) => handleInputChange(e, club.id)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`introduce${club.id}`}>
                        <Form.Label>소개</Form.Label>
                        <Form.Control
                          type="text"
                          name="introduce"
                          defaultValue={club.introduce}
                          onChange={(e) => handleInputChange(e, club.id)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`history${club.id}`}>
                        <Form.Label>역사</Form.Label>
                        <Form.Control
                          type="text"
                          name="history"
                          defaultValue={club.history}
                          onChange={(e) => handleInputChange(e, club.id)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`meetingTime${club.id}`}>
                        <Form.Label>모임 시간</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="meetingTime"
                          defaultValue={new Date(club.meetingTime)
                            .toISOString()
                            .slice(0, -1)}
                          onChange={(e) => handleInputChange(e, club.id)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`president${club.id}`}>
                        <Form.Label>회장</Form.Label>
                        <Form.Control
                          type="text"
                          name="president"
                          defaultValue={club.president}
                          onChange={(e) => handleInputChange(e, club.id)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`vicePresident${club.id}`}>
                        <Form.Label>부회장</Form.Label>
                        <Form.Control
                          type="text"
                          name="vicePresident"
                          defaultValue={club.vicePresident}
                          onChange={(e) => handleInputChange(e, club.id)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`generalAffairs${club.id}`}>
                        <Form.Label>총무</Form.Label>
                        <Form.Control
                          type="text"
                          name="generalAffairs"
                          defaultValue={club.generalAffairs}
                          onChange={(e) => handleInputChange(e, club.id)}
                        />
                      </Form.Group>
                      {club.imageRoute && (
                        <Form.Group controlId={`image${club.id}`}>
                          <Card.Img
                            src={club.imageRoute}
                            alt="클럽 이미지"
                            className="img-thumbnail mb-3"
                            style={{ width: "200px", height: "200px" }}
                          />
                          <Form.File
                            label="이미지 업로드"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, club.id)}
                          />
                        </Form.Group>
                      )}
                      <Button
                        variant="primary"
                        onClick={() => handleSave(club.id)}
                      >
                        수정
                      </Button>
                    </Form>
                    <h5 className="mt-4">Professor</h5>
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
                    <h5>Master Member</h5>
                    <p>
                      <strong>Name:</strong> {club.masterMember.name}
                    </p>
                    <p>
                      <strong>Student Number:</strong>{" "}
                      {club.masterMember.stuNum}
                    </p>
                    <p>
                      <strong>Major:</strong> {club.masterMember.major}
                    </p>
                    <p>
                      <strong>Phone Number:</strong>{" "}
                      {club.masterMember.phoneNum}
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
                    <h5>Current Members</h5>
                    <ul>
                      {club.applyMember
                        .filter(
                          (member) => member.applyMemberStatus === "CLUB_MEMBER"
                        )
                        .map((member) => (
                          <li key={member.id}>
                            {member.member.name} ({member.member.major})
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleReject(member.id, club.id)}
                            >
                              {" "}
                              탈퇴
                            </Button>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() =>
                                handleMemberInfo(club.id, member.member.id)
                              }
                            >
                              멤버 정보
                            </Button>
                          </li>
                        ))}
                    </ul>
                    <h5>Pending Members</h5>
                    <ul>
                      {club.applyMember
                        .filter(
                          (member) =>
                            member.applyMemberStatus === "NOT_CLUB_MEMBER"
                        )
                        .map((member) => (
                          <li key={member.id}>
                            {member.member.name} ({member.member.major})
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleAccept(member.id, club.id)}
                            >
                              승낙
                            </Button>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() =>
                                handleMemberInfo(club.id, member.member.id)
                              }
                            >
                              멤버 정보
                            </Button>
                          </li>
                        ))}
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MasterClubListInfo;
