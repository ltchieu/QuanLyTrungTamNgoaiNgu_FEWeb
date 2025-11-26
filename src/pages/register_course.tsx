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
import { CourseGroupResponse, CourseModel } from "../model/course_model";
import { getCategoryDetail } from "../services/category_service";
import { getStudentInfo } from "../services/user_service";
import { getCourseDetail } from "../services/course_services";
import { StudentInfoResponse } from "../model/student";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import {
  faCalendarAlt,
  faClock,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        {
          maPhuongThuc: "VNPAY",
          tenPhuongThuc: "Thanh toán online qua VNPAY",
          loaiPT: "Online",
        },
        { maPhuongThuc: "CASH", tenPhuongThuc: "Tiền mặt", loaiPT: "Offline" },
      ],
    });
  });
};

// 5. API mới để lấy khuyến mãi
const getDiscount = (
  courseIds: string[]
): Promise<{ data: { discountAmount: number; description: string } }> => {
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
  const axiosPrivate = useAxiosPrivate();

  // --- States ---
  const [categoryDetail, setCategoryDetail] =
    useState<CourseGroupResponse | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const categoryId = searchParams.get("categoryId");
  const initialCourseIdsParam = searchParams.get("courses") || "";
  const initialClassIdParam = searchParams.get("classId");

  const [studentInfo, setStudentInfo] = useState<StudentInfoResponse | null>(null);

  // Class selection
  const [courseDetails, setCourseDetails] = useState<CourseModel[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<{ [key: string]: number }>({}); // courseId -> classId

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

        // Load student info
        try {
          const studentData = await getStudentInfo(axiosPrivate);
          setStudentInfo(studentData);
        } catch (error) {
          console.error("Failed to load student info", error);
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

      console.log("validInitialIds: " + validInitialIds)
      console.log("initialCourseIds: " + initialCourseIds)
      console.log("categoryDetail: " + categoryDetail)

      setSelectedCourses(validInitialIds);
      setLoading(false);
    }
  }, [categoryDetail, initialCourseIdsParam]);

  // Fetch details for selected courses to get class lists
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (selectedCourses.length === 0) {
        setCourseDetails([]);
        return;
      }

      // Filter out courses that are already fetched
      const newCourseIds = selectedCourses.filter(
        (id) => !courseDetails.some((c) => String(c.courseId) === id)
      );

      // Remove details for courses that are no longer selected
      setCourseDetails((prev) =>
        prev.filter((c) => selectedCourses.includes(String(c.courseId)))
      );

      if (newCourseIds.length === 0) return;

      try {
        const responses = await Promise.all(
          newCourseIds.map((id) => getCourseDetail(id))
        );
        const newDetails = responses.map((res) => res.data.data);
        setCourseDetails((prev) => [...prev, ...newDetails]);
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };

    fetchCourseDetails();
  }, [selectedCourses]);

  // Handle initial class selection from URL
  useEffect(() => {
    if (initialClassIdParam && courseDetails.length > 0) {
      const classId = Number(initialClassIdParam);
      // Find which course this class belongs to
      for (const course of courseDetails) {
        if (course.classInfos?.some((cls) => cls.classId === classId)) {
          setSelectedClasses((prev) => ({
            ...prev,
            [course.courseId]: classId,
          }));
          break;
        }
      }
    }
  }, [initialClassIdParam, courseDetails]);

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
  // Removed handleFormChange as form is no longer used

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
    // Validate
    if (!studentInfo) {
      alert("Không tìm thấy thông tin học viên.");
      setSubmitting(false);
      return;
    }
    if (selectedCourses.length === 0) {
      alert("Vui lòng chọn ít nhất một khóa học.");
      setSubmitting(false);
      return;
    }

    // Validate class selection
    const missingClassCourses = selectedCourses.filter(
      (courseId) => !selectedClasses[courseId]
    );
    if (missingClassCourses.length > 0) {
      alert("Vui lòng chọn lớp học cho tất cả các khóa học đã chọn.");
      setSubmitting(false);
      return;
    }

    // Tạo DTO gửi đi
    const registrationData = {
      hoTen: studentInfo.name,
      email: studentInfo.email,
      soDienThoai: studentInfo.phoneNumber,
      maPhuongThuc: selectedPayment,
      tongTien: finalPrice,
      courseIds: selectedCourses,
      classIds: Object.values(selectedClasses),
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
            {/* 1. Thông tin cá nhân */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                1. Thông tin cá nhân
              </Typography>
              {studentInfo ? (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Họ và tên
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {studentInfo.name}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {studentInfo.email}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Số điện thoại
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {studentInfo.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography>Đang tải thông tin...</Typography>
              )}
            </Paper>

            {/* 2. Chọn lớp học */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                2. Chọn lớp học
              </Typography>
              {selectedCourses.length === 0 ? (
                <Typography color="text.secondary">
                  Vui lòng chọn khóa học ở cột bên phải trước.
                </Typography>
              ) : (
                <Box display="flex" flexDirection="column" gap={3}>
                  {courseDetails.map((course) => (
                    <Box key={course.courseId}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                      >
                        {course.courseName}
                      </Typography>
                      {course.classInfos && course.classInfos.length > 0 ? (
                        <RadioGroup
                          value={selectedClasses[course.courseId] || ""}
                          onChange={(e) =>
                            setSelectedClasses((prev) => ({
                              ...prev,
                              [course.courseId]: Number(e.target.value),
                            }))
                          }
                        >
                          <Grid container spacing={2}>
                            {course.classInfos.map((cls) => (
                              <Grid size={{ xs: 12 }} key={cls.classId}>
                                <Paper
                                  variant="outlined"
                                  sx={{
                                    p: 2,
                                    cursor: "pointer",
                                    borderColor:
                                      selectedClasses[course.courseId] ===
                                        cls.classId
                                        ? "#FF4500"
                                        : "#e0e0e0",
                                    bgcolor:
                                      selectedClasses[course.courseId] ===
                                        cls.classId
                                        ? "#fff5f2"
                                        : "white",
                                  }}
                                  onClick={() =>
                                    setSelectedClasses((prev) => ({
                                      ...prev,
                                      [course.courseId]: cls.classId,
                                    }))
                                  }
                                >
                                  <Box display="flex" alignItems="flex-start">
                                    <Radio
                                      value={cls.classId}
                                      size="small"
                                      sx={{
                                        mt: -0.5,
                                        ml: -1,
                                        color: "#FF4500",
                                        "&.Mui-checked": { color: "#FF4500" },
                                      }}
                                    />
                                    <Box flex={1}>
                                      <Typography
                                        variant="subtitle2"
                                        fontWeight="bold"
                                      >
                                        {cls.className}
                                      </Typography>
                                      <Box
                                        display="flex"
                                        flexWrap="wrap"
                                        gap={2}
                                        mt={1}
                                      >
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          gap={0.5}
                                        >
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            style={{
                                              width: 14,
                                              color: "#666",
                                            }}
                                          />
                                          <Typography
                                            variant="caption"
                                            color="text.secondary"
                                          >
                                            KG:{" "}
                                            {new Date(
                                              cls.startDate
                                            ).toLocaleDateString("vi-VN")}
                                          </Typography>
                                        </Box>
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          gap={0.5}
                                        >
                                          <FontAwesomeIcon
                                            icon={faClock}
                                            style={{
                                              width: 14,
                                              color: "#666",
                                            }}
                                          />
                                          <Typography
                                            variant="caption"
                                            color="text.secondary"
                                          >
                                            {cls.schedulePattern} (
                                            {cls.startTime.slice(0, 5)} -{" "}
                                            {cls.endTime ? cls.endTime.slice(0, 5) : "..."})
                                          </Typography>
                                        </Box>
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          gap={0.5}
                                        >
                                          <FontAwesomeIcon
                                            icon={faChalkboardTeacher}
                                            style={{
                                              width: 14,
                                              color: "#666",
                                            }}
                                          />
                                          <Typography
                                            variant="caption"
                                            color="text.secondary"
                                          >
                                            GV: {cls.instructorName}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        </RadioGroup>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Chưa có lịch khai giảng.
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>

            {/* 3. Phương thức thanh toán */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    3. Phương thức thanh toán
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
