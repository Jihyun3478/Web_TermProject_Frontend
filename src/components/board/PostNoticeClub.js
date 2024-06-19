import React, { useState } from 'react';

const PostNoticeClub = ({ onPostSubmit, onCancel }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: null,
    isPublic: true, // Default to true for public notice
  });

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;
    if (name === 'image') {
      setNewPost({ ...newPost, image: files[0] });
    } else if (name === 'isPublic') {
      setNewPost({ ...newPost, isPublic: checked });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const dto = {
      title: newPost.title,
      content: newPost.content,
      isPublic: newPost.isPublic,
    };
    formData.append('noticeClubRequestDTO', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    if (newPost.image) {
      formData.append('image', newPost.image);
    }
    onPostSubmit(formData);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">동아리 행사 공지 게시글 등록</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={newPost.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용:</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            value={newPost.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublic"
            name="isPublic"
            checked={newPost.isPublic}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isPublic">
            전체 공개
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">이미지:</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">등록</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>취소</button>
      </form>
    </div>
  );
};

export default PostNoticeClub;
