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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { CartPreviewResponse, CartPreviewRequest } from "../model/cart_model";
import { previewCart } from "../services/cart_service";

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
  const [expandedCourseId, setExpandedCourseId] = useState<string | false>(false);

  // Tính toán giá - sử dụng CartPreviewResponse
  const [cartPreview, setCartPreview] = useState<CartPreviewResponse | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

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
      const filteredDetails = courseDetails.filter((c) => 
        selectedCourses.includes(String(c.courseId))
      );

      // If no new courses to fetch, just update with filtered list to avoid duplicates
      if (newCourseIds.length === 0) {
        // Only update if the filtered list is different
        if (filteredDetails.length !== courseDetails.length) {
          setCourseDetails(filteredDetails);
        }
        return;
      }

      try {
        const responses = await Promise.all(
          newCourseIds.map((id) => getCourseDetail(id))
        );
        const newDetails = responses.map((res) => res.data.data);
        
        // Combine filtered existing details with new details, ensuring no duplicates
        const combinedDetails = [...filteredDetails, ...newDetails];
        const uniqueDetails = combinedDetails.filter(
          (course, index, self) =>
            index === self.findIndex((c) => c.courseId === course.courseId)
        );
        
        setCourseDetails(uniqueDetails);

        // Auto expand the first new course if nothing is expanded
        if (!expandedCourseId && newDetails.length > 0) {
          setExpandedCourseId(String(newDetails[0].courseId));
        }

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
          setExpandedCourseId(String(course.courseId));
          break;
        }
      }
    }
  }, [initialClassIdParam, courseDetails]);

  // 2. Tính lại giá tiền và khuyến mãi khi thay đổi lựa chọn lớp học
  useEffect(() => {
    const fetchCartPreview = async () => {
      // Get all selected class IDs
      const selectedClassIds = Object.values(selectedClasses).filter(
        (id) => id !== undefined && id !== null
      ) as number[];

      // If no classes selected, reset preview
      if (selectedClassIds.length === 0) {
        setCartPreview(null);
        return;
      }

      setLoadingPreview(true);
      try {
        const request: CartPreviewRequest = {
          courseClassIds: selectedClassIds,
        };
        const preview = await previewCart(axiosPrivate, request);
        setCartPreview(preview);
      } catch (error) {
        console.error("Error fetching cart preview:", error);
        setCartPreview(null);
      } finally {
        setLoadingPreview(false);
      }
    };

    fetchCartPreview();
  }, [selectedClasses, axiosPrivate]);

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
      tongTien: cartPreview?.summary.finalAmount || 0,
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
                <Box display="flex" flexDirection="column" gap={2}>
                  {courseDetails.map((course) => (
                    <Accordion
                      key={course.courseId}
                      expanded={expandedCourseId === String(course.courseId)}
                      onChange={(_event, isExpanded) =>
                        setExpandedCourseId(isExpanded ? String(course.courseId) : false)
                      }
                      variant="outlined"
                      sx={{
                        borderColor: selectedClasses[course.courseId] ? "#4caf50" : undefined,
                        "&.Mui-expanded": {
                          borderColor: "#FF4500",
                        }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${course.courseId}-content`}
                        id={`panel-${course.courseId}-header`}
                        sx={{
                          backgroundColor: "#f9f9f9",
                          "&.Mui-expanded": {
                            backgroundColor: "#fff5f2",
                          },
                        }}
                      >
                        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between" pr={2}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color={selectedClasses[course.courseId] ? "success.main" : "text.primary"}
                          >
                            {course.courseName}
                          </Typography>
                          {selectedClasses[course.courseId] && (
                            <Typography variant="caption" color="success.main" fontWeight="bold">
                              Đã chọn lớp
                            </Typography>
                          )}
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
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
                      </AccordionDetails>
                    </Accordion>
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
              {loadingPreview ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : cartPreview ? (
                <List dense>
                  {/* Chi tiết từng khóa học - chỉ hiển thị các khóa được chọn */}
                  {cartPreview.items
                    .filter((item) => {
                      // Check if this item's class is in selectedClasses
                      return Object.values(selectedClasses).includes(item.courseClassId);
                    })
                    .map((item) => (
                      <ListItem key={item.courseClassId} disableGutters>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="text.secondary">
                              {item.courseName} - {item.className}
                            </Typography>
                          }
                        />
                        <Typography variant="body2">
                          {item.finalPrice.toLocaleString("vi-VN")} đ
                        </Typography>
                      </ListItem>
                    ))}

                  <Divider sx={{ my: 1 }} />

                  {/* Tổng tiền gốc */}
                  <ListItem disableGutters>
                    <ListItemText primary="Tổng tiền gốc" />
                    <Typography variant="subtitle1">
                      {cartPreview.summary.totalOriginalPrice.toLocaleString(
                        "vi-VN"
                      )}{" "}
                      đ
                    </Typography>
                  </ListItem>

                  {/* Khuyến mãi combo */}
                  {cartPreview.summary.appliedCombos &&
                    cartPreview.summary.appliedCombos.length > 0 && (
                      <>
                        {cartPreview.summary.appliedCombos.map(
                          (combo, index) => (
                            <ListItem
                              key={index}
                              disableGutters
                              sx={{ color: "green" }}
                            >
                              <ListItemText
                                primary={
                                  <Box>
                                    <Typography variant="body2" color="green">
                                      {combo.comboName} (-{combo.discountPercent}
                                      %)
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {combo.courseNames.join(", ")}
                                    </Typography>
                                  </Box>
                                }
                              />
                              <Typography variant="body2" color="green">
                                -{" "}
                                {combo.discountAmount.toLocaleString("vi-VN")}{" "}
                                đ
                              </Typography>
                            </ListItem>
                          )
                        )}
                      </>
                    )}

                  {/* Khuyến mãi học viên cũ */}
                  {cartPreview.summary.returningDiscountAmount > 0 && (
                    <ListItem disableGutters sx={{ color: "green" }}>
                      <ListItemText primary="Giảm giá học viên cũ" />
                      <Typography variant="body2" color="green">
                        -{" "}
                        {cartPreview.summary.returningDiscountAmount.toLocaleString(
                          "vi-VN"
                        )}{" "}
                        đ
                      </Typography>
                    </ListItem>
                  )}

                  {/* Tổng giảm giá */}
                  {cartPreview.summary.totalDiscountAmount > 0 && (
                    <ListItem disableGutters sx={{ color: "green" }}>
                      <ListItemText
                        primary={
                          <Typography fontWeight="600" color="green">
                            Tổng giảm giá
                          </Typography>
                        }
                      />
                      <Typography variant="subtitle1" color="green" fontWeight="600">
                        -{" "}
                        {cartPreview.summary.totalDiscountAmount.toLocaleString(
                          "vi-VN"
                        )}{" "}
                        đ
                      </Typography>
                    </ListItem>
                  )}

                  <Divider sx={{ my: 1 }} />

                  {/* Thành tiền */}
                  <ListItem disableGutters>
                    <ListItemText
                      primary={
                        <Typography variant="h6" fontWeight="bold">
                          Thành tiền
                        </Typography>
                      }
                    />
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {cartPreview.summary.finalAmount.toLocaleString("vi-VN")}{" "}
                      đ
                    </Typography>
                  </ListItem>
                </List>
              ) : (
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Chọn lớp học để xem giá
                  </Typography>
                </Box>
              )}

              {/* Nút Submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={
                  submitting ||
                  selectedCourses.length === 0 ||
                  Object.keys(selectedClasses).length === 0 ||
                  !cartPreview
                }
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
