import { axiosClient } from "../api/axios_client";
import { CourseCategoryResponse, Module } from "../model/course_model";

export function getCourseName(){
    return axiosClient.get("/courses/activecourses")
}

export function getAllCategories() {
  return axiosClient.get<CourseCategoryResponse[]>("/categories");
}

export function getCourseDetail(id?: string){
    return axiosClient.get(`/courses/${id}`)
}

export function getSuggestCourse(id?: string){
    return axiosClient.get(`/courses/recommedcousres/${id}`)
}

export function getImageUrl(fileName: string): string{
  return `${axiosClient.defaults.baseURL}files/${fileName}`;
}