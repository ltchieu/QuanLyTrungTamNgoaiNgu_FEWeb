import { axiosClient } from "../api/axios_client";
import { CourseGroupResponse } from "../model/course_model";
import { ApiResponse } from "../model/api_respone";

export async function getCategoryDetail(id?: string): Promise<CourseGroupResponse> {
  try {
    const res = await axiosClient.get<ApiResponse<CourseGroupResponse>>(
      `categories/${id}`
    );

    if (res.data && res.data.data) {
      return res.data.data;
    } else {
      throw new Error(
        res.data?.message || "Lỗi khi lấy chi tiết danh mục"
      );
    }
  } catch (err: any) {
    if (err.response) {
      console.log("Server returned:", err.response.status, err.response.data);
    }
    console.error("Login API error:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.message || "Có lỗi xảy ra khi lấy dữ liệu chi tiết danh mục"
    );
  }
}