export interface CourseName{
    courseId: string
    courseName: string
}

export interface Objective {
  id: number;
  objectiveName: string;
}

//Tài liệu của module
export interface Document {
  documentId: number;
  fileName: string;
  link: string;
  description: string;
  image: string;
}

//Nội dung trong module
export interface ModuleContent {
  id: number;
  contentName: string;
}

//Mỗi module trong khóa học
export interface Module {
  moduleId: number;
  moduleName: string;
  duration: number;
  contents: ModuleContent[];
  documents: Document[];
}

// export interface Category {
//   categoryId: number;
//   categoryName: string;
// }

//Toàn bộ khóa học
export interface CourseModel {
  courseId: number;
  courseName: string;
  studyHours: number;
  tuitionFee: number;
  numberOfSessions: number;
  video: string;
  objectives: Objective[];
  modules: Module[];
  category: string;
}

//Response từ API
export interface CourseResponse {
  code: number;
  data: CourseModel;
}

export interface CourseCategoryResponse {
  id: number;
  name: string;
}