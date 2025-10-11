import "../css/course.css";
import {
  faCircleCheck,
  faCircleExclamation,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, BoxProps, Typography } from "@mui/material";
import { CSSProperties } from "react";

function Course() {
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
      <Box {...rowContainterProps}>
        {/* First column */}
        <Box {...columnContainterProps} sx={{ width: "55%" }}>
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


        </Box>

        {/* Second column */}
        <Box {...columnContainterProps}>
          <h1>This is second column</h1>
        </Box>
      </Box>
    </>
  );
}
export default Course;
