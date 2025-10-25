import { axiosClient } from "../api/axios_client";
import { ApiResponse } from "../model/api_respone";
import { LoginRequest, LoginResponse, SignupRequest } from "../model/auth_model";

export async function loginService(
  loginData: LoginRequest
): Promise<LoginResponse> {
  try {
    const res = await axiosClient.post<ApiResponse<LoginResponse>>(
      "auth/login",
      loginData
    );

    if (res.data && res.data.code === 1000 && res.data.data) {
      return res.data.data;
    } else {
      throw new Error(
        res.data?.message || "Đăng nhập thất bại vì gửi không đúng định dạng"
      );
    }
  } catch (err: any) {
     if (err.response) {
      console.log("❗ Server returned:", err.response.status, err.response.data);
    }
    console.error("Login API error:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.message || "An error occurred during login."
    );
  }
}

//Đăng ký tài khoản mới
export async function signupService(signupData: SignupRequest): Promise<void> {
  try {
    const res = await axiosClient.post("/auth/signup", signupData);
    if (res.data.code === 1000) {
      console.log("Chúng tôi đã gửi email xác thực. Vui lòng kiểm tra hộp thư của bạn!");
    } else {
      throw new Error(res.data.message || "Đăng ký thất bại.");
    }
  } catch (err: any) {
    throw err;
  }
}

//Resend mail xác thực
export function resendVerificationEmail(email: string, type: string = 'EMAIL_VERIFICATION') {
  return axiosClient.post("/auth/resend", null, {
    params: {
      email: email,
      type: type
    }
  });
}
