import React, { useState, useEffect, useMemo } from "react";
import {
  useSearchParams,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  FormLabel,
} from "@mui/material";
import { CourseGroupResponse } from "../model/course_model";
import { getCategoryDetail } from "../services/category_service";

interface PaymentMethod {
  maPhuongThuc: string;
  tenPhuongThuc: string;
  loaiPT: string;
}

//API mới để lấy PTTT
const getPaymentMethods = (): Promise<{ data: PaymentMethod[] }> => {
  // Giả lập API
  return new Promise((resolve) => {
    resolve({
      data: [
        { maPhuongThuc: "MOMO", tenPhuongThuc: "Ví MoMo", loaiPT: "Online" },
        { maPhuongThuc: "ZALO", tenPhuongThuc: "Ví ZaloPay", loaiPT: "Online" },
        {
          maPhuongThuc: "BANK",
          tenPhuongThuc: "Chuyển khoản",
          loaiPT: "Offline",
        },
        { maPhuongThuc: "CASH", tenPhuongThuc: "Tiền mặt", loaiPT: "Offline" },
      ],
    });
  });
};

// 5. API mới để lấy khuyến mãi
// API này sẽ nhận 1 mảng ID và trả về số tiền giảm
const getDiscount = (
  courseIds: string[]
): Promise<{ data: { discountAmount: number; description: string } }> => {
  // Giả lập logic (Backend sẽ xử lý)
  // Ví dụ: Nếu chọn 2 khóa Speaking + Writing (ID 1, 2) thì giảm
  return new Promise((resolve) => {
    let discountAmount = 0;
    let description = "Không có khuyến mãi";
    if (
      courseIds.includes("1") &&
      courseIds.includes("2") &&
      courseIds.length === 2
    ) {
      discountAmount = 1500000; // Giảm 1.5 triệu
      description = "Combo Writing + Speaking";
    }
    resolve({ data: { discountAmount, description } });
  });
};

