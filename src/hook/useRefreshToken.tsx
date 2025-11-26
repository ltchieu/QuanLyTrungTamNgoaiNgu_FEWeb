import { axiosClient } from "../api/axios_client";
import { useAuth } from "./useAuth";
import { parseJwt } from "../utils/jwt";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosClient.post(
      "/auth/refreshtoken",
      {},
      {
        withCredentials: true,
      }
    );

    const { accessToken } = response.data.data;
    const decoded = parseJwt(accessToken);
    
    // Extract role from scope or roles claim
    const role = decoded?.scope || decoded?.roles || "STUDENT";
    // Extract userId/sub if available
    const userId = decoded?.userId;

    setAuth((prev) => {
      console.log("Previous Auth:", JSON.stringify(prev));
      console.log("New Access Token:", accessToken);
      console.log("Decoded JWT:", decoded);

      return {
        ...prev,
        accessToken: accessToken,
        role: role,
        userId: userId,
      };
    });

    return accessToken;
  };

  return refresh;
};