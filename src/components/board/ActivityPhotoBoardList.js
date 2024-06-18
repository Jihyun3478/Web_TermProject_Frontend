import React, { useState, useEffect } from 'react';
import { fetchActivityPhotos } from '../../api/board/BoardApi'; // 경로 확인 후 수정
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ActivityPhotoBoardList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedActivityPhotos = await fetchActivityPhotos('/activityPhoto/findAll');
        setPosts(fetchedActivityPhotos);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadPosts();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        부원 모집 게시글 목록
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

export default ActivityPhotoBoardList;
