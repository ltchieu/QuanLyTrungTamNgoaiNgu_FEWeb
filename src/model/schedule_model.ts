export interface WeeklyScheduleResponse {
  weekStart: string; // LocalDate
  weekEnd: string; // LocalDate
  days: DaySchedule[];
}

export interface DaySchedule {
  date: string; // LocalDate
  dayName: string;
  periods: PeriodSchedule[];
}

export interface PeriodSchedule {
  period: string; // Sáng / Chiều / Tối
  sessions: SessionInfo[];
}

export interface SessionInfo {
  sessionId: number;
  className: string;
  courseName: string;
  roomName: string;
  instructorName: string;
  status: string;
  note: string;
  schedulePattern: string;
  sessionDate: string; // LocalDate
}
