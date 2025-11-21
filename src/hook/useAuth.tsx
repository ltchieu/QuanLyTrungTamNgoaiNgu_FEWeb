import { useContext } from "react";
import AuthContext from "../context/auth_provider";
import { axiosClient } from "../api/axios_client";


export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  // Hàm Logout
  const logout = async () => {
    setAuth({}); 
    try {
      // Gọi API để Backend xóa Refresh Token trong HttpOnly Cookie
      await axiosClient.post("/auth/logout", {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error("Lỗi khi gọi API logout:", error);
    }
  };
  return { auth, setAuth, logout };
};