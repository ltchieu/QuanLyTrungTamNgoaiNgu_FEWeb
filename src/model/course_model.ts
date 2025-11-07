export interface CourseName{
    courseId: string
    courseName: string
}

export interface Objective {
  id: number;
  objectiveName: string;
}

export interface Document {
  documentId: number;
  fileName: string;
  link: string;
  description: string;
  image: string;
}


export interface ModuleContent {
  id: number;
  contentName: string;
}

export interface Module {
  moduleId: number;
  moduleName: string;
  duration: number;
  contents: ModuleContent[];
  documents: Document[];
}

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
}

export interface CourseResponse {
  code: number;
  data: CourseModel;
}

export interface CourseCategoryResponse {
  id: number;
  name: string;
}

export interface ActiveCourseResponse {
  courseId: string;
  courseName: string;
  tuitionFee: number;
  entryLevel: string;
  targetLevel: string;
  description: string;
  image: string;
}

export interface CourseGroupResponse {
  categoryId: string;
  categoryName: string;
  categoryLevel: string;
  categoryDescription: string;
  courses: ActiveCourseResponse[];
}