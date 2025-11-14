import React, { useState, useMemo } from "react";
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
  parse,
} from "date-fns";
import { vi } from "date-fns/locale"; // Tiếng Việt

// Icons
import PrintIcon from "@mui/icons-material/Print";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import EventIcon from "@mui/icons-material/Event";
import { BuoiHocDto } from "../model/schedule_model";

// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU
// ---------------------------------
interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  timeSlot: "Sáng" | "Chiều" | "Tối";
  type: ScheduleType;
  details: string;
}

type ScheduleType = "Nghe" | "Nói" | "Đọc" | "Viết" | "tamngung";

// 2. MOCK DATA
// ---------------------------------
const MOCK_API_RESPONSE: BuoiHocDto[] = [
  {
    maBuoiHoc: "1",
    ngayHoc: "2025-11-10",
    gioBatDau: "08:00", 
    tenKhoaHoc: "IELTS Foundation",
    tenGiangVien: "Trần A",
    tenPhong: "Phòng A101",
    trangThai: "Đang hoạt động",
    tenKyNang: "Nghe",
  },
  {
    maBuoiHoc: "2",
    ngayHoc: "2025-11-11",
    gioBatDau: "14:00", 
    tenKhoaHoc: "IELTS Speaking",
    tenGiangVien: "Nguyễn B",
    tenPhong: "Phòng Lab 02",
    trangThai: "Đang hoạt động",
    tenKyNang: "Nói",
  },
  {
    maBuoiHoc: "3",
    ngayHoc: "2025-11-13",
    gioBatDau: "18:30",
    tenKhoaHoc: "IELTS Reading",
    tenGiangVien: "Lê C",
    tenPhong: "Phòng Online",
    trangThai: "Đang hoạt động",
    tenKyNang: "Đọc",
  },
  {
    maBuoiHoc: "4",
    ngayHoc: "2025-11-14",
    gioBatDau: "09:00",
    tenKhoaHoc: "IELTS Writing",
    tenGiangVien: "Võ D",
    tenPhong: "Giảng đường 1",
    trangThai: "Đang hoạt động",
    tenKyNang: "Viết",
  },
  {
    maBuoiHoc: "5",
    ngayHoc: "2025-11-12",
    gioBatDau: "08:00",
    tenKhoaHoc: "Nghỉ lễ 20/11",
    tenGiangVien: "Thông báo",
    tenPhong: "N/A",
    trangThai: "Tạm dừng",
    tenKyNang: "",
  },
];

// 3. CÁC HẰNG SỐ GIAO DIỆN
// ---------------------------------
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

const mapApiToUi = (dto: BuoiHocDto): ScheduleItem => {
  const getSlot = (time: string): "Sáng" | "Chiều" | "Tối" => {
    try {
      const hour = parse(time, "HH:mm", new Date()).getHours();
      if (hour < 12) return "Sáng";
      if (hour < 18) return "Chiều";
      return "Tối";
    } catch {
      return "Sáng";
    }
  };

  const getType = (): ScheduleType => {
    // Ưu tiên 1: Tạm ngưng
    if (dto.trangThai === "Tạm dừng") return "tamngung";

    // Ưu tiên 2: Dựa vào Kỹ năng
    switch (dto.tenKyNang) {
      case "Nghe":
        return "Nghe";
      case "Nói":
        return "Nói";
      case "Đọc":
        return "Đọc";
      case "Viết":
        return "Viết";
      default:
        return "tamngung";
    }
  };

  return {
    id: dto.maBuoiHoc,
    title: dto.tenKhoaHoc,
    date: dto.ngayHoc,
    timeSlot: getSlot(dto.gioBatDau),
    type: getType(),
    details: `${dto.tenPhong} - GV: ${dto.tenGiangVien}`,
  };
};

// 4. COMPONENT CON: Hiển thị 1 ô lịch
// ---------------------------------
const ScheduleItemCard: React.FC<{ item: ScheduleItem }> = ({ item }) => (
  <Paper
    elevation={1}
    sx={{
      p: 1,
      mb: 0.5,
      backgroundColor: COLORS[item.type],
      borderLeft: `5px solid ${COLORS[item.type]}`,
      borderColor: `darken(${COLORS[item.type]}, 0.2)`,
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
// ---------------------------------
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
// ---------------------------------
const WeeklySchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const apiData = MOCK_API_RESPONSE;

  const scheduleItems = useMemo(() => {
    return MOCK_API_RESPONSE.map(mapApiToUi);
  }, [apiData]);

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
                    (item) =>
                      isSameDay(parseISO(item.date), day) &&
                      item.timeSlot === slot
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
      </TableContainer>

      {/* === CHÚ THÍCH === */}
      <ScheduleLegend />
    </Container>
  );
};

export default WeeklySchedule;