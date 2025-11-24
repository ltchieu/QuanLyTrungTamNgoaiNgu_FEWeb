import "../css/course.css";
import thumnailCourse1 from "../images/thumbnail-khoa-hoc-pre-ielts-768x403.jpg";
import thumnailCourse2 from "../images/thumbnail-khoa-hoc-ielts-cap-toc-768x403.jpg";
import thumnailCourse3 from "../images/thumbnail-khoa-hoc-ielts-5.0-va-5.5-768x403.jpg";
import {
  faCircleCheck,
  faMedal,
  faCalendarAlt,
  faClock,
  faChalkboardTeacher,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  BoxProps,
  Button,
  Typography,
  Divider,
  Chip,
  RadioGroup,
  Paper,
  Radio,
  Stack,
} from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import CourseModuleDetails from "../componets/course_content_detail";
import { CourseCardProps } from "../componets/course_recommend_card";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getCourseDetail,
  getImageUrl,
  getSuggestCourse,
} from "../services/course_services";
import { CourseModel } from "../model/course_model";
import CourseRecommendCard from "../componets/course_recommend_card";

function Course() {
  const { id } = useParams();
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();

  const [course, setCourse] = useState<CourseModel | null>(null);
  const [recomendCourse, setRecomendCourse] = useState<CourseCardProps[]>([]);

  // State lưu ID lớp học được chọn
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseDetail(id);
        setCourse(res.data.data);
        // Reset chọn lớp khi load khóa học mới
        setSelectedClassId(null);
      } catch (error) {
        console.error("Lỗi khi tải khóa học:", error);
      }
    };

    const fetchRecomendCourse = async () => {
      try {
        const response = await getSuggestCourse(id);
        const apiData = response.data.data;

        if (Array.isArray(apiData)) {
          const formattedCourses: CourseCardProps[] = apiData.map((course) => ({
            imageSrc: course.image,
            title: course.courseName,
            summaryItems: [
              `${course.numberOfSessions ?? 20} buổi - ${
                course.studyHours ?? 40
              } giờ học`,
              "Hình thức: Offline",
              course.description,
            ],
          }));

          setRecomendCourse(formattedCourses);
        } else {
          console.error(
            "Dữ liệu khóa học đề xuất không phải là mảng:",
            apiData
          );
          setRecomendCourse([]);
        }
      } catch (err) {
        console.error("Lỗi khi tải đề xuất khóa học:", err);
      }
    };

    fetchCourse();
    fetchRecomendCourse();
  }, [id]);

  const categoryIdFromUrl = searchParams.get("categoryId");

  // --- HÀM XỬ LÝ ĐĂNG KÝ MỚI ---
  const handleRegister = () => {
    if (!course || !selectedClassId) return;

    const params = new URLSearchParams();

    const finalCategoryId = categoryIdFromUrl

    if (finalCategoryId) {
        params.append("categoryId", String(finalCategoryId));
    }

    params.append("courses", String(course.courseId));
    params.append("classId", String(selectedClassId));

    navigate(`/register?${params.toString()}`);
  };

  const linkYoutube = "https://www.youtube.com/embed/";

  const rowContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  };

  const columnContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const headerTextStyle = {
    fontWeight: "bold",
    fontFamily: "'Barlow', Sans-serif",
    textAlign: "left",
  };

  const rowHeaderTextStyle = {
    fontWeight: "bold",
    fontFamily: "'Barlow', Sans-serif",
    fontSize: 19,
  };

  const inputIconStyle: CSSProperties = {
    color: "#7A7A7A",
    position: "relative",
    top: 9,
  };

  const outputIconStyle: CSSProperties = {
    color: "#FD3F00",
    position: "relative",
    top: 3.5,
  };

  const tableContentStyle = {
    pl: "10px",
  };

  const ulStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
  };

  if (!course) return <Typography>Đang tải...</Typography>;
  return (
    <>
      {/* Course detail */}
      <Box
        {...rowContainterProps}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "stretch" }, // Dùng stretch để sticky hoạt động tốt
          gap: 2,
          margin: "0 auto",
          padding: "10px",
          maxWidth: "1200px", // Giới hạn chiều rộng để đẹp hơn trên màn to
        }}
      >
        {/* First column */}
        <Box
          {...columnContainterProps}
          sx={{
            width: { xs: "95%", md: "65%" },
            margin: "10px",
            padding: "10px",
            order: { xs: 2, md: 1 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#414040ff",
              textAlign: "left",
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {course.category} - {course.courseName}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#414040ff", textAlign: "left", mt: 2 }}
          >
            {course.description}
          </Typography>

          {/* Hiển thị số lượng học viên */}
          <Box
            {...rowContainterProps}
            sx={{ alignItems: "center", mt: 2, justifyContent: "flex-start" }}
          >
            <FontAwesomeIcon icon={faMedal} style={{ color: "#FD3F00" }} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              Level: {course.level}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ ...headerTextStyle, mt: 10 }}>
              Bạn sẽ đạt được gì sau {course.courseName}
            </Typography>
          </Box>

          {/* Mục tiêu đầu ra của khóa học */}
          <Box
            sx={{
              border: "solid",
              borderWidth: 1,
              borderColor: "#A2A2A2",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.5)",
              borderRadius: "15px",
              mt: 2,
              width: "100%",
            }}
          >
            <Box {...rowContainterProps} padding="10px">
              <Box sx={{ flex: 1, padding: "10px" }}>
                <ul className="list-condition" style={{ ...ulStyle }}>
                  {course.objectives.map((obj) => (
                    <li
                      key={obj.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginTop: 10,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ ...outputIconStyle }}
                      />
                      <Typography variant="body1" sx={{ ...tableContentStyle }}>
                        {obj.objectiveName}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>

          {/* Nội dung khóa học*/}
          <Box sx={{ textAlign: "left", mt: 7, mb: 3 }}>
            <Typography variant="h5" sx={{ fontSize: 25, fontWeight: "bold" }}>
              Nội dung chương trình học
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 2, color: "rgb(44 43 43 / 78%)" }}
            >
              <span>{course.studyHours}</span>h giờ học trên lớp
            </Typography>
          </Box>

          <Box>
            {course && <CourseModuleDetails modules={course.modules} />}
          </Box>
        </Box>

        {/* Second column (Sidebar) */}
        <Box
          sx={{
            width: { xs: "97%", md: "32%" },
            margin: "10px",
            order: { xs: -1, md: 2 },
            position: "relative",
          }}
        >
          <Box
            {...columnContainterProps}
            sx={{
              width: "100%",
              position: { xs: "static", md: "sticky" },
              top: "100px",
              borderRadius: "20px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              padding: "20px",
              backgroundColor: "white",
              zIndex: 10,
            }}
          >
            {/* Video Thumbnail */}
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "15px",
                aspectRatio: "16 / 9",
                mb: 2,
              }}
            >
              <Box
                component="iframe"
                width="100%"
                height="100%"
                src={course.video.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>

            {/* Course name */}
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#003E83" }}
              >
                {course.courseName}
              </Typography>
            </Box>

            {/* Tuition fee */}
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#FF4500" }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course.tuitionFee)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Chip
                label="LỊCH KHAI GIẢNG"
                color="primary"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </Divider>

            {/* --- DANH SÁCH LỚP HỌC --- */}
            <Box sx={{ maxHeight: "350px", overflowY: "auto", pr: 0.5 }}>
              {course.classInfos && course.classInfos.length > 0 ? (
                <RadioGroup
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(Number(e.target.value))}
                >
                  <Stack spacing={1.5}>
                    {course.classInfos.map((cls) => (
                      <Paper
                        key={cls.classId}
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          borderColor:
                            selectedClassId === cls.classId
                              ? "#FF4500"
                              : "#e0e0e0",
                          backgroundColor:
                            selectedClassId === cls.classId
                              ? "#fff5f2"
                              : "white",
                          "&:hover": {
                            borderColor: "#FF4500",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          },
                          position: "relative",
                        }}
                        onClick={() => setSelectedClassId(cls.classId)}
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
                              color="#003E83"
                              sx={{ lineHeight: 1.3, mb: 0.5 }}
                            >
                              {cls.className}
                            </Typography>

                            <Stack spacing={0.5}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  style={{ width: 14, color: "#666" }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  KG:{" "}
                                  {new Date(cls.startDate).toLocaleDateString(
                                    "vi-VN"
                                  )}
                                </Typography>
                              </Stack>

                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <FontAwesomeIcon
                                  icon={faClock}
                                  style={{ width: 14, color: "#666" }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {cls.schedulePattern} (
                                  {cls.startTime.slice(0, 5)} -{" "}
                                  {cls.endTime.slice(0, 5)})
                                </Typography>
                              </Stack>

                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <FontAwesomeIcon
                                  icon={faChalkboardTeacher}
                                  style={{ width: 14, color: "#666" }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  GV: {cls.instructorName}
                                </Typography>
                              </Stack>

                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <FontAwesomeIcon
                                  icon={faDoorOpen}
                                  style={{ width: 14, color: "#666" }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {cls.roomName}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </RadioGroup>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Hiện chưa có lịch khai giảng.
                  </Typography>
                  <Button size="small" sx={{ mt: 1, textTransform: "none" }}>
                    Đăng ký nhận tư vấn
                  </Button>
                </Box>
              )}
            </Box>

            {/* Button đăng ký khóa học */}
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                // UX: Disable nếu chưa chọn lớp
                disabled={!selectedClassId}
                sx={{
                  backgroundColor: "#FF4500",
                  color: "white",
                  height: 50,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  padding: "12px 24px",
                  boxShadow: "0 4px 10px rgba(255, 69, 0, 0.3)",
                  ":hover": {
                    backgroundColor: "#d13a00",
                    boxShadow: "0 6px 15px rgba(255, 69, 0, 0.4)",
                  },
                  "&:disabled": {
                    backgroundColor: "#ccc",
                    color: "#666",
                  },
                }}
                onClick={handleRegister}
              >
                {selectedClassId ? "ĐĂNG KÝ NGAY" : "VUI LÒNG CHỌN LỚP"}
              </Button>

              <Typography
                variant="caption"
                display="block"
                align="center"
                color="text.secondary"
                mt={2}
                sx={{ fontStyle: "italic" }}
              >
                * Cam kết đầu ra bằng văn bản.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Introduce more course */}
      <Box
        sx={{
          maxWidth: "1140px",
          margin: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {recomendCourse.map((course) => (
          <CourseRecommendCard
            key={course.title}
            imageSrc={getImageUrl(course.imageSrc)}
            title={course.title}
            summaryItems={course.summaryItems}
          />
        ))}
      </Box>
    </>
  );
}
export default Course;
