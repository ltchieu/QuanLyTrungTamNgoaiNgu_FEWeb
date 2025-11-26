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
import { WeeklyScheduleResponse, SessionInfo } from "../model/schedule_model";
import { getWeeklySchedule } from "../services/schedule_service";
import useAxiosPrivate from "../hook/useAxiosPrivate";

// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU
interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  timeSlot: "Sáng" | "Chiều" | "Tối";
  type: ScheduleType;
  details: string;
}

type ScheduleType = "Nghe" | "Nói" | "Đọc" | "Viết" | "tamngung";

// 3. CÁC HẰNG SỐ GIAO DIỆN
const TIME_SLOTS = ["Sáng", "Chiều", "Tối"];

const LEGEND_ITEMS: { label: string; type: ScheduleType }[] = [
  { label: "Nghe", type: "Nghe" },
  { label: "Nói", type: "Nói" },
  { label: "Đọc", type: "Đọc" },
  { label: "Viết", type: "Viết" },
  { label: "Lịch tạm ngưng", type: "tamngung" },
];

const COLORS: Record<ScheduleType, string> = {
  Nghe: "#90caf9",
  Nói: "#a5d6a7",
  Đọc: "#fff59d",
  Viết: "#f3f3f3",
  tamngung: "#ef9a9a",
};

const mapSessionToUi = (session: SessionInfo): ScheduleItem => {
  const getType = (): ScheduleType => {
    // Ưu tiên 1: Tạm ngưng
    if (session.status === "Tạm dừng") return "tamngung";

    // Ưu tiên 2: Dựa vào tên khóa học hoặc kỹ năng (nếu có)
    const lowerName = session.courseName.toLowerCase();
    if (lowerName.includes("listening") || lowerName.includes("nghe")) return "Nghe";
    if (lowerName.includes("speaking") || lowerName.includes("nói")) return "Nói";
    if (lowerName.includes("reading") || lowerName.includes("đọc")) return "Đọc";
    if (lowerName.includes("writing") || lowerName.includes("viết")) return "Viết";

    return "tamngung";
  };

  return {
    id: session.sessionId.toString(),
    title: session.courseName,
    date: session.sessionDate,
    timeSlot: "Sáng", // Will be overridden
    type: getType(),
    details: `${session.roomName} - GV: ${session.instructorName}`,
  };
};

// 4. COMPONENT CON: Hiển thị 1 ô lịch
const ScheduleItemCard: React.FC<{ item: ScheduleItem }> = ({ item }) => (
  <Paper
    elevation={1}
    sx={{
      p: 1,
      mb: 0.5,
      backgroundColor: COLORS[item.type],
      borderLeft: `5px solid ${COLORS[item.type]}`,
    }}
  >
    <Typography variant="body2" fontWeight="bold">
      {item.title}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {item.details}
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
      {LEGEND_ITEMS.map(({ label, type }) => (
        <Box key={type} display="flex" alignItems="center" gap={0.5}>
          <Box
            sx={{
              width: 20,
              height: 14,
              backgroundColor: COLORS[type],
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
          <Table sx={{ minWidth: 700, borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 90,
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
                          height: 150,
                          p: 0.5,
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