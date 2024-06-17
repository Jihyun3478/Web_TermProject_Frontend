import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveNoticeClub } from '../../api/master/BoardApi';

const CreateNoticeClub = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      await saveNoticeClub(formData);
      navigate('/posts/noticeClub');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div>
      <h2>새 게시글 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">이미지</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default CreateNoticeClub;