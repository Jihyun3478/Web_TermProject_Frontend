import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import {
  fetchClubs,
  downloadTemplate,
  uploadFile,
} from "../../api/applyMember/ApplyMemberApi.js";

const NotApplyClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getClubs = async () => {
      try {
        const data = await fetchClubs(token);
        setClubs(data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
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

    const token = sessionStorage.getItem("token");

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
    <Container className="mt-4">
      <h1 className="text-center mb-4">Club List</h1>
      <Button
        variant="primary"
        className="mb-3"
        onClick={handleDownloadTemplate}
      >
        동아리 가입 신청서 양식 다운로드
      </Button>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {clubs.map((club) => (
            <Col md={6} lg={4} key={club.id} className="mb-3">
              <Card>
                <Card.Body
                  onClick={() => handleClubClick(club.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Title>{club.name}</Card.Title>
                  {club.imageRoute && (
                    <Card.Img
                      src={club.imageRoute}
                      alt={club.name}
                      className="img-thumbnail mb-3"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                  {selectedClubId === club.id && (
                    <div>
                      <h5>Club Details</h5>
                      <p>
                        <strong>Club Type:</strong> {club.clubType}
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
                      <h6>Professor</h6>
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
                      <h6>Master Member</h6>
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
                        <strong>Birth Date:</strong>{" "}
                        {club.masterMember.birthDate}
                      </p>
                      <Form.Group controlId="fileInput">
                        <Form.Label className="btn btn-primary">
                          가입 신청
                        </Form.Label>
                        <Form.Control
                          type="file"
                          accept=".hwp"
                          onChange={(e) => handleFileUpload(e, club.id)}
                          style={{ display: "none" }}
                        />
                      </Form.Group>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default NotApplyClubList;
