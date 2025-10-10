import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Card, CardContent, Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const feedbacks = [
  {
    name: "Trần Khả Vi",
    course: "Lộ trình 7 tháng",
    target: "Target 5.5 - Đạt 7.0",
    content: `Trước khi vào học, em đã thực sự rất hoang mang... Cuối khóa trung tâm còn có review cho mỗi học viên và dịch vụ chấm chữa bài tận tình đã giúp em đạt được kết quả mong muốn (7.0 Overall).`,
    image: "/images/student1.jpg",
  },
  {
    name: "Nguyễn Vũ Na Vy",
    course: "Khóa Speaking Masterclass",
    target: "",
    content: `Học xong ưng đi thi luôn... Mình tự tin đi các club tiếng anh, tự tin giao hữu với các bạn người nước ngoài bằng call trực tiếp mà ko còn thấy sợ nữa.`,
    image: "/images/student2.jpg",
  },
  {
    name: "Mỹ Kỳ",
    course: "Khóa Writing Masterclass",
    target: "",
    content: `Thầy Việt rất dễ thương và thân thiện với học viên... Sau khi học xong khóa học, em cảm thấy tự tin hơn rất nhiều.`,
    image: "/images/student3.jpg",
  },
   {
    name: "Chí Tâm",
    course: "Khóa Writing Masterclass",
    target: "",
    content: `Thầy Việt rất dễ thương và thân thiện với học viên... Sau khi học xong khóa học, em cảm thấy tự tin hơn rất nhiều.`,
    image: "/images/student3.jpg",
  },
   {
    name: "Ngọc Luân",
    course: "Khóa Writing Masterclass",
    target: "",
    content: `Thầy Việt rất dễ thương và thân thiện với học viên... Sau khi học xong khóa học, em cảm thấy tự tin hơn rất nhiều.`,
    image: "/images/student3.jpg",
  },
   {
    name: "Công Hiếu",
    course: "Khóa Writing Masterclass",
    target: "",
    content: `Thầy Việt rất dễ thương và thân thiện với học viên... Sau khi học xong khóa học, em cảm thấy tự tin hơn rất nhiều.`,
    image: "/images/student3.jpg",
  },
];


const StudentFeedback: React.FC = () => {
  const [cardHeight, setCardHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      const cards = document.querySelectorAll(".feedback-card");
      const maxHeight = Math.max(...Array.from(cards).map((c) => (c as HTMLElement).offsetHeight));
      setCardHeight(maxHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <Box sx={{ width: "60%", py: 6, margin: "auto" }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={{ paddingBottom: "40px", color: "orangered" }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((fb, index) => (
          <SwiperSlide key={index}>
            <Card
              className="feedback-card"
              sx={{
                borderRadius: 4,
                p: 2,
                height: cardHeight || "auto",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fafafa",
                maxHeight: 260
              }}
              elevation={0}
            >
              <CardContent sx={{ flex: 1 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={fb.image}
                    alt={fb.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box sx={{textAlign: "left"}}>
                    <Typography sx={{ fontWeight: "bold", color: "orangered" }}>
                      {fb.name}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={5}
                      readOnly
                      size="small"
                      sx={{ color: "#f57c00" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "gray", fontWeight: 500 }}
                    >
                      {fb.course}
                    </Typography>
                  </Box>
                </Box>

                {/* Nội dung */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#333",
                    textAlign: "justify",
                    whiteSpace: "pre-line",
                  }}
                >
                  <b>{fb.target}</b> {fb.content}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default StudentFeedback;
