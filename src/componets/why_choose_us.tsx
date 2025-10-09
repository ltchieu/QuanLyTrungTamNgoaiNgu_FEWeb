import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGear,
  faChalkboardTeacher,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const WhyChooseUs: React.FC = () => {
  // Trạng thái lưu nút được chọn
  const [selected, setSelected] = useState<"brand" | "quality">("brand");

  // Nội dung tương ứng với từng nút
  const content = {
    brand: [
      {
        icon: faUserGear,
        title: "Hơn 20.000 học viên đã học tại Simple",
        text: "Trong suốt 10 năm hoạt động, Hệ thống Anh ngữ Toàn diện Simple đã giúp cho hơn 20.000 học viên yêu thích tiếng Anh và đạt được mục tiêu của mình.",
      },
      {
        icon: faChalkboardTeacher,
        title: "Nơi đào tạo hơn 4.500 giáo viên",
        text: "Tính đến nay, Simple đã đào tạo hơn 4.500 giáo viên tiếng Anh cho các trường phổ thông và trung tâm trên toàn quốc.",
      },
      {
        icon: faChalkboardTeacher,
        title: "Nơi đào tạo hơn 4.500 giáo viên",
        text: "Tính đến nay, Simple đã đào tạo hơn 4.500 giáo viên tiếng Anh cho các trường phổ thông và trung tâm trên toàn quốc.",
      },
    ],
    quality: [
      {
        icon: faMagnifyingGlass,
        title: "Phương pháp học hiện đại – mới mẻ",
        text: "Simple không chỉ giảng dạy mà còn nghiên cứu các phương pháp học giúp người Việt hấp thụ tiếng Anh toàn diện và hiệu quả.",
      },
      {
        icon: faUserGear,
        title: "Chương trình học đạt chuẩn quốc tế",
        text: "Các khóa học của Simple được thiết kế dựa trên khung CEFR và IELTS, đảm bảo học viên có thể ứng dụng thực tế.",
      },
      {
        icon: faUserGear,
        title: "Chương trình học đạt chuẩn quốc tế",
        text: "Các khóa học của Simple được thiết kế dựa trên khung CEFR và IELTS, đảm bảo học viên có thể ứng dụng thực tế.",
      },
    ],
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 6,
        mb: 6,
      }}
    >
      {/* Hàng chứa 2 nút */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={() => setSelected("brand")}
          sx={{
            backgroundColor:
              selected === "brand" ? "#FF4500" : "rgba(27, 12, 112, 1)",
            color: "white",
            width: 580,
            height: 50,
            borderRadius: 3,
            textTransform: "capitalize",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            ":hover": {
              backgroundColor:
                selected === "brand" ? "#e03e00" : "rgba(27, 12, 112, 0.85)",
            },
          }}
        >
          Thương hiệu
        </Button>

        <Button
          onClick={() => setSelected("quality")}
          sx={{
            backgroundColor:
              selected === "quality" ? "#FF4500" : "rgba(27, 12, 112, 1)",
            color: "white",
            width: 580,
            height: 50,
            borderRadius: 3,
            textTransform: "capitalize",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            ":hover": {
              backgroundColor:
                selected === "quality" ? "#e03e00" : "rgba(27, 12, 112, 0.85)",
            },
          }}
        >
          Chất lượng
        </Button>
      </Box>

      {/* Nội dung hiển thị */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          flexWrap: "wrap",
          width: "90%",
          textAlign: "left",
        }}
      >
        {content[selected].map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              minWidth: 280,
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={item.icon}
              size="3x"
              style={{ marginBottom: 16, color: "black" }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {item.title.split("đã")[0]}
              <span style={{ color: "#FF4500" }}>
                {item.title.split("đã")[1]
                  ? "đã" + item.title.split("đã")[1]
                  : ""}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhyChooseUs;
