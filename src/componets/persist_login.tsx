import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../hook/useRefreshToken";
import { useAuth } from "../hook/useAuth";
import { CircularProgress, Box } from "@mui/material";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err: any) {
        if (err?.response?.status !== 401) {
          console.error("Persist login failed:", err);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Nếu chưa có accessToken thì thử refresh
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
         <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box> 
      ) : (
         <Outlet />
      )}
    </>
  );
};

export default PersistLogin;