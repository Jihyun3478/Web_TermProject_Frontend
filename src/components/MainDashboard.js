import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Tabs, Tab, Card } from "react-bootstrap";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../AuthContext";
import NoticeClubList from "../components/board/NoticeClubList";
import RecruitMemberBoardList from "../components/board/RecruitMemberBoardList";
import ActivityPhotoBoardList from "../components/board/ActivityPhotoBoardList";
import ActivityVideoBoardList from "../components/board/ActivityVideoBoardList";

const MainDashboard = () => {
  const [value, setValue] = useState(null); // Default value is null
  const navigate = useNavigate();
  const { isLoggedIn, role, logout } = useContext(AuthContext);

  const handleIconClick = () => {
    navigate("/mypage");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            동아리 관리 시스템
          </Link>
          <div className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                {role === "ADMIN" && ( // 관리자 버튼 조건부 렌더링
                  <Link className="nav-link" to="/admin">
                    관리자
                  </Link>
                )}
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
                <AccountCircle
                  className="nav-link"
                  style={{ cursor: "pointer", fontSize: "2.5rem" }} // 아이콘 크기 조정
                  onClick={handleIconClick}
                />
              </>
            ) : (
              <>
                <Link className="nav-link" to="/signin">
                  로그인
                </Link>
                <Link className="nav-link" to="/signup">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Tabs
        activeKey={value}
        onSelect={(k) => {
          setValue(k);
          navigate(`/${k}`);
        }}
        className="justify-content-center mt-3"
      >
        <Tab eventKey="allClubList" title="동아리 조회" />
        <Tab eventKey="posts/noticeClub" title="동아리 행사" />
        <Tab eventKey="posts/activityVideo" title="동영상" />
        <Tab eventKey="posts/activityPhoto" title="사진" />
      </Tabs>

      <Container className="mt-4 mb-4">
        <Row>
          {/* 동아리 행사 공지 */}
          <Col xs={12} md={6}>
            <Card
              onClick={() => navigate("/posts/noticeClub")}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <NoticeClubList />
              </Card.Body>
            </Card>
          </Col>

          {/* 부원 모집 게시판 */}
          <Col xs={12} md={6}>
            <Card
              onClick={() => navigate("/posts/recruitMember")}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <RecruitMemberBoardList />
              </Card.Body>
            </Card>
          </Col>

          {/* 활동 사진 */}
          <Col xs={12}>
            <Card
              onClick={() => navigate("/posts/activityPhoto")}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <ActivityPhotoBoardList />
              </Card.Body>
            </Card>
          </Col>

          {/* 활동 영상 */}
          <Col xs={12}>
            <Card
              onClick={() => navigate("/posts/activityVideo")}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <ActivityVideoBoardList />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainDashboard;
