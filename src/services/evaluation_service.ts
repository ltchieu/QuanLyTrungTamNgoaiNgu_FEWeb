import { CourseEvaluation } from "../model/course_evaluation";
import { ClassInfo } from "../model/course_model";

// Mock storage for evaluations
let mockEvaluations: CourseEvaluation[] = [
    {
        maDanhGia: 1,
        soSao: 5,
        nhanXet: "Khóa học rất bổ ích, giảng viên nhiệt tình.",
        maCTHD: 101,
        courseId: 1,
        courseName: "IELTS Foundation",
        submittedDate: "2023-10-15"
    }
];

export const submitEvaluation = async (data: CourseEvaluation): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newEvaluation = {
                ...data,
                maDanhGia: Math.floor(Math.random() * 10000),
                submittedDate: new Date().toISOString().split('T')[0]
            };
            mockEvaluations.push(newEvaluation);
            resolve(true);
        }, 800);
    });
};

export const getStudentEvaluations = async (): Promise<CourseEvaluation[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mockEvaluations]);
        }, 500);
    });
};

// Helper to check if a course (invoice detail) is already evaluated
export const isCourseEvaluated = (evaluations: CourseEvaluation[], maCTHD: number): CourseEvaluation | undefined => {
    return evaluations.find(e => e.maCTHD === maCTHD);
};
