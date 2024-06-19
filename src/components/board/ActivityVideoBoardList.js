import React, { useState, useEffect } from 'react';
import { fetchActivityVideos } from '../../api/board/BoardApi'; // 경로 확인 후 수정
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ActivityVideoBoardList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedActivityVideos = await fetchActivityVideos('/activityVideo/findAll');
        setPosts(fetchedActivityVideos);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadPosts();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        활동 영상목록
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText primary={post.title} secondary={post.content} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ActivityVideoBoardList;