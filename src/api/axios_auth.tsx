import axios from "axios";

const axiosAuthentication = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true, //Cho phép gửi cookie refreshToken
});

//Gắn access token vào header trước mỗi request
axiosAuthentication.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Xử lý khi token hết hạn (401 Unauthorized)
axiosAuthentication.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh → gọi /auth/refresh-token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosAuthentication.post("/auth/refresh-token");

        // Backend trả token mới
        const newAccessToken = res.data.data.accessToken;

        // Cập nhật lại token trong sessionStorage
        sessionStorage.setItem("accessToken", newAccessToken);

        // Gắn token mới vào request cũ rồi gửi lại
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuthentication(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired:", refreshError);
        // Nếu refreshToken cũng hết hạn → logout
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthentication;
