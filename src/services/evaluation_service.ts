import { CourseEvaluation, ReviewResponse } from "../model/course_evaluation";
import { ApiResponse } from "../model/api_respone";
import { AxiosInstance } from "axios";

export const submitEvaluation = async (
    axiosPrivate: AxiosInstance,
    data: CourseEvaluation
): Promise<ReviewResponse> => {
    try {
        const response = await axiosPrivate.post<ApiResponse<ReviewResponse>>(
            "students/reviews",
            data
        );

        if (response.data && response.data.code === 1000 && response.data.data) {
            console.log("Đánh giá đã được gửi thành công");
            return response.data.data;
        } else {
            throw new Error(response.data?.message || "Gửi đánh giá thất bại");
        }
    } catch (error: any) {
        console.error("Lỗi khi gửi đánh giá:", error);
        throw error;
    }
};


export const getStudentEvaluations = async (
    axiosPrivate: AxiosInstance
): Promise<ReviewResponse[]> => {
    try {
        const response = await axiosPrivate.get<ApiResponse<ReviewResponse[]>>(
            "students/reviews/student"
        );

        if (response.data && response.data.code === 1000 && response.data.data) {
            return response.data.data;
        } else {
            return [];
        }
    } catch (error: any) {
        console.error("Lỗi khi lấy danh sách đánh giá:", error);
        return [];
    }
};


export const isCourseEvaluated = (
    evaluations: ReviewResponse[],
    classId: number
): ReviewResponse | undefined => {
    return evaluations.find(e => e.classId === classId);
};
