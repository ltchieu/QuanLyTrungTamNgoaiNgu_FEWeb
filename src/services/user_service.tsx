
import { AxiosInstance } from "axios";
import { ApiResponse } from "../model/api_respone";
import { NameAndEmail } from "../model/user_model";
import { StudentInfoResponse } from "../model/student";

export const getNameAndEmail = async (client: AxiosInstance): Promise<NameAndEmail> => {
  try {
    const response = await client.get<ApiResponse<NameAndEmail>>("/users/name-email");

    if (response.data && response.data.code === 1000 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data?.message || "Không lấy được thông tin người dùng");
    }
  } catch (error: any) {
    console.error("Lỗi khi lấy Name & Email:", error);
    throw error;
  }
};

export const getStudentInfo = async (client: AxiosInstance): Promise<StudentInfoResponse> => {
  try {
    const response = await client.get<ApiResponse<StudentInfoResponse>>("/users/student-info");

    if (response.data && response.data.code === 1000 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data?.message || "Không lấy được thông tin học viên");
    }
  } catch (error: any) {
    console.error("Lỗi lấy thông tin học viên:", error);
    throw error;
  }
};