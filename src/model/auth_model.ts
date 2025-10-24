// Dữ liệu gửi đi khi login
export interface LoginRequest {
  identifier: string; // Email hoặc số điện thoại
  password: string;
}

// Dữ liệu nhận về trong trường "data" của ApiResponse khi login thành công
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  userId: number;
}

export interface SignupRequest {
    password: string;
    phoneNumber: string;
    email: string
}