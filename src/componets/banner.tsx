import ptr from "../images/luyen-thi-ielts-cap-toc-tai-tphcm-quan-10-qryblfjjao5ku2tle3l8m7e2ad2oead2zzak8lr8g8.png";
import { Box, BoxProps, Button, Typography } from "@mui/material";

function Banner() {
  const rowContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  };

  const columnContainterProps: BoxProps = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  };

  const headerTextStyle = {
    fontWeight: 800,
    fontFamily: "'Barlow', Sans-serif",
  };

  return (
    <Box {...rowContainterProps} sx={{ backgroundColor: "#FFF0E8" }}>
      {/* Cột 1 (chữ) */}
      <Box {...columnContainterProps} sx={{ maxWidth: 700, mb: 10 }}>
        <Box sx={{ textAlign: "left", mt: 10 }}>
          <Typography variant="h3" sx={{...headerTextStyle}}>
            Your Expert Guide to
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "#FD3F00",
              ...headerTextStyle,
            }}
          >
            IELTS Success
          </Typography>
        </Box>

        <Box sx={{ textAlign: "left", mt: 10 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Trung tâm luyện thi IELTS tại TP.HCM
          </Typography>

          <Typography variant="body1">
            Thấu hiểu các vấn đề thường gặp của người Việt, các chuyên gia IELTS
            ở IPU đã dày công nghiên cứu nên các phương pháp tư duy học thuật
            giúp học viên luyện thi IELTS
            <strong>
              {" "}
              rút ngắn thời gian học và tăng band điểm đúng với năng lực thật.
            </strong>
          </Typography>
        </Box>

        <Button
          sx={{
            backgroundColor: "#FD3F00",
            maxWidth: 200,
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
            padding: 1.3,
            mt: 6,
            ":hover": {
              backgroundColor: "#003E83",
            },
          }}
        >
          Nhận lộ trình học
        </Button>
      </Box>

      {/* Cột 2 (hình ảnh) */}
      <Box sx={{ mt: 7, mb: 7 }}>
        <img src={ptr} alt="" />
      </Box>
    </Box>
  );
}
export default Banner;
