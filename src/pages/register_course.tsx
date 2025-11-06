import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterCoursePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    occupation: "",
    englishLevel: "",
    category: state?.categoryName || "",
    course: state?.courseName || "",
    paymentMethod: "Tiền mặt",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.course) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    // Gọi API đăng ký khóa học
    console.log("Form data gửi tới backend:", form);
    alert("Đăng ký khóa học thành công!");
    navigate("/");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Đăng ký khóa học
      </Typography>

      <TextField
        name="category"
        label="Danh mục khóa học"
        fullWidth
        sx={{ mb: 2 }}
        value={form.category}
        disabled
      />
      <TextField
        name="course"
        label="Khóa học"
        fullWidth
        sx={{ mb: 2 }}
        value={form.course}
        disabled
      />

      <TextField
        name="name"
        label="Họ tên"
        fullWidth
        sx={{ mb: 2 }}
        value={form.name}
        onChange={handleChange}
      />
      <TextField
        name="phone"
        label="Số điện thoại"
        fullWidth
        sx={{ mb: 2 }}
        value={form.phone}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        name="address"
        label="Địa chỉ"
        fullWidth
        sx={{ mb: 2 }}
        value={form.address}
        onChange={handleChange}
      />

      <Select
        name="gender"
        fullWidth
        value={form.gender}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="Nam">Nam</MenuItem>
        <MenuItem value="Nữ">Nữ</MenuItem>
      </Select>

      <TextField
        name="occupation"
        label="Nghề nghiệp"
        fullWidth
        sx={{ mb: 2 }}
        value={form.occupation}
        onChange={handleChange}
      />
      <TextField
        name="englishLevel"
        label="Trình độ ngoại ngữ"
        fullWidth
        sx={{ mb: 2 }}
        value={form.englishLevel}
        onChange={handleChange}
      />

      <Select
        name="paymentMethod"
        fullWidth
        value={form.paymentMethod}
        onChange={handleChange}
        sx={{ mb: 3 }}
      >
        <MenuItem value="Tiền mặt">Tiền mặt</MenuItem>
        <MenuItem value="Chuyển khoản">Chuyển khoản</MenuItem>
      </Select>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Xác nhận đăng ký
      </Button>
    </Box>
  );
};

export default RegisterCoursePage;
