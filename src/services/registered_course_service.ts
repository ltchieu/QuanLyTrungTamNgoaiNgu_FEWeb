import { AxiosInstance } from "axios";
import { ApiResponse } from "../model/api_respone";
import { CourseGroupResponse } from "../model/course_model";

export const getRegisteredCourses = async (axiosInstance: AxiosInstance): Promise<ApiResponse<CourseGroupResponse>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<CourseGroupResponse>>("/get-courses_enrolled");
    return response.data;
  } catch (error) {
    console.error("Error fetching registered courses:", error);
    throw error;
  }
};
