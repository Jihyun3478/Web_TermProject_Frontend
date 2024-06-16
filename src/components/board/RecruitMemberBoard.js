import React, { useEffect, useState } from 'react';
import { fetchPosts, saveRecruitMember } from '../../api/master/BoardApi';
import PostManagement from '../../api/master/PostManagement';

const RecruitMemberBoard = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
  
    useEffect(() => {
      const loadPosts = async () => {
        try {
          const fetchedPosts = await fetchPosts('/recruitMember/findAll');
          setPosts(fetchedPosts);
        } catch (error) {
          console.error('게시글 불러오기 에러:', error);
        }
      };
  
      loadPosts();
    }, []);
  
    return (
      <div>
        <h1>부원 모집 게시판</h1>
        <button onClick={() => setShowPostForm(true)}>게시글 등록</button>
        {showPostForm && <PostManagement category="recruitMember" />}
  
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
  
  export default RecruitMemberBoard;