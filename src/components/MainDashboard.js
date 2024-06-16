import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Button, Tabs, Tab } from '@mui/material';
import { fetchActivityVideos } from '../api/master/BoardApi';

const MainDashboard = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [activityVideos, setActivityVideos] = useState([]);

  useEffect(() => {
    const loadActivityVideos = async () => {
      try {
        const videos = await fetchActivityVideos();
        setActivityVideos(videos);
      } catch (error) {
        console.error('활동 영상 불러오기 에러:', error);
      }
    };

    loadActivityVideos();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            동아리 관리 시스템
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                로그아웃
              </Button>
              <AccountCircle
                sx={{ cursor: "pointer" }}
                onClick={handleIconClick}
              />
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signin">
                로그인
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                회원가입
              </Button>
            </>
          )}
        </Toolbar>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label={
              <Link
                to="/clubList"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                동아리 조회
              </Link>
            }
          />
          <Tab
            label={
              <Link
                to="/events"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                동아리 행사
              </Link>
            }
          />
          <Tab
            label={
              <Link
                to="/videos"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                동영상
              </Link>
            }
          />
          <Tab
            label={
              <Link
                to="/photos"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                사진
              </Link>
            }
          />
        </Tabs>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* 동아리 행사 공지 */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => navigate("/posts/noticeClub")}
            >
              <Typography variant="h6" gutterBottom>동아리 행사 공지</Typography>
              <Typography>공지 1</Typography>
              <Typography>공지 2</Typography>
              <Typography>공지 3</Typography>
            </Paper>
          </Grid>

          {/* 부원 모집 게시판 */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => navigate("/posts/recruitMember")}
            >
              <Typography variant="h6" gutterBottom>부원 모집 게시판</Typography>
              <Typography>모집 공고 1</Typography>
              <Typography>모집 공고 2</Typography>
              <Typography>모집 공고 3</Typography>
            </Paper>
          </Grid>

          {/* 활동 사진 */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => navigate("/posts/activityPhoto")}
            >
              <Typography variant="h6" gutterBottom>
                활동 사진
              </Typography>
              <Grid container spacing={2}>
                {[1, 2, 3].map((photo) => (
                  <Grid item xs={4} key={photo}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      사진 {photo}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* 활동 영상 */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => navigate("/posts/activityVideo")}
            >
              <Typography variant="h6" gutterBottom>
                활동 영상
              </Typography>
              <Grid container spacing={2}>
                {activityVideos.map((video, index) => (
                  <Grid item xs={4} key={index}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <iframe
                        width="100%"
                        height="315"
                        src={video.youtubeUrl}
                        title={`영상 ${index + 1}`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainDashboard;
