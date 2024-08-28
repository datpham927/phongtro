import axios from 'axios';
import { apiRefreshToken } from '../services/apiAuth';
import { parse } from 'path';

export const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL_BACKEND || 'http://localhost:4000/api/',
});
export const axiosJWT = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL_BACKEND || 'http://localhost:4000/api/',
});

axiosJWT.interceptors.request.use(
    function (config) {
        const access_token = localStorage.getItem("access_token");
        const clientId = localStorage.getItem("client_id");
        if (access_token) {
            config.headers.Authorization = `Bearer ${JSON.parse(access_token)}`;
        }
        if (clientId) {
            config.headers['client_id'] = JSON.parse(clientId);
        }
        return config;
    },
    function (error) {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);


// Add a request interceptor
axiosJWT.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
      // Kiểm tra nếu lỗi là 401 (Unauthorized) và request chưa được thử lại
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu request đã thử lại
        try {
          const refreshToken = localStorage.getItem("refresh_token"); // Lấy refresh token từ localStorage
          if(!refreshToken) return;
          const res = await apiRefreshToken(JSON.parse(refreshToken)); // Gọi API để lấy access token mới
          if (res) {
            // Cập nhật lại header Authorization với token mới
            originalRequest.headers['Authorization'] = `Bearer ${res.data.authorization.access_token}`;
            localStorage.setItem('access_token', JSON.stringify(res.data.authorization.access_token));
            localStorage.setItem('client_id', JSON.stringify(res.data.user_id));
            localStorage.setItem('refresh_token', JSON.stringify(res.data.authorization.refresh_token));
            return axiosJWT(originalRequest); // Gửi lại request ban đầu với token mới
          }
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      }
  
      // Nếu không phải lỗi 401 hoặc không thể refresh token, trả về lỗi ban đầu
      return Promise.reject(error);
    }
  );
  