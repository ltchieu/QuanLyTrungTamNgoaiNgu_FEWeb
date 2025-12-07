// Request body khi submit đánh giá
export interface CourseEvaluation {
    classId: number;      // ID của lớp học (bắt buộc)
    rating: number;       // Điểm đánh giá từ 1-5 (bắt buộc)
    comment?: string;     // Nhận xét (không bắt buộc)
}

// Response từ backend sau khi submit hoặc get reviews
export interface ReviewResponse {
    reviewId: number;
    classId: number;
    className?: string;
    courseId?: number;
    courseName: string;
    courseImage?: string;
    rating: number;
    comment?: string;
    // Thông tin học viên (cho view admin/teacher)
    studentId?: number;
    studentName?: string;
    studentAvatar?: string;
}
