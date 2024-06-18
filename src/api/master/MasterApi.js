import axios from 'axios';

const MasterApi = axios.create({
  baseURL: 'http://localhost:8080/master/club',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
MasterApi.interceptors.request.use(
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

export const clublist = () => {
  return MasterApi.get('/list');
};

export const updateClubInfo = (clubId, clubData) => {
  return MasterApi.put(`/${clubId}`, clubData);
};

export const updateClubImageFileInfo = async (clubId, formData) => {
  const response = await MasterApi.post(`/uploadImage/${clubId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const acceptMember = (memberId) => {
  return MasterApi.post(`/applyMember/${memberId}?ApplyMemberStatus=CLUB_MEMBER`);
};

export default {
  clublist,
  updateClubInfo,
  updateClubImageFileInfo,
  acceptMember,
};