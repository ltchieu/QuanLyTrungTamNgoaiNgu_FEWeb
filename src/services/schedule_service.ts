import { AxiosInstance } from "axios";
import { ApiResponse } from "../model/api_respone";
import { WeeklyScheduleResponse } from "../model/schedule_model";

export const getWeeklySchedule = async (axiosInstance: AxiosInstance, date: string): Promise<ApiResponse<WeeklyScheduleResponse>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<WeeklyScheduleResponse>>("/students/schedule-by-week", {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly schedule:", error);
    throw error;
  }
};
