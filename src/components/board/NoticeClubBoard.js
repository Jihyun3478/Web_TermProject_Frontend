import React, { useState, useEffect } from 'react';
import { fetchPosts, saveNoticeClub } from '../../api/master/BoardApi';
import PostManagement from '../../api/master/PostManagement';
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const NoticeClubBoard = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts('/noticeClub/findAll');
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadPosts();
  }, []);

  const handlePostFormSubmit = async (postData) => {
    try {
      await saveNoticeClub(postData);
      console.log('Post submitted successfully!');
      setShowPostForm(false);
      const fetchedPosts = await fetchPosts('/noticeClub/findAll');
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        동아리 행사 공지
      </Typography>
      <button onClick={() => setShowPostForm(true)}>게시글 등록</button>
      {showPostForm && (
        <PostManagement
          category="noticeClub"
          onPostSubmit={handlePostFormSubmit}
        />
      )}

      <Typography variant="h5" gutterBottom>
        게시글 목록
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id} alignItems="flex-start">
          {post.imageRoute && (
            <ListItemAvatar>
             <Avatar alt="Post Image" src={`http://localhost:8080/master/board/image/${post.imageRoute}`} />
            </ListItemAvatar>
          )}
          <ListItemText
            primary={
              <>
                <Typography component="span" variant="subtitle1" color="textPrimary">
                  제목: {post.title}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography component="span" variant="body2" color="textPrimary">
                  작성자: {post.writer}
                </Typography>
                <br />
                {/* <Typography component="span" variant="body2" color="textSecondary">
                  작성일: {post.createdAt}
                </Typography>
                <br /> */}
                <Typography component="span" variant="body2" color="textSecondary">
                내용: {post.content}
                </Typography>
              </>
            }
          />
        </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NoticeClubBoard;