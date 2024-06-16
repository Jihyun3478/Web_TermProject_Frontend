// BoardApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/master/board';

// Save notice club post
export const saveNoticeClub = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/saveNoticeClub`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving notice club post:', error);
    throw error;
  }
};

// Save recruit member post
export const saveRecruitMember = async (formData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_BASE_URL}/api/saveRecruitMember`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving recruit member post:', error);
    throw error;
  }
};

// Save activity photo post
export const saveActivityPhoto = async (formData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_BASE_URL}/api/saveActivityPhoto`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving activity photo post:', error);
    throw error;
  }
};

// Save activity video post
export const saveActivityVideo = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_BASE_URL}/api/saveActivityVideo`, data, {
      headers: {
     //   'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving activity video post:', error);
    throw error;
  }
};

// Fetch posts from the server
export const fetchPosts = async (url) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fetch activity videos from the server
export const fetchActivityVideos = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/activityVideo/findAll`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching activity videos:', error);
    throw error;
  }
};