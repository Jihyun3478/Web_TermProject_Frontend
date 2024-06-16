import React, { useState, useEffect } from 'react';
import { fetchPosts, saveNoticeClub } from '../../api/master/BoardApi';
import PostManagement from '../../api/master/PostManagement';

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
      <h1>동아리 행사 공지</h1>
      <button onClick={() => setShowPostForm(true)}>게시글 등록</button>
      {showPostForm && (
        <PostManagement
          category="noticeClub"
          onSubmit={handlePostFormSubmit}
        />
      )}

      <h2>게시글 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeClubBoard;