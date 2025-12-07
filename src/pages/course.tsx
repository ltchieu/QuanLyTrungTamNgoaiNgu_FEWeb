import "../css/course.css";
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
  Alert,
  AlertTitle,
  Card,
  CardContent,
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
              `${course.numberOfSessions ?? 20} buổi - ${course.studyHours ?? 40
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
          alignItems: { xs: "center", md: "stretch" },
          gap: 2,
          margin: "0 auto",
          padding: "10px",
          maxWidth: "1200px",
        }}
      >
        {/* First column */}
        <Box
          {...columnContainterProps}
          sx={{
            width: { xs: "95%", md: "65%" },
            margin: "10px",
            padding: "10px",
          }}
        >
          {/* Category Badge */}
          <Chip
            label={course.category}
            sx={{
              bgcolor: "#003E83",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              height: 32,
              mt: 2,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              color: "#003E83",
              textAlign: "left",
              mt: 2,
              fontWeight: "bold",
              lineHeight: 1.3,
            }}
          >
            {course.courseName}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#414040ff",
              textAlign: "left",
              mt: 2,
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            {course.description}
          </Typography>

          {/* Course Info Grid */}
          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                bgcolor: "#f8f9fa",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <FontAwesomeIcon
                icon={faMedal}
                style={{ color: "#FF4500", fontSize: "20px" }}
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Đầu vào
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {course.entryLevel}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                bgcolor: "#f8f9fa",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <FontAwesomeIcon
                icon={faMedal}
                style={{ color: "#FF4500", fontSize: "20px" }}
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Đầu ra
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {course.targetLevel}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              sx={{
                ...headerTextStyle,
                color: "#003E83",
                fontSize: "28px",
                mb: 1,
              }}
            >
              Bạn sẽ đạt được gì sau khóa học
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                bgcolor: "#FF4500",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Mục tiêu đầu ra của khóa học */}
          <Box
            sx={{
              border: "2px solid",
              borderColor: "#e0e0e0",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
              borderRadius: "12px",
              mt: 3,
              width: "100%",
              bgcolor: "#fafafa",
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
          <Box sx={{ textAlign: "left", mt: 8, mb: 3 }}>
            <Typography
              variant="h4"
              sx={{ fontSize: 28, fontWeight: "bold", color: "#003E83", mb: 1 }}
            >
              Nội dung chương trình học
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                bgcolor: "#FF4500",
                borderRadius: 2,
                mb: 2,
              }}
            />

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#fff3e0",
                px: 2,
                py: 1,
                borderRadius: 2,
                border: "1px solid #FF4500",
              }}
            >
              <FontAwesomeIcon
                icon={faClock}
                style={{ color: "#FF4500" }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "600", color: "#FF4500" }}
              >
                {course.studyHours} giờ học trên lớp
              </Typography>
            </Box>
          </Box>

          <Box>
            {course.skillModules && course.skillModules.length > 0 ? (
              <Stack spacing={3}>
                {course.skillModules.map((skillGroup) => (
                  <Box key={skillGroup.skillId}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#003E83",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "#FF4500",
                        }}
                      />
                      {skillGroup.skillName}
                    </Typography>
                    <CourseModuleDetails modules={skillGroup.modules} />
                  </Box>
                ))}
              </Stack>
            ) : (
              course.modules && <CourseModuleDetails modules={course.modules} />
            )}
          </Box>

          {/* --- DANH SÁCH LỚP HỌC--- */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              sx={{ fontSize: 28, fontWeight: "bold", color: "#003E83", mb: 1 }}
            >
              Lịch khai giảng
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                bgcolor: "#FF4500",
                borderRadius: 2,
                mb: 3,
              }}
            />
            <Box sx={{ pr: 0.5 }}>
              {course.classInfos && course.classInfos.length > 0 ? (
                <RadioGroup
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(Number(e.target.value))}
                >
                  <Stack spacing={2}>
                    {course.classInfos.map((cls) => (
                      <Paper
                        key={cls.classId}
                        variant="outlined"
                        sx={{
                          p: 2,
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
                              variant="subtitle1"
                              fontWeight="bold"
                              color="#003E83"
                              sx={{ lineHeight: 1.3, mb: 1 }}
                            >
                              {cls.className}
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} flexWrap="wrap">
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
                                  variant="body2"
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
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {cls.schedulePattern} (
                                  {cls.startTime.slice(0, 5)} -{" "}
                                  {cls.endTime?.slice(0, 5)})
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
                                  variant="body2"
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
                                  variant="body2"
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
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Second column (Sidebar) */}
        <Box
          sx={{
            width: { xs: "97%", md: "32%" },
            margin: "10px",
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
            <Box sx={{ mt: 1, mx: "auto" }}>
              {course.promotionPrice ? (
                <Box display="flex" alignItems="baseline" gap={1}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#FF4500" }}
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(course.tuitionFee - course.promotionPrice)}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "line-through",
                      textDecorationStyle: "dashed",
                      color: "gray",
                      fontWeight: "normal",
                    }}
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(course.tuitionFee)}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#FF4500" }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(course.tuitionFee)}
                </Typography>
              )}
            </Box>

            {/* Combo Promotions */}
            {course.comboPromotions && course.comboPromotions.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Alert
                  severity="success"
                  icon={false}
                  sx={{
                    bgcolor: "#fff3e0",
                    border: "2px solid #FF4500",
                    borderRadius: 2,
                    "& .MuiAlert-message": {
                      width: "100%",
                    },
                  }}
                >
                  <AlertTitle
                    sx={{
                      fontWeight: "bold",
                      color: "#FF4500",
                      fontSize: "16px",
                      mb: 1,
                    }}
                  >
                    🎁 KHUYẾN MÃI ĐẶC BIỆT
                  </AlertTitle>
                  <Stack spacing={1.5}>
                    {course.comboPromotions.map((combo, index) => (
                      <Card
                        key={index}
                        sx={{
                          bgcolor: "white",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: "bold",
                              color: "#003E83",
                              mb: 1,
                            }}
                          >
                            {combo.comboName}
                          </Typography>
                          <Chip
                            label={`Giảm ${combo.discountPercent}%`}
                            size="small"
                            sx={{
                              bgcolor: "#FF4500",
                              color: "white",
                              fontWeight: "bold",
                              mb: 1,
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            Đăng ký kèm:{" "}
                            <strong>
                              {combo.requiredCourseNames.join(", ")}
                            </strong>
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Alert>
              </Box>
            )}

            <Divider sx={{ my: 2 }}>
              <Chip
                label="LỊCH KHAI GIẢNG"
                color="primary"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </Divider>

            {/* Button đăng ký khóa học */}
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                // Disable nếu chưa chọn lớp
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
