import { axiosClient } from "../api/axios_client";

export function getCourseName(){
    return axiosClient.get("/courses")
}

export function getCourseDetail(id?: string){
    return axiosClient.get(`/courses/${id}`)
}