export interface CourseSimpleResponse {
  courseId: number;
  courseName: string;
}

export interface PromotionResponse {
  id: number;
  name: string;
  description: string;
  discountPercent: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  active: boolean;
  promotionTypeId: number;
  promotionTypeName: string;
  courses: CourseSimpleResponse[];
}

export interface PromotionListResponse {
  code: number;
  message: string;
  data: PromotionResponse[];
}
