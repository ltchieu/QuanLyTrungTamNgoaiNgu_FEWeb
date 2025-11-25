import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  Room,
  Person,
  School,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { RegisteredCourse } from "../model/registered_course";
import { getRegisteredCourses } from "../services/registered_course_service";
import { getImageUrl } from "../services/course_services";

const RegisteredCoursePage: React.FC = () => {
  const [courses, setCourses] = useState<RegisteredCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getRegisteredCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch registered courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4, color: "#2c3e50" }}
      >
        Khóa học đã đăng ký
      </Typography>

      {courses.length === 0 ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Bạn chưa đăng ký khóa học nào.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ position: "relative", p: "10px" }}>
                  <Box
                    component="img"
                    src={getImageUrl(course.hinhAnhKhoaHoc)}
                    alt={course.tenKhoaHoc}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                    onError={(e: any) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=Course+Image";
                    }}
                  />
                  <Chip
                    label={
                      course.trangThaiThanhToan
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"
                    }
                    color={course.trangThaiThanhToan ? "success" : "warning"}
                    icon={
                      course.trangThaiThanhToan ? <CheckCircle /> : <Cancel />
                    }
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      fontWeight: "bold",
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    color="primary"
                    sx={{ minHeight: 64 }}
                  >
                    {course.tenKhoaHoc}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <School color="action" fontSize="small" />
                    <Typography variant="body1" fontWeight="500">
                      {course.tenLop}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Person color="action" fontSize="small" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Giảng viên
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {course.tenGiangVien}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Room color="action" fontSize="small" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Phòng học
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {course.tenPhong}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday color="action" fontSize="small" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Ngày bắt đầu
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {new Date(course.ngayBatDau).toLocaleDateString(
                              "vi-VN"
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTime color="action" fontSize="small" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Lịch học
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {course.lichHoc} ({course.gioBatDau.slice(0, 5)})
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RegisteredCoursePage;
