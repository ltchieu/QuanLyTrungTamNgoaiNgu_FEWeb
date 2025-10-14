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
import { CSSProperties } from "react";
import CourseModuleDetails from "../componets/course_content_detail";

function Course() {
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

  const introduceCourseContainerStyle: CSSProperties = {
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
    borderRadius: "30px",
    width: "30.33%",
    margin: "25px"
  };

  const thumbnailStyle: CSSProperties = {
    borderRadius: "26px",
    display: "inline-block",
    width: "100%",
    height: "auto",
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
    top: 9,
  };

  const tableContentStyle = {
    pl: "10px",
  };

  const ulStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
  };

  return (
    <>
      {/* Course detail */}
      <Box {...rowContainterProps}>
        {/* First column */}
        <Box
          {...columnContainterProps}
          sx={{ width: "55%", margin: "10px", padding: "10px" }}
        >
          <Typography variant="h4" sx={{ ...headerTextStyle }}>
            Khóa học <span>IELTS Writing và Speaking</span>
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
          <Box {...rowContainterProps} sx={{ alignItems: "center", mt: 2 }}>
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
              Bạn sẽ đạt được gì sau khóa học IELTS Writing và Speaking
            </Typography>
          </Box>

          {/* Bảng đầu vào, đầu ra của khóa học */}
          {/* Dòng header đầu của bảng */}
          <Box
            sx={{
              border: "solid",
              borderWidth: 1,
              borderColor: "#A2A2A2",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.5)",
              borderRadius: "15px",
              mt: 2,
            }}
          >
            <Box {...rowContainterProps}>
              <Box sx={{ width: "20%" }}></Box>
              <Box
                sx={{
                  borderRight: 1,
                  borderLeft: 1,
                  borderColor: "#A2A2A2",
                  padding: "10px",
                  flex: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    ...rowHeaderTextStyle,
                  }}
                >
                  Đầu vào
                </Typography>
              </Box>

              <Box sx={{ flex: 1, padding: "10px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    ...rowHeaderTextStyle,
                    color: "#FD3F00",
                  }}
                >
                  Đầu ra
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Dòng thứ 2 */}
          <Box
            sx={{
              border: "solid",
              borderWidth: 1,
              borderColor: "#A2A2A2",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.5)",
              borderRadius: "15px",
            }}
          >
            {/* Cột tiêu đề */}
            <Box {...rowContainterProps}>
              <Box sx={{ width: "20%" }}>
                <Typography
                  variant="body1"
                  sx={{
                    ...rowHeaderTextStyle,
                    padding: "10px",
                  }}
                >
                  Writing
                </Typography>
              </Box>

              {/* Dòng đầu vào */}
              <Box
                sx={{
                  borderRight: 1,
                  borderLeft: 1,
                  borderColor: "#A2A2A2",
                  padding: "10px",
                  flex: 1,
                }}
              >
                <ul className="list-condition" style={{ ...ulStyle }}>
                  <li>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{
                        ...inputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{
                        ...inputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{ ...inputIconStyle }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>
                </ul>
              </Box>

              {/* Đòng đầu ra */}
              <Box sx={{ flex: 1, padding: "10px" }}>
                <ul className="list-condition" style={{ ...ulStyle }}>
                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{
                        ...outputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>
                        Học và luyện Writing chuyên sâu với phương pháp PAW
                        (Procedural Approach of Writing)
                      </strong>
                      , nắm vững kỹ thuật viết bài chuẩn IELTS.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{
                        ...outputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{
                        ...outputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>

          {/* Dòng thứ 3 */}
          <Box
            sx={{
              border: "solid",
              borderWidth: 1,
              borderColor: "#A2A2A2",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.5)",
              borderRadius: "15px",
            }}
          >
            {/* Cột tiêu đề */}
            <Box {...rowContainterProps}>
              <Box sx={{ width: "20%" }}>
                <Typography
                  variant="body1"
                  sx={{
                    ...rowHeaderTextStyle,
                    padding: "10px",
                  }}
                >
                  Reading
                </Typography>
              </Box>

              {/* Dòng đầu vào */}
              <Box
                sx={{
                  borderRight: 1,
                  borderLeft: 1,
                  borderColor: "#A2A2A2",
                  padding: "10px",
                  flex: 1,
                }}
              >
                <ul className="list-condition" style={{ ...ulStyle }}>
                  <li>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{
                        ...inputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{
                        ...inputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{ ...inputIconStyle }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>
                </ul>
              </Box>

              {/* Đòng đầu ra */}
              <Box sx={{ flex: 1, padding: "10px" }}>
                <ul className="list-condition" style={{ ...ulStyle }}>
                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{
                        ...outputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>
                        Học và luyện Writing chuyên sâu với phương pháp PAW
                        (Procedural Approach of Writing)
                      </strong>
                      , nắm vững kỹ thuật viết bài chuẩn IELTS.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{
                        ...outputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{
                        ...outputIconStyle,
                      }}
                    />
                    <Typography variant="body1" sx={{ ...tableContentStyle }}>
                      <strong>Viết theo cảm tính, nghĩ gì viết đó</strong>, chưa
                      biết cách sắp xếp ý tưởng trong bài IELTS Writing.
                    </Typography>
                  </li>
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
              <span>14 </span> tuần – <span>42 </span> buổi học –{" "}
              <span>63</span>h giờ học trên lớp
            </Typography>
          </Box>

          <Box>
            <CourseModuleDetails />
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
                src={linkYoutube + "IADhKnmQMtk"} //Thay lại khi có API
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
                Khóa học IELTS <br /> Writing và Speaking
              </Typography>
            </Box>

            {/* Tuition fee */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Học phí: 10.900.000đ
              </Typography>
            </Box>

            {/* Button inbox to admin */}
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
                Nhắn tin với IPU qua Fanpage
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Introduce more course */}
      <Box {...rowContainterProps} sx={{ maxWidth: "1140px", margin: "auto" }}>
        <Box
          {...columnContainterProps}
          sx={{ ...introduceCourseContainerStyle }}
        >
          <Box sx={{padding: "10px" }}>
            <img src={thumnailCourse1} style={{ ...thumbnailStyle }} />
          </Box>
        </Box>

        <Box
          {...columnContainterProps}
          sx={{ ...introduceCourseContainerStyle }}
        >
          <Box sx={{padding: "10px" }}>
            <img src={thumnailCourse1} style={{ ...thumbnailStyle }} />
          </Box>
        </Box>

        <Box
          {...columnContainterProps}
          sx={{ ...introduceCourseContainerStyle }}
        >
          <Box sx={{padding: "10px" }}>
            <img src={thumnailCourse1} style={{ ...thumbnailStyle }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Course;
