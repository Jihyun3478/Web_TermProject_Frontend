import React, { useState, useEffect } from 'react';
import { fetchActivityPhotos } from '../../api/board/BoardApi'; // 경로 확인 후 수정
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const ActivityPhotoBoardList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedActivityPhotos = await fetchActivityPhotos('/activityPhoto/findAll');
        setPosts(fetchedActivityPhotos);
      } catch (error) {
        console.error('게시글 불러오기 에러:', error);
      }
    };
    loadPosts();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        활동 사진 게시글 목록
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemAvatar>
              {post.photoBase64 ? (
                <Avatar alt={post.title} src={`data:image/jpeg;base64,${post.photoBase64}`} />
              ) : (
                <Avatar />
              )}
            </ListItemAvatar>
            <ListItemText primary={post.title} secondary={post.content} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ActivityPhotoBoardList;
