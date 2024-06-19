import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Save notice club post
export const saveNoticeClub = async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axiosInstance.post('/master/board/api/saveNoticeClub', formData, config);

    return response.data;
  } catch (error) {
    console.error('동아리 게시글 저장 오류:', error);
    throw error;
  }
};

// Save recruit member post
export const saveRecruitMember = async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axiosInstance.post('/master/board/api/saveRecruitMember', formData, config);

    return response.data;
  } catch (error) {
    console.error('부원 모집 저장 오류:', error);
    throw error;
  }
};

// Save activity photo post
export const saveActivityPhoto = async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axiosInstance.post('/master/board/api/saveActivityPhoto', formData, config);

    return response.data;
  } catch (error) {
    console.error('활동 사진 저장 오류:', error);
    throw error;
  }
};

// Save activity video post
export const saveActivityVideo = async (data) => {
  try {
    const response = await axiosInstance.post('/master/board/api/saveActivityVideo', data, {
      headers: {
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
  try {
    const response = await axiosInstance.get('/master/board' + url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
};

// Fetch recruit member posts
export const fetchRecruitMember = async (url) => {
  try {
    const response = await axiosInstance.get('/master/board' + url);
    return response.data;
  } catch (error) {
    console.error('부원 모집 불러오기 오류:', error);
    throw error;
  }
};

// Fetch activity videos
export const fetchActivityVideos = async (url) => {
  try {
    const response = await axiosInstance.get('/master/board' + url);
    return response.data;
  } catch (error) {
    console.error('활동 영상 불러오기 오류:', error);
    throw error;
  }
};

// Fetch activity photos
export const fetchActivityPhotos = async (url) => {
  try {
    const response = await axiosInstance.get('/master/board' + url);
    return response.data;
  } catch (error) {
    console.error('활동 사진 불러오기 오류:', error);
    throw error;
  }
};

// Fetch user info
export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/api/memberInfo');
    const { isLoggedIn, role } = response.data;
    return { isLoggedIn, role };
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
