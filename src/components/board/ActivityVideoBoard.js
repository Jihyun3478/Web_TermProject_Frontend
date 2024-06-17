import React, { useState, useEffect } from 'react';
import { fetchActivityVideos, saveActivityVideo } from '../../api/master/BoardApi';

const ActivityVideoBoard = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: '', youtubeUrl: '' });

  const loadVideos = async () => {
    try {
      const fetchedVideos = await fetchActivityVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('활동 영상 불러오기 에러:', error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveActivityVideo(newVideo);
      console.log('활동영상 등록 성공!');
      setNewVideo({ title: '', youtubeUrl: '' });
      loadVideos();
    } catch (error) {
      console.error('활동영상 등록 에러:', error);
    }
  };

  return (
    <div>
      <h1>활동영상</h1>
      <form onSubmit={handleVideoSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={newVideo.youtubeUrl}
          onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
        />
        <button type="submit">등록</button>
      </form>
      <h2>등록된 영상</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
              {video.youtubeUrl}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityVideoBoard;