import React, { useState, useEffect } from 'react';
import { fetchActivityVideos } from '../../api/master/BoardApi'; // 경로 확인 후 수정
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ActivityVideoBoardList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchActivityVideos('activityVideo/findAll'); // 경로 수정
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching activity videos:', error);
      }
    };
    loadVideos();
  }, []);

  // Extract video ID from YouTube URL
  const getVideoId = (youtubeUrl) => {
    const url = new URL(youtubeUrl);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get('v');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        활동 영상 목록
      </Typography>
      <List>
        {videos.map((video) => (
          <ListItem key={video.id}>
            <ListItemText primary={video.title} secondary={video.videoUrl} />
            <img src={`https://img.youtube.com/vi/${getVideoId(video.videoUrl)}/hqdefault.jpg`} alt="Video Thumbnail" style={{ width: '120px', height: '90px', objectFit: 'cover' }} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ActivityVideoBoardList;
