import React, { useState } from "react";
import { Box, Typography, Container, SxProps, Theme, Stack } from "@mui/material";

const methodsData: { [key: string]: { label: string; content: string } } = {
  trueGrammar: {
    label: "TRUE Grammar",
    content:
      "TRUE Grammar là phương pháp luyện thi IELTS giúp người học đọc hiểu chính xác và nhanh hơn. Theo thống kê của IPU, học viên có thể hoàn thành bài đọc hiểu nhanh hơn 20-30% khi áp dụng thành thạo TRUE Grammar.",
  },
  paw: {
    label: "PAW",
    content:
      "PAW (Purpose - Audience - Writing) là phương pháp tư duy độc quyền cho IELTS Writing, giúp học viên xác định rõ mục đích, đối tượng và văn phong bài viết trước khi bắt đầu.",
  },
  switch: {
    label: "SWITCH",
    content:
      "Tư duy SWITCH là kỹ thuật luyện nói giúp học viên chuyển đổi linh hoạt giữa các chủ đề và cấu trúc câu, tăng cường sự trôi chảy (fluency) trong IELTS Speaking.",
  },
  spacedRepetition: {
    label: "Spaced Repetition",
    content:
      "Spaced Repetition (Lặp lại ngắt quãng) là kỹ thuật học từ vựng khoa học, giúp ghi nhớ lâu hơn bằng cách ôn tập từ vựng vào đúng thời điểm não bộ sắp quên.",
  },
  dictation: {
    label: "Dictation",
    content:
      "Dictation (Nghe chép chính tả) là phương pháp luyện nghe sâu, không chỉ cải thiện khả năng nhận diện âm mà còn tăng cường kỹ năng ngữ pháp và từ vựng một cách thụ động.",
  },
};

