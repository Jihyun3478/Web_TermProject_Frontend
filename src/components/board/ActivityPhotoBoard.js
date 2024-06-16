import React, { useEffect, useState } from 'react';
import PostManagement from '../../api/master/PostManagement';
import { fetchPosts, saveActivityPhoto } from '../../api/master/BoardApi';


const ActivityPhotoBoard = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts('/activityPhoto/findAll');
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('게시글 불러오기 에러:', error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      <h1>활동 사진 게시판</h1>
      <button onClick={() => setShowPostForm(true)}>게시글 등록</button>
      {showPostForm && <PostManagement category="activityPhoto" />}

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

export default ActivityPhotoBoard;