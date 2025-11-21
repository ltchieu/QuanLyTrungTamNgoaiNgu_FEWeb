import { axiosClient } from "../api/axios_client";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {

    const response = await axiosClient.post("/auth/refresh-token", {}, {
        withCredentials: true 
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { 
        ...prev, 
        accessToken: response.data.accessToken,
        role: response.data.role, 
        userId: response.data.userId
      };
    });
    
    return response.data.accessToken;
  };

  return refresh;
};