export interface CourseName{
    courseId: string
    courseName: string
}

export interface Objective {
  id?: number; 
  objectiveId?: number; 
  objectiveName?: string; 
  description?: string; 
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
  description: string;
  category: string;
  level: string;
  objectives: Objective[];
  modules: Module[];
  classInfos: ClassInfo[];
}

export interface CourseResponse {
  code: number;
  data: CourseModel;
}

export interface CourseCategoryResponse {
  id: number;
  name: string;
}

export interface ClassScheduleResponse {
  classId: number;
  className: string;
  startDate: string;
  endDate: string;
  schedule: string; // e.g. "2-4-6"
  startTime: string;
  endTime: string;
  roomName: string;
  instructorName: string;
  branchName: string;
}

export interface ActiveCourseResponse {
  courseId: number | string;
  courseName: string;
  tuitionFee: number;
  promotionPrice?: number;
  entryLevel: string;
  targetLevel: string;
  description: string;
  studyHours: number | string;
  image: string;
  classScheduleResponse?: ClassScheduleResponse;
  objectives?: Objective[];
}

export interface CourseGroupResponse {
  categoryId: number | string;
  categoryName: string;
  categoryLevel: string;
  categoryDescription: string;
  courses: ActiveCourseResponse[];
}

export interface ClassInfo {
  classId: number;
  className: string;
  courseName: string;
  roomName: string;
  instructorName: string;
  startDate: string;
  endDate: string | null;
  startTime: string;
  endTime: string;
  schedulePattern: string;
  status: boolean;
  maxCapacity: number | null;
  currentEnrollment: number | null;
}