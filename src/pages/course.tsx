import "../css/course.css";
import thumnailCourse1 from "../images/thumbnail-khoa-hoc-pre-ielts-768x403.jpg";
import thumnailCourse2 from "../images/thumbnail-khoa-hoc-ielts-cap-toc-768x403.jpg";
import thumnailCourse3 from "../images/thumbnail-khoa-hoc-ielts-5.0-va-5.5-768x403.jpg";
import {
  faCircleCheck,
  faCircleExclamation,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, BoxProps, Button, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import CourseModuleDetails from "../componets/course_content_detail";
import CourseCard from "../componets/course_card";
import { useParams } from "react-router-dom";
import { getCourseDetail } from "../services/course_services";
import { CourseModel } from "../model/course";

function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseModel | null>(null);
  const thumbnails = [thumnailCourse1, thumnailCourse2, thumnailCourse3];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseDetail(id);
        setCourse(res.data.data);
      } catch (error) {
        console.error("Lỗi khi tải khóa học:", error);
      }
    };

    fetchCourse();
  }, [id]);

  
// function formatCourses(apiData: any) {
//   return apiData.map((courses, idx) => ({
//     imageSrc: thumbnails[idx % thumbnails.length],
//     title: courses.courseName,
//     summaryItems: [
//       `${courses.numberOfSessions} buổi học - ${courses.studyHours} giờ học`,
//       "Hình thức: Offline",
//       courses.description || "Chưa có mô tả khóa học.",
//     ],
//   }));
// }

  const linkYoutube = "https://www.youtube.com/embed/";

  // DỮ liệu mẫu
  const coursesData = [
    {
      imageSrc: thumnailCourse1,
      title: "IELTS Writing Foundation",
      summaryItems: [
        "Xây dựng nền tảng ngữ pháp",
        "Học cách viết câu phức",
        "Phân tích đề bài Task 2",
      ],
    },
    {
      imageSrc: thumnailCourse2,
      title: "IELTS Speaking Intensive",
      summaryItems: [
        "Luyện phát âm chuẩn IPA",
        "Chiến thuật trả lời Part 1, 2, 3",
        "Tăng cường vốn từ vựng học thuật",
      ],
    },
    {
      imageSrc: thumnailCourse3,
      title: "Khóa Luyện đề Tổng hợp",
      summaryItems: [
        "Thực hành 4 kỹ năng",
        "Giải đề thi thật các năm",
        "Mẹo quản lý thời gian hiệu quả",
      ],
    },
  ];

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
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        {/* First column */}
        <Box
          {...columnContainterProps}
          sx={{ width: "55%", margin: "10px", padding: "10px" }}
        >
          <Typography variant="h4" sx={{ ...headerTextStyle }}>
            {course.courseName}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#414040ff", textAlign: "left", mt: 2 }}
          >
            Khóa học IELTS Writing và Speaking tập trung luyện thi chuyên sâu ở
            2 kỹ năng này. Giảng viên sẽ củng cố kiến thức – cá nhân hóa nội
            dung bài giảng để các bạn học viên đạt được band điểm IELTS mục tiêu
          </Typography>

          {/* Hiển thị số lượng học viên */}
          <Box {...rowContainterProps} sx={{ alignItems: "center", mt: 2, justifyContent: "flex-start" }}>
            <FontAwesomeIcon
              icon={faUserGraduate}
              style={{ color: "#FD3F00" }}
            />
            <Typography variant="body1" sx={{ ml: 1 }}>
              300+ <span> học viên đã học</span>
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
              width: "90%",
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
              <span>{course.numberOfSessions} </span> buổi học –{" "}
              <span>{course.studyHours}</span>h giờ học trên lớp
            </Typography>
          </Box>

          <Box>
            {course && <CourseModuleDetails modules={course.modules} />}
          </Box>
        </Box>

        {/* Second column */}
        <Box sx={{ width: "23%", margin: "10px" }}>
          <Box
            {...columnContainterProps}
            sx={{
              width: "100%",
              position: "sticky",
              top: 20,
              borderRadius: "20px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              padding: "20px",
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
                src={linkYoutube + "IADhKnmQMtk?autoplay=1&mute=1"} //Thay lại khi có API
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>

            {/* Course name */}
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#003E83" }}
              >
                {course.courseName}
              </Typography>
            </Box>

            {/* Tuition fee */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Học phí:{" "}
                {new Intl.NumberFormat("vi-VN").format(course.tuitionFee)}đ
              </Typography>
            </Box>

            {/* Button đăng ký khóa học */}
            <Box sx={{ mt: 5 }}>
              <Button
                sx={{
                  backgroundColor: "#FF4500",
                  color: "white",
                  height: 50,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  padding: "12px 24px",
                  ":hover": {
                    backgroundColor: "#0074FC",
                  },
                }}
              >
                Đăng ký ngay
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Introduce more course */}
      <Box {...rowContainterProps} sx={{ maxWidth: "1140px", margin: "auto" }}>
        {coursesData.map((course) => (
          <CourseCard
            key={course.title}
            imageSrc={course.imageSrc}
            title={course.title}
            summaryItems={course.summaryItems}
          />
        ))}
      </Box>
    </>
  );
}
export default Course;
