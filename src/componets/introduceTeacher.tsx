import { Swiper, SwiperSlide } from "swiper/react";
import svg1 from "../images/ic-teachers-1.svg";
import svg2 from "../images/ic-teachers-2.svg";
import svg3 from "../images/ic-teachers-3.svg";
import svg4 from "../images/ic-teachers-4.svg";
import teacher1 from "../images/teacher1.png";
import teacher2 from "../images/teacher2.png";
import teacher3 from "../images/teacher3.png";
import teacher4 from "../images/teacher4.png";
import teacher5 from "../images/teacher5.png";
import { Box, BoxProps, IconButton, Typography } from "@mui/material";
import { EffectCoverflow, Navigation } from "swiper/modules";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const IntroduceTeacher = () => {
  const teachersData = [
    teacher1,
    teacher2,
    teacher3,
    teacher4,
    teacher5,
    teacher4,
    teacher5,
    teacher4,
    teacher5,
  ];

  const rowContainer: BoxProps = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  const columnContainer: BoxProps = {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    gap: 2,
  };
  return (
    <Box sx={{ backgroundColor: "#E5F2FF", width: "95%", borderRadius: 3 }}>
      <Box sx={{ maxWidth: "1400px", margin: "auto" }}>
        <Box sx={{ margin: { xs: "0px 20px", md: "0px 200px" } }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
            Các giáo viên tại{" "}
            <span style={{ color: "#FD3F00" }}>IELTS Power Up</span>
          </Typography>
        </Box>

        <Box
          {...rowContainer}
          sx={{
            mt: 6,
            textAlign: "left",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: { xs: 5, md: 0 },
            mr: { xs: 0, md: 20 },
            ml: { xs: 2, md: 0 },
            mb: 3
          }}
        >
          {/* Cột 1: Thông tin giới thiệu */}
          <Box
            {...columnContainer}
            sx={{
              width: { xs: "100%", md: "100%" },
              textAlign: "left",
              overflow: "visible",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Trung tâm Anh ngữ sở hữu đội ngũ giảng dạy chuyên môn cao lớn
                nhất Việt Nam
              </Typography>
            </Box>

            <Box
              {...rowContainer}
              sx={{
                mt: 2,
                flexDirection: "row",
                flexWrap: "nowrap",
                overflow: "visible",
              }}
            >
              <img src={svg1} style={{ flexShrink: 0 }} />

              <Typography variant="body1" sx={{ ml: 3, fontSize: 20 }}>
                <strong>3.000+</strong> giáo viên bản xứ và Việt Nam cùng trợ
                giảng dày dặn <br /> kinh nghiệm
              </Typography>
            </Box>

            <Box {...rowContainer} sx={{ mt: 2, flexDirection: "row" }}>
              <img src={svg2} style={{ flexShrink: 0 }} />

              <Typography variant="body1" sx={{ ml: 3, fontSize: 20 }}>
                <strong>100%</strong> có bằng giảng dạy Anh ngữ theo tiêu chuẩn
                quốc tế như TESOL, CELTA hoặc TEFL.
              </Typography>
            </Box>

            <Box {...rowContainer} sx={{ mt: 2, flexDirection: "row" }}>
              <img src={svg3} style={{ flexShrink: 0 }} />

              <Typography variant="body1" sx={{ ml: 3, fontSize: 20 }}>
                <strong>15%</strong> giáo viên có bằng Thạc sĩ, Tiến sĩ.
              </Typography>
            </Box>

            <Box {...rowContainer} sx={{ mt: 2, flexDirection: "row" }}>
              <img src={svg4} style={{ flexShrink: 0 }} />

              <Typography variant="body1" sx={{ ml: 3, fontSize: 20 }}>
                <strong>+30</strong> giáo viên IELTS trên 8.0
              </Typography>
            </Box>
          </Box>

          {/* Cột 2: Hình ảnh giáo viên */}
          <Box {...columnContainer}>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: "600px" },
                py: 4,
                position: "relative",
              }}
            >
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 250,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                modules={[EffectCoverflow, Navigation]}
              >
                {teachersData.map((teacher, index) => (
                  <SwiperSlide key={index} style={{ width: "200px" }}>
                    <Box
                      sx={{
                        textAlign: "center",
                        fontSize: "18px",
                        background: "#fff",
                        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={teacher}
                        style={{
                          display: "block",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* 2 nút next và pre */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 3,
                }}
              >
                {/* Nút Previous */}
                <IconButton
                  className="swiper-button-prev-custom"
                  sx={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ color: "#FD3F00" }} />
                </IconButton>

                {/* Nút Next */}
                <IconButton
                  className="swiper-button-next-custom"
                  sx={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <ArrowForwardIosIcon sx={{ color: "#FD3F00" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IntroduceTeacher;
