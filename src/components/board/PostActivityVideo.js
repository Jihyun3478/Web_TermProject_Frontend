import React, { useState } from 'react';

const PostActivityVideo= ({ onPostSubmit, onCancel }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setNewPost({ ...newPost});
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
      title: newPost.title,
      content: newPost.content,
    };
    await onPostSubmit(JSON.stringify(dto));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">활동 영상 게시글 등록</h1>
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
        <button type="submit" className="btn btn-primary me-2">등록</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>취소</button>
      </form>
    </div>
  );
};

export default PostActivityVideo;