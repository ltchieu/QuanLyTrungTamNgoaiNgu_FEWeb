import languagePtr from "../images/language-150x150.png";
import conversationPtr from "../images/conversation-150x150.png";
import groupPtr from "../images/group-150x150.png";
import notebookPtr from "../images/notebook-150x150.png";
import onlineLearningPtr from "../images/online-learning-150x150.png";
import ipuPtr from "../images/ipu-300x300.png";
import { Box, BoxProps, Button, Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import StudentFeedback from "../componets/student_feedback";
import WhyChooseUs from "../componets/why_choose_us";
import Banner from "../componets/banner";

function HomePage() {
  const rowContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const columnContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginTop: 2,
  };

  const couresButtonStyle = {
    textTransform: "capitalize",
    backgroundColor: "transparent",
    color: "orangered",
    fontWeight: "bold",
    width: 210,
    borderRadius: 2,
    fontSize: 16,
    height: 50,
    ":hover": {
      backgroundColor: "orangered",
      color: "white",
    },
  };

  return (
    <>
      <Banner />
      <Box {...rowContainterProps} sx={{ gap: 2, mt: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 800,
            marginBottom: 2,
            fontFamily: "'Barlow', Sans-serif",
          }}
        >
          Các khóa học
        </Typography>
        
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: "orangered",
            marginBottom: 2,
            fontFamily: "'Barlow', Sans-serif",
          }}
        >
          luyện thi IELTS
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: 16, fontSize: 14 }}
        >
          Các khóa học luyện thi IELTS được thiết kế dựa trên bộ tài liệu
          Cambridge và khung tham chiếu CEFR.
        </Typography>
      </Box>

      <Box
        {...rowContainterProps}
        sx={{ marginTop: 8, marginBottom: 5, gap: 7 }}
      >
        <Box {...columnContainterProps}>
          <img src={languagePtr} alt="languege" style={{ width: "50%" }} />
          <Button sx={couresButtonStyle}>Nền tảng</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img src={notebookPtr} alt="notebook" style={{ width: "50%" }} />
          <Button sx={couresButtonStyle}>Pre-IELTS</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img
            src={onlineLearningPtr}
            alt="onlineLearning"
            style={{ width: "50%" }}
          />
          <Button sx={couresButtonStyle}>Reading & Listening</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img
            src={conversationPtr}
            alt="conversation"
            style={{ width: "50%" }}
          />
          <Button sx={couresButtonStyle}>Writing & Speaking</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img src={groupPtr} alt="group" style={{ width: "50%" }} />
          <Button sx={couresButtonStyle}>Advanced 7.0+</Button>
        </Box>
      </Box>

      <Box sx={{ marginBottom: 5 }}>
        <Button
          sx={{
            backgroundColor: "rgba(27, 12, 112, 1)",
            color: "white",
            width: 200,
            height: 50,
            borderRadius: 2,
            textTransform: "capitalize",
            transition: "all 0.3s ease",
            ":hover": {
              transform: "scale(0.9)",
            },
          }}
          startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          Tìm hiểu thêm
        </Button>
      </Box>

      <Box>
        <Box
          sx={{
            background:
              "linear-gradient(90deg, #da4a15ff 25%, #9b362bff 40%, #0A2342 100%)",
            margin: "auto",
            marginBottom: 6,
            width: "60%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            borderRadius: 2,
          }}
        >
          {/* Cột */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              gap: 2,
              padding: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Những câu chuyện thành công
            </Typography>

            <Typography variant="body1" sx={{ color: "white" }}>
              IPU đã đồng hành cùng rất nhiều học viên trên con đường chinh phục
              và luyện thi IELTS.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                backgroundColor: "white",
                color: "orangered",
                width: 200,
                height: 50,
                borderRadius: 2,
                textTransform: "capitalize",
                transition: "all 0.3s ease",
                ":hover": {
                  transform: "scale(0.9)",
                },
              }}
              startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            >
              Tìm hiểu thêm
            </Button>
          </Box>
        </Box>

        {/* Phản hồi của học viên */}
        <Box>
          <StudentFeedback />
        </Box>
      </Box>

      <Box
        {...columnContainterProps}
        sx={{
          mt: 4,
          gap: 7,
        }}
      >
        {/* Dòng 1 */}
        <Box
          sx={{
            width: "64%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 7,
            ml: 6,
          }}
        >
          {/* Cột bên trái (chữ) */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Tiêu đề */}
            <Typography
              variant="h3"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "left" }}
            >
              Vì sao bạn nên chọn{" "}
              <Typography
                variant="h3"
                component="span"
                gutterBottom
                sx={{ fontWeight: "bold", color: "orangered", marginBottom: 2 }}
              >
                IELTS Power Up
              </Typography>
            </Typography>

            {/* Đoạn mô tả */}
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              IELTS Power Up (hay còn gọi là IPU) là trung tâm luyện thi IELTS
              thuộc Hệ thống Anh ngữ Toàn diện Simple với hơn 10 năm kinh nghiệm
              trong việc giảng dạy tiếng Anh cho mọi đối tượng. Với các phương
              pháp khoa học, chúng tôi đã giúp cho hàng chục nghìn học viên yêu
              thích tiếng Anh và đạt được mục tiêu của mình.
            </Typography>
          </Box>

          {/* Cột bên phải (hình ảnh) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={ipuPtr} alt="IELTS Power Up" style={{ width: "56%" }} />
          </Box>
        </Box>

        <WhyChooseUs />
      </Box>
    </>
  );
}
export default HomePage;
