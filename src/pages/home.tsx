import languagePtr from "../images/language-150x150.png";
import conversationPtr from "../images/conversation-150x150.png";
import groupPtr from "../images/group-150x150.png";
import notebookPtr from "../images/notebook-150x150.png";
import onlineLearningPtr from "../images/online-learning-150x150.png";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Grid,
  Typography,
} from "@mui/material";

function HomePage() {
  const rowContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  };

  const columnContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginTop: 2,
  };

  const couresButtonProps = {
    textTransform: "capitalize",
    backgroundColor: "transparent",
    color: "orangered",
    fontWeight: "bold",
    width: 200,
    borderRadius: 2,
    ":hover": {
      backgroundColor: "orangered",
      color: "white",
    },
  };

  return (
    <>
      <Box {...rowContainterProps}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: 2}}
        >
          Các khóa học
        </Typography>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "orangered", marginBottom: 2 }}
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

      <Box {...rowContainterProps} sx={{ marginTop: 5, marginBottom: 5 }}>
        {" "}
        {/*Dòng*/}
        {/*Các cột*/}
        <Box {...columnContainterProps}>
          <img src={languagePtr} alt="languege" style={{ width: "50%" }} />
          <Button sx={couresButtonProps}>Nền tảng</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img src={notebookPtr} alt="notebook" style={{ width: "50%" }} />
          <Button sx={couresButtonProps}>Pre-IELTS</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img
            src={onlineLearningPtr}
            alt="onlineLearning"
            style={{ width: "50%" }}
          />
          <Button sx={couresButtonProps}>Reading & Listening</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img
            src={conversationPtr}
            alt="conversation"
            style={{ width: "50%" }}
          />
          <Button sx={couresButtonProps}>Writing & Speaking</Button>
        </Box>
        <Box {...columnContainterProps}>
          <img src={groupPtr} alt="group" style={{ width: "50%" }} />
          <Button sx={couresButtonProps}>Advanced 7.0+</Button>
        </Box>
      </Box>
    </>
  );
}
export default HomePage;
