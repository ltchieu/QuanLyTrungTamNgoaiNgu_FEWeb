import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CourseGroupResponse } from "../model/course_model";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryDetail } from "../services/category_service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseCommonCard from "../componets/course_common_card";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const CategoryPage = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryDetail, setCategoryDetail] = useState<CourseGroupResponse>({
    categoryId: "",
    categoryName: "",
    categoryLevel: "",
    categoryDescription: "",
    courses: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // --- Các hàm xử lý ---
  const allCourseIds = categoryDetail.courses.map((course) => course.courseId);

  const isAllSelected =
    allCourseIds.length > 0 && selectedCourses.length === allCourseIds.length;

  // Xử lý khi toggle 1 khóa học
  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  // Xử lý khi "Chọn tất cả"
  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(allCourseIds);
    }
  };

  // Xử lý khi nhấn "Đăng ký"
  const handleRegister = () => {
    if (selectedCourses.length > 0) {
      const courseIdsParam = selectedCourses.join(",");
      navigate(
      `/register?categoryId=${categoryDetail.categoryId}&courses=${courseIdsParam}`
    );
    } else {
      alert("Vui lòng chọn ít nhất một khóa học để đăng ký.");
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchCategoryDetail = async () => {
      try {
        const res = await getCategoryDetail(id);
        setCategoryDetail(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Lỗi khi tải chi tiết danh mục:", err);
      }
    };
    fetchCategoryDetail();
  }, [id]);
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
        <Typography variant="h6" ml={2}>
          Đang tải chi tiết danh mục...
        </Typography>
      </Box>
    );
  }

  if (!categoryDetail) {
    return (
      <Typography variant="h5" color="error" textAlign="center" mt={5}>
        Không tìm thấy dữ liệu cho danh mục này.
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={3} sx={{ mx: {xs: 1, md: 10}, my: 3 }}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Container>
            <Box textAlign="left">
              {/* Tiêu đề, Mô tả, Stats */}
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "rgba(26,29,175,1)" }}
              >
                {categoryDetail.categoryName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: "1.1rem" }}>
                {categoryDetail.categoryDescription}
              </Typography>{" "}
            </Box>

            {/* Phần Stats (Dữ liệu tĩnh) */}
            <Grid container width="100%">
              <Grid size={{ xs: 12, md: 11 }}>
                <Grid container spacing={2} textAlign="left">
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        10
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Năm kinh nghiệm giảng dạy tiếng Anh và đào tạo giáo viên
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        95%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Phản hồi tích cực về khóa học, giáo viên, và các chuyên
                        viên tư vấn
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        20.000+
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Học viên theo học tại hệ thống Anh ngữ Simple – IELTS
                        Power Up – TESOL Simple Education
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 1 }}></Grid>
            </Grid>
          </Container>

          <Grid container>
            <Container maxWidth="lg" sx={{ py: 5, mt: 10 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{ color: "#333" }}
              >
                Các khóa học IELTS thuộc {categoryDetail.categoryName}
              </Typography>

              <Box sx={{ mt: 4 }}>
                {categoryDetail.courses.map((course) => (
                  <CourseCommonCard key={course.courseId} course={course} />
                ))}
              </Box>
            </Container>
          </Grid>
        </Grid>

        {/* Hiển thị các khóa học */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={3}
            sx={{
              margin: "auto",
              backgroundColor: "rgba(247, 74, 0, 1)",
              py: 3,
              px: 2,
              borderRadius: 4,
              position: "sticky",
              top: 20,
            }}
          >
            <Container maxWidth="md">
              <Typography
                variant="h6"
                fontWeight="bold"
                color="white"
                gutterBottom
              >
                Đăng ký khóa học
              </Typography>

              {/* Box chứa các button chọn */}
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
                  sx={{
                    borderRadius: "30px",
                    fontWeight: "bold",
                    backgroundColor: isAllSelected ? "white" : "transparent",
                    color: isAllSelected ? "rgba(247, 74, 0, 1)" : "white",
                    borderColor: "white",
                    "&:hover": {
                      backgroundColor: isAllSelected
                        ? "#f0f0f0"
                        : "rgba(255, 255, 255, 0.1)",
                      borderColor: "white",
                    },
                  }}
                >
                  {isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                </Button>

                {/* Danh sách các khóa học */}
                {categoryDetail.courses.map((course) => {
                  const isSelected = selectedCourses.includes(course.courseId);
                  return (
                    <Button
                      key={course.courseId}
                      variant="contained"
                      onClick={() => handleCourseToggle(course.courseId)}
                      sx={{
                        borderRadius: "30px",
                        fontWeight: "bold",                        
                        textAlign: "left",
                        backgroundColor: isSelected ? "#0074FC" : "white",
                        color: isSelected ? "white": "rgba(247, 74, 0, 1)" ,
                        borderColor: "white",
                        py: 2,
                        "&:hover": {
                          backgroundColor: isSelected
                            ? "#f0f0f0"
                            : "rgba(255, 255, 255, 0.1)",
                          borderColor: "white",
                        },
                      }}
                    >
                      {course.courseName}
                    </Button>
                  );
                })}
              </Box>

              {/* Nút Đăng ký */}
              <Button
                variant="contained"
                onClick={handleRegister}
                disabled={selectedCourses.length === 0}
                sx={{
                  backgroundColor: "white",
                  color: "rgba(247, 74, 0, 1)",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  padding: "10px 26px",
                  fontSize: "1rem",
                  width: "100%",
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#003E83",
                    color: "white",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "rgba(247, 74, 0, 0.7)",
                  },
                }}
              >
                Đăng ký ngay ({selectedCourses.length})
              </Button>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryPage;
