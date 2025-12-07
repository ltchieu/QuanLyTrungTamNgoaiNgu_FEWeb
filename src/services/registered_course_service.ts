import { AxiosInstance } from "axios";
import { ApiResponse } from "../model/api_respone";
import { ClassInfo } from "../model/course_model";

interface RegisteredCoursesResponse {
  classes: ClassInfo[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const getRegisteredCourses = async (axiosInstance: AxiosInstance): Promise<ApiResponse<RegisteredCoursesResponse>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<RegisteredCoursesResponse>>("/students/get-classes-enrolled");
    console.log("Response Registered Courses:", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching registered courses:", error);
    throw error;
  }
};
