import { axiosClient } from "../api/axios_client";
import { CourseGroupResponse } from "../model/course_model";

export async function getCategoryDetail(id?: string): Promise<CourseGroupResponse> {
  try {
    const res = await axiosClient.get(
      `categories/${id}`
    );

    if (res.data) {;
      return res.data;
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