const IeltsMethods: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState("trueGrammar");

  const activeContent = methodsData[activeMethod]?.content || "";
  const inactiveColor = "rgba(230, 62, 20, 1)";
  const activeColor = "#003E83";

  // Style cơ bản cho các hình tròn
  const bubbleBaseStyle: SxProps<Theme> = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "50%",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "all 0.1s ease-in-out",
  };


  const mobileBubbleStyle: SxProps<Theme> = {
    width: 160,
    height: 160,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    mx: "auto",
    mb: 2,
    border: "solid 10px white",
    boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.5)",
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 10, py: 6, textAlign: "center" }}>
      {/* --- PHẦN TIÊU ĐỀ --- */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        CÁC PHƯƠNG PHÁP LUYỆN THI IELTS{" "}
        <Typography
          component="span"
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#FD3F00" }}
        >
          TẠI IPU
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 800, mx: "auto", mb: { xs: 2, md: 4 } }}
      >
        Lộ trình học và luyện thi IELTS tại IELTS Power Up được thiết kế dựa
        theo Khung giờ học tiếng Anh tiêu chuẩn của Cambridge. Nhưng để{" "}
        <b>rút ngắn thời gian học</b>, IPU đã áp dụng các phương pháp học thuật
        đa dạng để việc luyện thi IELTS trở nên{" "}
        <b>dễ dàng hơn, hiểu sâu về kiến thức hơn và ứng dụng được trực tiếp</b>{" "}
        trong bài thi IELTS của mình.
      </Typography>

      {/* --- KHU VỰC TƯƠNG TÁC --- */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "relative",
          width: "100%",
          maxWidth: 900,
          height: { xs: 700, md: 550 },
          mx: "auto",
        }}
      >
        {/* === VĂN BẢN TRUNG TÂM === */}
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 250, md: 300 },
            textAlign: "center",
            transition: "opacity 0.3s ease",
            opacity: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary" fontSize="16px">
            {activeContent}
          </Typography>
        </Box>

        {/* === BUBBLE 1: TRUE GRAMMAR === */}
        <Box
          onMouseEnter={() => setActiveMethod("trueGrammar")}
          sx={{
            ...bubbleBaseStyle,
            width: { xs: 140, md: 160 },
            height: { xs: 140, md: 160 },
            top: { xs: 0, md: 30 },
            left: { xs: "50%", md: 0 },
            transform: { xs: "translateX(-50%)", md: "none" },
            backgroundColor:
              activeMethod === "trueGrammar" ? activeColor : inactiveColor,
            border:
              activeMethod === "trueGrammar"
                ? "solid 10px transparent"
                : "solid 10px white",
            boxShadow:
              activeMethod === "trueGrammar"
                ? "none"
                : "5px 5px 10px 0px rgba(0,0,0,0.5)",
          }}
        >
          {methodsData.trueGrammar.label}
        </Box>

        {/* === BUBBLE 2: PAW === */}
        <Box
          onMouseEnter={() => setActiveMethod("paw")}
          sx={{
            ...bubbleBaseStyle,
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            bottom: { xs: 180, md: 80 },
            left: { xs: 20, md: 100 },
            backgroundColor:
              activeMethod === "paw" ? activeColor : inactiveColor,
            border:
              activeMethod === "paw"
                ? "solid 10px transparent"
                : "solid 10px white",
            boxShadow:
              activeMethod === "paw"
                ? "none"
                : "5px 5px 10px 0px rgba(0,0,0,0.5)",
          }}
        >
          {methodsData.paw.label}
        </Box>

        {/* === BUBBLE 3: SWITCH === */}
        <Box
          onMouseEnter={() => setActiveMethod("switch")}
          sx={{
            ...bubbleBaseStyle,
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            bottom: { xs: 50, md: 0 },
            left: { xs: "auto", md: "50%" },
            right: { xs: 20, md: "auto" },
            transform: { md: "translateX(-50%)" },
            backgroundColor:
              activeMethod === "switch" ? activeColor : inactiveColor,
            border:
              activeMethod === "switch"
                ? "solid 10px transparent"
                : "solid 10px white",
            boxShadow:
              activeMethod === "switch"
                ? "none"
                : "5px 5px 10px 0px rgba(0,0,0,0.5)",
          }}
        >
          {methodsData.switch.label}
        </Box>

        {/* === BUBBLE 4: SPACED REPETITION === */}
        <Box
          onMouseEnter={() => setActiveMethod("spacedRepetition")}
          sx={{
            ...bubbleBaseStyle,
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            bottom: { xs: 180, md: 80 },
            right: { xs: 20, md: 100 },
            backgroundColor:
              activeMethod === "spacedRepetition" ? activeColor : inactiveColor,
            border:
              activeMethod === "spacedRepetition"
                ? "solid 10px transparent"
                : "solid 10px white",
            boxShadow:
              activeMethod === "spacedRepetition"
                ? "none"
                : "5px 5px 10px 0px rgba(0,0,0,0.5)",
          }}
        >
          {methodsData.spacedRepetition.label}
        </Box>

        {/* === BUBBLE 5: DICTATION === */}
        <Box
          onMouseEnter={() => setActiveMethod("dictation")}
          sx={{
            ...bubbleBaseStyle,
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            top: { xs: 200, md: 30 },
            right: { xs: "auto", md: 0 },
            left: { xs: 20, md: "auto" },
            backgroundColor:
              activeMethod === "dictation" ? activeColor : inactiveColor,
            border:
              activeMethod === "dictation"
                ? "solid 10px transparent"
                : "solid 10px white",
            boxShadow:
              activeMethod === "dictation"
                ? "none"
                : "5px 5px 10px 0px rgba(0,0,0,0.5)",
          }}
        >
          {methodsData.dictation.label}
        </Box>
      </Box>

      {/* Phần mobile */}
      <Box sx={{ display: { xs: "block", md: "none" }, mt: 6 }}>
        <Stack spacing={4} alignItems="center">
          {Object.entries(methodsData).map(([key, { label, content }]) => (
            <Box key={key} textAlign="center">
              <Box
                sx={{
                  ...mobileBubbleStyle,
                  backgroundColor:
                    key === "trueGrammar"
                      ? inactiveColor
                      : key === "paw"
                      ? activeColor
                      : inactiveColor, 
                }}
              >
                {label}
              </Box>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 400, mx: "auto" }}
              >
                {content}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default IeltsMethods;
