import React, { useState } from 'react';
import { saveNoticeClub, saveRecruitMember, saveActivityPhoto, saveActivityVideo } from '../../api/board/BoardApi';

const PostManagement = ({ category, onPostSubmit }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: null,
    youtubeUrl: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewPost({ ...newPost, image: files[0] });
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
    };
    formData.append('noticeClubRequestDTO', new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (newPost.image) {
      formData.append('image', newPost.image);
    }
    try {
      let response;
      switch (category) {
        case 'noticeClub':
          response = await saveNoticeClub(formData);
          break;
        case 'activityPhoto':
          response = await saveActivityPhoto(formData);
          break;
        case 'activityVideo':
          const videoData = {
            title: newPost.title,
            content: newPost.content,
            youtubeUrl: newPost.youtubeUrl,
          };
          response = await saveActivityVideo(videoData);
          break;
        case 'recruitMember':
          response = await saveRecruitMember(formData);
          break;
        default:
          console.error('Unknown category:', category);
          return;
      }
      console.log('Post submitted successfully:', response);
      setNewPost({ title: '', content: '', image: null, youtubeUrl: '' });
      onPostSubmit();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div>
      <h1>{category === 'activityVideo' ? '활동 영상' : category} 게시글 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleChange}
          ></textarea>
        </div>
        {(category === 'activityPhoto' || category === 'noticeClub') && (
          <div>
            <label>이미지:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>
        )}
        {category === 'activityVideo' && (
          <div>
            <label>YouTube URL:</label>
            <input
              type="text"
              name="youtubeUrl"
              value={newPost.youtubeUrl}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default PostManagement;
