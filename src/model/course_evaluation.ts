export interface CourseEvaluation {
    maDanhGia?: number;
    soSao: number;
    nhanXet: string;
    maCTHD: number; // Invoice Detail ID
    courseId: number;
    courseName: string;
    submittedDate?: string;
}
