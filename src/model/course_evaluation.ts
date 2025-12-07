// Request body khi submit đánh giá
export interface CourseEvaluation {
    classId: number;           // ID của lớp học (bắt buộc)
    teacherRating: number;     // Điểm giảng viên 1-5 (bắt buộc)
    facilityRating: number;    // Điểm cơ sở vật chất 1-5 (bắt buộc)
    overallRating: number;     // Điểm hài lòng chung 1-5 (bắt buộc)
    comment?: string;          // Nhận xét (không bắt buộc)
}

// Response từ backend sau khi submit hoặc get reviews
export interface ReviewResponse {
    reviewId: number;
    classId: number;
    className: string;
    courseId: number;
    courseName: string;
    courseImage: string;
    teacherRating: number;      // Điểm giảng viên
    facilityRating: number;     // Điểm cơ sở vật chất
    overallRating: number;      // Điểm hài lòng chung
    comment?: string;
    // Thông tin học viên (cho view admin/teacher)
    studentId?: number;
    studentName?: string;
    studentAvatar?: string;
}
