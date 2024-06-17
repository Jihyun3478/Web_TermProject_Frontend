import React, { useEffect, useState } from "react";
import { fetchAllClubs } from "../../api/club/ClubApi";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchAllClubs(token);
        setClubs(data);
      } catch (error) {
        setError("동아리 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };

    loadClubs();
  }, []);

  const handleApplyClub = () => {
    navigate("/applyClub/create");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        전체 동아리 목록
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {clubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{club.name}</Typography>
              <Typography>{club.introduce}</Typography>
              <Typography>{club.history}</Typography>
              <Typography>회장: {club.president}</Typography>
              <Typography>부회장: {club.vicePresident}</Typography>
              <Typography>총무: {club.generalAffairs}</Typography>
              <Typography>모임 시간: {club.meetingTime}</Typography>
              {/* 기타 필요한 정보들을 렌더링하세요 */}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleApplyClub}
      >
        동아리 등록 신청
      </Button>
    </Container>
  );
};

export default AllClubList;
