import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  isSameDay,
  parseISO,
} from "date-fns";
import { vi } from "date-fns/locale";

// Icons
import PrintIcon from "@mui/icons-material/Print";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import EventIcon from "@mui/icons-material/Event";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { WeeklyScheduleResponse, SessionInfo } from "../model/schedule_model";
import { getWeeklySchedule } from "../services/schedule_service";
import useAxiosPrivate from "../hook/useAxiosPrivate";

// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU
interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  timeSlot: "Sáng" | "Chiều" | "Tối";
  status: SessionStatus;
  details: string;
  startTime: string;
  endTime: string;
  roomName: string;
  instructorName: string;
}

type SessionStatus = "Completed" | "Canceled" | "NotCompleted";

// 3. CÁC HẰNG SỐ GIAO DIỆN
const TIME_SLOTS = ["Sáng", "Chiều", "Tối"];

const LEGEND_ITEMS: { label: string; status: SessionStatus }[] = [
  { label: "Đã hoàn thành", status: "Completed" },
  { label: "Đã hủy", status: "Canceled" },
  { label: "Chưa hoàn thành", status: "NotCompleted" },
];

const COLORS: Record<SessionStatus, string> = {
  Completed: "#a5d6a7",      // Green - Completed
  Canceled: "#ef9a9a",        // Red - Canceled
  NotCompleted: "#90caf9",    // Blue - Not Completed
};

