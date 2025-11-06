import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Paper,
  Alert,
} from "@mui/material";

// ===== MOCK DATA (thay bằng API sau) =====
const mockDanhMuc = [
  {
    id: 1,
    name: "IELTS Foundation",
    courses: [
      { id: 101, name: "Writing Foundation", tuitionFee: 1500000 },
      { id: 102, name: "Listening Basics", tuitionFee: 1300000 },
      { id: 103, name: "Reading Mastery", tuitionFee: 1700000 },
    ],
  },
  {
    id: 2,
    name: "IELTS Advanced",
    courses: [
      { id: 201, name: "Speaking Intensive", tuitionFee: 2000000 },
      { id: 202, name: "Advanced Writing", tuitionFee: 2200000 },
      { id: 203, name: "Full Mock Test", tuitionFee: 2500000 },
    ],
  },
];

export default function CoursePackageRegister() {
  // ================== STATE ==================
  const [selectedDanhMuc, setSelectedDanhMuc] = useState<number | "">("");
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Thông tin học viên
  const [studentInfo, setStudentInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  // ================== DERIVED ==================
  const currentCourses = useMemo(() => {
    return mockDanhMuc.find((dm) => dm.id === selectedDanhMuc)?.courses || [];
  }, [selectedDanhMuc]);

  const totalFee = useMemo(() => {
    return currentCourses
      .filter((c) => selectedCourses.includes(c.id))
      .reduce((sum, c) => sum + c.tuitionFee, 0);
  }, [selectedCourses, currentCourses]);

  // ================== HANDLER ==================
  const handleDanhMucChange = (e: any) => {
    setSelectedDanhMuc(e.target.value);
    setSelectedCourses([]);
  };

  const handleCourseToggle = (courseId: number) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    setError(null);
    setSuccess(null);

    // ==== Kiểm tra dữ liệu ====
    if (!studentInfo.fullName || !studentInfo.email || !studentInfo.phone) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    if (!selectedDanhMuc) {
      setError("Vui lòng chọn danh mục khóa học.");
      return;
    }
    if (selectedCourses.length === 0) {
      setError("Vui lòng chọn ít nhất một khóa học.");
      return;
    }

    // ==== Giả lập gọi API ====
    console.log({
      ...studentInfo,
      selectedDanhMuc,
      selectedCourses,
      totalFee,
    });

    setSuccess(
      `🎉 Đăng ký thành công ${selectedCourses.length} khóa học với tổng học phí: ${totalFee.toLocaleString()}đ`
    );

    // reset form
    setSelectedCourses([]);
    setSelectedDanhMuc("");
    setStudentInfo({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    });
  };

  // ================== RENDER ==================
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 8,
        p: 4,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Đăng ký khóa học trọn gói
      </Typography>

      {/* Thông báo */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* ========== THÔNG TIN HỌC VIÊN ========== */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Thông tin học viên
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <TextField
            label="Họ và tên *"
            name="fullName"
            value={studentInfo.fullName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email *"
            name="email"
            value={studentInfo.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Số điện thoại *"
            name="phone"
            value={studentInfo.phone}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Địa chỉ"
            name="address"
            value={studentInfo.address}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <TextField
          sx={{ mt: 2 }}
          label="Ghi chú"
          name="note"
          value={studentInfo.note}
          onChange={handleInputChange}
          multiline
          rows={3}
          fullWidth
        />
      </Paper>

      {/* ========== DANH MỤC ========== */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Chọn danh mục khóa học</InputLabel>
        <Select
          value={selectedDanhMuc}
          onChange={handleDanhMucChange}
          label="Chọn danh mục khóa học"
        >
          {mockDanhMuc.map((dm) => (
            <MenuItem key={dm.id} value={dm.id}>
              {dm.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ========== KHÓA HỌC ========== */}
      {selectedDanhMuc && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Chọn khóa học trong danh mục:
          </Typography>
          <FormGroup>
            {currentCourses.map((course) => (
              <FormControlLabel
                key={course.id}
                control={
                  <Checkbox
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCourseToggle(course.id)}
                  />
                }
                label={`${course.name} - ${course.tuitionFee.toLocaleString()}đ`}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      {/* ========== THÀNH TIỀN + NÚT XÁC NHẬN ========== */}
      {selectedCourses.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight="bold">
            Thành tiền:{" "}
            <Box component="span" color="primary.main">
              {totalFee.toLocaleString()}đ
            </Box>
          </Typography>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4, px: 4, fontWeight: "bold" }}
        onClick={handleRegister}
      >
        Xác nhận đăng ký
      </Button>
    </Box>
  );
}
