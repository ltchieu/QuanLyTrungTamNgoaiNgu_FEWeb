import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth_service";
import axiosAuthentication from "../api/axios_auth";
import { LoginRequest } from "../model/auth_model";

interface User {
  id: number;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  // Tự khởi tạo khi có token
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    const id = localStorage.getItem("userId");
    if (token && role && id) {
      setUser({ id: Number(id), role });
    }
  }, []);

  // Đăng nhập
  const login = async (loginData: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginService(loginData);

      sessionStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("userRole", res.role);
      localStorage.setItem("userId", res.userId.toString());

      setUser({ id: res.userId, role: res.role });
      navigate("/");

    } catch (err: any) {

      console.error("Login failed:", err);
      setError(err.message)
      
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await axiosAuthentication.post("/auth/logout");
    } catch (e) {
      console.warn("Logout request failed, but clearing local storage anyway.");
    }
    sessionStorage.clear();
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  // Kiểm tra quyền
  const hasRole = (role: string) => user?.role === role;

  return {
    user,
    loading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
    hasRole,
  };
};