// 6. API để submit đăng ký
const submitRegistration = (formData: any): Promise<any> => {
  console.log("Submitting:", formData);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  );
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // --- States ---
  const [categoryDetail, setCategoryDetail] =
    useState<CourseGroupResponse | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const categoryId = searchParams.get("categoryId");
  const initialCourseIdsParam = searchParams.get("courses") || "";

  const [form, setForm] = useState({
    hoTen: "",
    email: "",
    soDienThoai: "",
    matKhau: "",
    xacNhanMatKhau: "",
  });

  // Thanh toán
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  // Tính toán giá
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discount, setDiscount] = useState({ amount: 0, description: "" });
  const [finalPrice, setFinalPrice] = useState(0);

  // --- Effects ---
  useEffect(() => {
    if (!categoryId) {
      setError("Không tìm thấy mã danh mục.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const loadPageData = async () => {
      try {
        const [categoryRes, paymentRes] = await Promise.all([
          getCategoryDetail(categoryId),
          getPaymentMethods(),
        ]);

        setCategoryDetail(categoryRes);
        setPaymentMethods(paymentRes.data);
        if (paymentRes.data.length > 0) {
          setSelectedPayment(paymentRes.data[0].maPhuongThuc);
        }
      } catch (err) {
        setError("Lỗi khi tải dữ liệu trang đăng ký.");
        console.error(err);
        setLoading(false);
      }
    };

    loadPageData();
  }, [categoryId]);

  useEffect(() => {
    if (categoryDetail) {
      const initialCourseIds = initialCourseIdsParam
        ? initialCourseIdsParam.split(",")
        : [];

      const validInitialIds = initialCourseIds.filter((id) =>
        categoryDetail.courses.some((course) => String(course.courseId) === id)
      );

      console.log("validInitialIds: " + validInitialIds )
      console.log("initialCourseIds: " + initialCourseIds )
      console.log("categoryDetail: " + categoryDetail )

      setSelectedCourses(validInitialIds);
      setLoading(false);
    }
  }, [categoryDetail, initialCourseIdsParam]);

  // 2. Tính lại giá tiền và khuyến mãi khi thay đổi lựa chọn
  useEffect(() => {
    if (!categoryDetail) return;

    const selectedCourseObjects = categoryDetail.courses.filter((course) =>
      selectedCourses.includes(String(course.courseId))
    );

    const newOriginalPrice = selectedCourseObjects.reduce(
      (sum, course) => sum + course.tuitionFee,
      0
    );
    setOriginalPrice(newOriginalPrice);

    // Gọi API để check khuyến mãi
    const checkDiscount = async () => {
      const { data } = await getDiscount(selectedCourses);
      setDiscount({
        amount: data.discountAmount,
        description: data.description,
      });
      setFinalPrice(newOriginalPrice - data.discountAmount);
    };

    checkDiscount();
  }, [selectedCourses, categoryDetail]);

  // --- Handlers ---
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSelectAllToggle = () => {
    if (!categoryDetail) return;
    const allCourseIds = categoryDetail.courses.map((c) => String(c.courseId));
    if (selectedCourses.length === allCourseIds.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(allCourseIds);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate
    if (form.matKhau !== form.xacNhanMatKhau) {
      alert("Mật khẩu không khớp!");
      setSubmitting(false);
      return;
    }
    if (selectedCourses.length === 0) {
      alert("Vui lòng chọn ít nhất một khóa học.");
      setSubmitting(false);
      return;
    }

    // Tạo DTO gửi đi
    const registrationData = {
      hoTen: form.hoTen,
      email: form.email,
      soDienThoai: form.soDienThoai,
      matKhau: form.matKhau,
      maPhuongThuc: selectedPayment,
      tongTien: finalPrice,
      courseIds: selectedCourses,
    };

    try {
      await submitRegistration(registrationData);
      navigate("/thank-you");
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  // --- Render ---

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  if (!categoryDetail) {
    return (
      <Typography textAlign="center">
        Không tìm thấy chi tiết danh mục.
      </Typography>
    );
  }

  const isAllSelected =
    selectedCourses.length === categoryDetail.courses.length;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        color="#FD3F00"
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        textTransform="uppercase"
      >
        Đăng ký các khóa học
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          {/* CỘT TRÁI: FORM THÔNG TIN */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* 1. Thông tin cá nhânn */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                1. Thông tin cá nhân
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    name="hoTen"
                    label="Họ và tên"
                    value={form.hoTen}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="soDienThoai"
                    label="Số điện thoại"
                    value={form.soDienThoai}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="matKhau"
                    label="Mật khẩu"
                    type="password"
                    value={form.matKhau}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="xacNhanMatKhau"
                    label="Xác nhận mật khẩu"
                    type="password"
                    value={form.xacNhanMatKhau}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* 2. Phương thức thanh toán */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    2. Phương thức thanh toán
                  </Typography>
                </FormLabel>
                <RadioGroup
                  name="paymentMethod"
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <FormControlLabel
                      key={method.maPhuongThuc}
                      value={method.maPhuongThuc}
                      control={<Radio />}
                      label={method.tenPhuongThuc}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>

          {/* CỘT PHẢI: GIỎ HÀNG */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={2} sx={{ p: 3, position: "sticky", top: 20 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Các khóa học đã chọn
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                (Bạn có thể thay đổi lựa chọn tại đây)
              </Typography>

              {/* Danh sách Button-Checkbox */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  my: 2,
                }}
              >
                <Button
                  variant={isAllSelected ? "contained" : "outlined"}
                  onClick={handleSelectAllToggle}
                  color="secondary"
                >
                  {isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                </Button>

                {categoryDetail.courses.map((course) => {
                  const isSelected = selectedCourses.includes(String(course.courseId));
                  return (
                    <Button
                      key={course.courseId}
                      variant={isSelected ? "contained" : "outlined"}
                      onClick={() => handleCourseToggle(String(course.courseId))}
                      color="primary"
                      sx={{
                        justifyContent: "space-between",
                        textAlign: "left",
                      }}
                    >
                      <span>{course.courseName}</span>
                      <span>{course.tuitionFee.toLocaleString("vi-VN")} đ</span>
                    </Button>
                  );
                })}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Tính tiền*/}
              <List dense>
                <ListItem disableGutters>
                  <ListItemText primary="Tổng tiền" />
                  <Typography variant="subtitle1">
                    {originalPrice.toLocaleString("vi-VN")} đ
                  </Typography>
                </ListItem>
                <ListItem disableGutters sx={{ color: "green" }}>
                  <ListItemText
                    primary={`Khuyến mãi (${discount.description})`}
                  />
                  <Typography variant="subtitle1">
                    - {discount.amount.toLocaleString("vi-VN")} đ
                  </Typography>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Thành tiền"
                    sx={{ fontWeight: "bold" }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {finalPrice.toLocaleString("vi-VN")} đ
                  </Typography>
                </ListItem>
              </List>

              {/* Nút Submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={submitting || selectedCourses.length === 0}
                sx={{ mt: 2, py: 1.5 }}
              >
                {submitting ? (
                  <CircularProgress size={24} />
                ) : (
                  "Hoàn tất đăng ký"
                )}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterPage;
