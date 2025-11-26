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
    const response = await client.get<ApiResponse<StudentInfoResponse>>("/students");

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

export const updateStudentInfo = async (client: AxiosInstance, data: StudentInfoResponse): Promise<void> => {
  try {
    const response = await client.put<ApiResponse<any>>("/students", data);

    if (response.data && response.data.code === 1000) {
      return;
    } else {
      throw new Error(response.data?.message || "Cập nhật thông tin thất bại");
    }
  } catch (error: any) {
    console.error("Lỗi cập nhật thông tin học viên:", error);
    throw error;
  }
};