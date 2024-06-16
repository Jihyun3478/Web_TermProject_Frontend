import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchClubs = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/applyMember/clubList`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
};

export const downloadTemplate = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/applyMember/download`, {
      headers: {
        'accept': '*/*',
      },
      responseType: 'blob', // 중요한 부분: 파일을 blob 형태로 받아옵니다.
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'apply_template.hwp'); // 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading template:', error);
    throw error;
  }
};

export const uploadFile = async (file, clubId, token) => {
  const formData = new FormData();
  formData.append('files', file, file.name);

  try {
    const response = await axios.post(`${API_BASE_URL}/applyMember/upload/${clubId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'accept': '*/*',
      },
    });

    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};