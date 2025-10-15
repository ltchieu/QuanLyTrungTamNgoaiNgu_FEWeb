import React, { CSSProperties, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import riskPtr from "../images/risk-150x150.png";
import team_workPtr from "../images/team-work-150x150.png";
import bussiness_proposalPtr from "../images/business-proposal-150x150.png";
import processPtr from "../images/process-150x150.png";
import insurancePtr from "../images/insurance-150x150.png";
import customer_reviewPtr from "../images/customer-review-150x150.png";

const WhyChooseUs: React.FC = () => {
  // Trạng thái lưu nút được chọn
  const [selected, setSelected] = useState<"brand" | "quality">("brand");

  // Nội dung tương ứng với từng nút
  const content = {
    quality: [
      {
        icon: processPtr,
        title1: "Hơn 20.000 học viên",
        title2: "đã học tại Simple",
        text: "Trong suốt 10 năm hoạt động, Hệ thống Anh ngữ Toàn diện Simple đã giúp cho hơn 20.000 học viên yêu thích tiếng Anh và đạt được mục tiêu của mình.",
      },
      {
        icon: insurancePtr,
        title1: "Nơi đào tạo",
        title2: "hơn 4.500 giáo viên",
        text: "Tính đến nay, Hệ thống Anh ngữ Toàn diện Simple đã đào tạo được hơn 4.500 giáo viên tiếng Anh cho các trường phổ thông, các trung tâm anh ngữ lớn nhỏ trên toàn quốc.",
      },
      {
        icon: customer_reviewPtr,
        title1: "Phương pháp học",
        title2: "hiện đại - mới mẻ",
        text: "Hệ thống Anh ngữ Toàn diện Simple cũng là nơi tổ chức và nghiên cứu các phương pháp học để giúp cho người Việt Nam có thể hấp thu tiếng Anh một cách toàn diện và hoàn hảo nhất.",
      },
    ],
    brand: [
      {
        icon: riskPtr,
        title1: "Hơn 10 năm",
        title2: "kinh nghiệm",
        text: "IELTS Power Up thuộc Hệ thống Anh ngữ Toàn diện Simple, nơi đã có hơn 10 năm kinh nghiệm giảng dạy tiếng Anh cho mọi lứa tuổi.",
      },
      {
        icon: team_workPtr,
        title1: "Đối tác của",
        title2: "các trường Đại học",
        text: "Hệ thống Anh ngữ Toàn diện Simple đang là đối tác chiến lược của các trường Đại học lớn trên toàn quốc như là: Đại học Kinh tế TP.HCM, Đại học Văn Lang, Melbourne Polytechnic, Đại học Tôn Đức Thắng,….",
      },
      {
        icon: bussiness_proposalPtr,
        title1: "Hơn 98% học viên",
        title2: "đạt target",
        text: "Hơn 98% học viên học tại IPU đạt target khi tham gia khóa học tại IPU. Đặc biệt 100% học viên đạt target khi đăng ký lộ trình học IELTS tại IPU.",
      },
    ],
  };

  const buttonStyle = {
    color: "white",
    width: { xs: 170, md: 580 },
    height: 50,
    borderRadius: 3,
    textTransform: "capitalize",
    fontWeight: "bold",
    transition: "all 0.3s ease",
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
          flexDirection: "row",
          gap: { xs: 2, md: 10 },
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={() => setSelected("brand")}
          sx={{
            ...buttonStyle,
            backgroundColor:
              selected === "brand" ? "#FF4500" : "rgba(27, 12, 112, 1)",
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
            ...buttonStyle,
            backgroundColor:
              selected === "quality" ? "#FF4500" : "rgba(27, 12, 112, 1)",

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
          gap: 5,
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
              textAlign: "left",
            }}
          >
            <img
              src={item.icon}
              style={{ marginBottom: 16, color: "black", width: "20%" }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "19px" }}
            >
              {item.title1}{" "}
              <span style={{ color: "#FF4500" }}>{item.title2}</span>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#4d4d4d" }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhyChooseUs;