const mapSessionToUi = (session: SessionInfo): ScheduleItem => {
  const getStatus = (): SessionStatus => {
    // Map backend status to frontend SessionStatus
    if (session.status === "Completed") return "Completed";
    if (session.status === "Canceled") return "Canceled";
    return "NotCompleted";
  };

  // Calculate end time
  const calculateEndTime = (startTime: string, durationMinutes: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  return {
    id: session.sessionId.toString(),
    title: session.courseName,
    date: session.sessionDate,
    timeSlot: "Sáng", // Will be overridden
    status: getStatus(),
    details: `${session.roomName} - GV: ${session.instructorName}`,
    startTime: session.startTime,
    endTime: calculateEndTime(session.startTime, session.durationMinutes),
    roomName: session.roomName,
    instructorName: session.instructorName,
  };
};

// 4. COMPONENT CON: Hiển thị 1 ô lịch
const ScheduleItemCard: React.FC<{ item: ScheduleItem }> = ({ item }) => (
  <Paper
    elevation={1}
    sx={{
      p: 1,
      mb: 0.5,
      backgroundColor: COLORS[item.status],
      borderLeft: `5px solid ${COLORS[item.status]}`,
    }}
  >
    <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
      {item.title}
    </Typography>
    <Typography variant="caption" display="block" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <FontAwesomeIcon icon={faClock} size="sm" />
      {item.startTime} - {item.endTime}
    </Typography>
    <Typography variant="caption" display="block" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <FontAwesomeIcon icon={faLocationDot} size="sm" />
      {item.roomName}
    </Typography>
    <Typography variant="caption" display="block" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <FontAwesomeIcon icon={faChalkboardTeacher} size="sm" />
      {item.instructorName}
    </Typography>
  </Paper>
);

// 5. COMPONENT CON: Hiển thị chú thích
const ScheduleLegend: React.FC = () => (
  <Paper
    elevation={0}
    sx={{ p: 1.5, mt: 1, border: "1px solid #ddd", borderRadius: 1 }}
  >
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      justifyContent="center"
    >
      {LEGEND_ITEMS.map(({ label, status }) => (
        <Box key={status} display="flex" alignItems="center" gap={0.5}>
          <Box
            sx={{
              width: 20,
              height: 14,
              backgroundColor: COLORS[status],
              border: "1px solid #ccc",
              borderRadius: "2px",
            }}
          />
          <Typography variant="caption">{label}</Typography>
        </Box>
      ))}
    </Stack>
  </Paper>
);

// 6. COMPONENT CHÍNH: WeeklySchedule
const WeeklySchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState<WeeklyScheduleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const formattedDate = format(currentDate, "yyyy-MM-dd");
        console.log("Fetching schedule for:", formattedDate);
        const response = await getWeeklySchedule(axiosPrivate, formattedDate);
        console.log("Schedule Response:", response);
        if (response.data) {
          setScheduleData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch schedule", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [currentDate, axiosPrivate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  }, [currentDate]);

  // Handlers
  const handleToday = () => setCurrentDate(new Date());
  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setCurrentDate(newDate);
    }
  };

  // Helper to normalize period from API
  const normalizePeriod = (period: string): "Sáng" | "Chiều" | "Tối" => {
    const p = period.toLowerCase();
    if (p.includes("sáng") || p.includes("morning") || p.includes("sang")) return "Sáng";
    if (p.includes("chiều") || p.includes("afternoon") || p.includes("chieu")) return "Chiều";
    if (p.includes("tối") || p.includes("evening") || p.includes("toi")) return "Tối";
    return "Sáng";
  };

  // Flatten schedule data for easier rendering
  const scheduleItems = useMemo(() => {
    if (!scheduleData) return [];
    const items: ScheduleItem[] = [];

    scheduleData.days.forEach(day => {
      day.periods.forEach(period => {
        period.sessions.forEach(session => {
          const item = mapSessionToUi(session);

          item.timeSlot = normalizePeriod(period.period);
          items.push(item);
        });
      });
    });
    return items;
  }, [scheduleData]);


  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      {/* === TOOLBAR === */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ mr: 2, color: "#3949ab" }}>
          Lịch học theo tuần
        </Typography>

        <DatePicker
          label="Lịch tuần"
          value={currentDate}
          onChange={handleDateChange}
          format="dd/MM/yyyy"
          slotProps={{ textField: { size: "small", sx: { width: 160 } } }}
        />
        <Button
          variant="outlined"
          startIcon={<EventIcon />}
          onClick={handleToday}
        >
          Hiện tại
        </Button>
        <Button variant="outlined" startIcon={<PrintIcon />}>
          In lịch
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          startIcon={<NavigateBeforeIcon />}
          onClick={handlePrevWeek}
        >
          Trở về
        </Button>
        <Button
          variant="contained"
          endIcon={<NavigateNextIcon />}
          onClick={handleNextWeek}
        >
          Tiếp
        </Button>
      </Paper>

      {/* === LỊCH HỌC === */}
      <TableContainer component={Paper} sx={{ border: "1px solid #ccc" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ minWidth: 700, borderCollapse: "collapse", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "90px",
                    minWidth: "90px",
                    maxWidth: "90px",
                    bgcolor: "#f4f6f8",
                    border: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Ca học
                </TableCell>
                {weekDays.map((day) => (
                  <TableCell
                    key={day.toISOString()}
                    sx={{
                      width: `calc((100% - 90px) / 7)`,
                      bgcolor: "#3949ab",
                      color: "white",
                      border: "1px solid #ddd",
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    {format(day, "EEEE", { locale: vi })}
                    <br />
                    {format(day, "dd/MM/yyyy")}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {TIME_SLOTS.map((slot) => (
                <TableRow key={slot}>
                  {/* Cột Ca học */}
                  <TableCell
                    sx={{
                      width: "90px",
                      minWidth: "90px",
                      maxWidth: "90px",
                      bgcolor: "#fffde7",
                      border: "1px solid #ddd",
                      textAlign: "center",
                      fontWeight: "bold",
                      verticalAlign: "top",
                    }}
                  >
                    {slot}
                  </TableCell>

                  {/* 7 Cột ngày */}
                  {weekDays.map((day) => {
                    const items = scheduleItems.filter(
                      (item) => {
                        // Compare dates as strings YYYY-MM-DD to avoid timezone issues
                        const itemDateStr = item.date; // Assuming item.date is YYYY-MM-DD from API
                        const dayStr = format(day, "yyyy-MM-dd");
                        return itemDateStr === dayStr && item.timeSlot === slot;
                      }
                    );

                    return (
                      <TableCell
                        key={day.toISOString()}
                        sx={{
                          border: "1px solid #eee",
                          verticalAlign: "top",
                          minHeight: 150,
                          p: 0.5,
                          overflow: "hidden",
                        }}
                      >
                        {items.map((item) => (
                          <ScheduleItemCard key={item.id} item={item} />
                        ))}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* === CHÚ THÍCH === */}
      <ScheduleLegend />
    </Container>
  );
};

export default WeeklySchedule;