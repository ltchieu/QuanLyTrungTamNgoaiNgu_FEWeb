import { AxiosInstance } from "axios";
import { ApiResponse } from "../model/api_respone";
import { ClassInfo } from "../model/course_model";

export const getRegisteredCourses = async (axiosInstance: AxiosInstance): Promise<ApiResponse<ClassInfo[]>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ClassInfo[]>>("/students/get-classes-enrolled");
    return response.data;
  } catch (error) {
    console.error("Error fetching registered courses:", error);
    throw error;
  }
};
