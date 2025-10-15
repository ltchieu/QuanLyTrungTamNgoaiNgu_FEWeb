import logo from "../images/logo_no_background.png";
import { Box, colors, Divider, Grid, Link } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faFacebookMessenger,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";

function Footer() {
  const containterProps = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 2,
    marginTop: 2,
    marginBottom: 2,
    fontSize: { xs: 16, md: 20 },
  };

  const copyrightLinkContainterProps = {
    display: "flex",
    flexDirection: {xs: "column", md: "row"},
    alignItems: {xs: "flex-start", md: "center"},
    alignContent: "center",
    gap: 5,
    marginTop: {xs: 0, md: 2},
    marginBottom: 2,
  };

  const iconProps = {
    color: "white",
    width: 30,
    height: 30,
  };

  const copyrightIconProps = {
    color: "white",
    width: 20,
    height: 20,
  };

  const contentProps = {
    color: "white",
    fontWeight: 16,
    margin: 0,
  };

  const copyrightContentProps = {
    color: "white",
    margin: 0,
  };

  const courseProps = {
    color: "white",
    margin: 0,
    ":hover": {
      color: "rgba(236, 82, 35, 1)",
    },
  };

  const copyrightLinkProps = {
    color: "rgba(236, 82, 35, 1)",
    margin: 0,
    ":hover": {
      color: "rgba(146, 47, 16, 1)",
    },
  };
  
  return (
    <Box sx={{ backgroundColor: "#182564ff" }} position="static">
      <Grid container>
        <Grid size={5}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{ width: { xs: 150, md: 200 }, marginTop: "20px" }}
          />
        </Grid>
        <Grid size={7}></Grid>
      </Grid>

      <Grid
        container
        spacing={{ xs: 2, md: 8 }}
        sx={{ mt: { xs: 0, md: 4 }, ml: { xs: "10px", md: 0 }, mr: { xs: "10px", md: 0 } }}
      >
        <Grid size={{ xs: 12, md: 1.8 }} />
        <Grid size={{ xs: 12, md: 3 }}>
          {/* Văn phòng tư vấn */}
          <Box textAlign="left">
            <h4 style={{ color: "rgba(236, 82, 35, 1)" }}>
              VĂN PHÒNG TƯ VẤN HỌC IELTS
            </h4>
            <Divider
              variant="fullWidth"
              flexItem
              sx={{
                paddingLeft: 20,
                orderBottomWidth: 3,
                borderColor: "rgba(236, 82, 35, 1)",
              }}
            />
          </Box>
          <Box>
            <Box sx={containterProps}>
              <ContactsIcon sx={iconProps} />
              <p style={contentProps}>
                442, Đường 3/2, P.12, Quận 10, TP. HCM.
              </p>
            </Box>

            <Box sx={containterProps}>
              <ContactsIcon sx={iconProps} />
              <p style={contentProps}>607-609, Đường 3/2, P.8, Quận 10.</p>
            </Box>

            <Divider
              variant="fullWidth"
              flexItem
              sx={{
                paddingLeft: 20,
                orderBottomWidth: 3,
                borderColor: "rgba(236, 82, 35, 1)",
              }}
            />
          </Box>

          {/* Địa chỉ các chi nhánh */}
          <Box textAlign="left">
            <h4 style={{ color: "rgba(236, 82, 35, 1)", marginTop: 30 }}>
              HỌC TIẾNG ANH GIAO TIẾP, TOEIC, TESOL TẠI SIMPLE
            </h4>
          </Box>
          <Box>
            <Box sx={containterProps}>
              <ContactsOutlinedIcon sx={iconProps} />
              <p style={contentProps}>
                442, Đường 3/2, P.12, Quận 10, TP. HCM.
              </p>
            </Box>

            <Box sx={containterProps}>
              <ContactsOutlinedIcon sx={iconProps} />
              <p style={contentProps}>607-609, Đường 3/2, P.8, Quận 10.</p>
            </Box>

            <Box sx={containterProps}>
              <ContactsOutlinedIcon sx={iconProps} />
              <p style={contentProps}>618, Đường 3/2, P.14, Quận 10</p>
            </Box>

            <Box sx={containterProps}>
              <ContactsOutlinedIcon sx={iconProps} />
              <p style={contentProps}>
                89, Đường Vạn Kiếp, Phường 3, Q.Bình Thạnh
              </p>
            </Box>

            <Box sx={containterProps}>
              <ContactsOutlinedIcon sx={iconProps} />
              <p style={contentProps}>49, Đường D5, Phường 25, Q.Bình Thạnh</p>
            </Box>
          </Box>

          {/* Thông tin liên hệ */}
          <Box textAlign="left">
            <h4
              style={{
                color: "rgba(236, 82, 35, 1)",
                marginBottom: 15,
                marginTop: 28,
              }}
            >
              THÔNG TIN LIÊN HỆ
            </h4>
          </Box>
          <Divider
            variant="fullWidth"
            flexItem
            sx={{
              paddingLeft: 20,
              orderBottomWidth: 3,
              borderColor: "rgba(236, 82, 35, 1)",
            }}
          />
          <Box>
            <Box sx={containterProps}>
              <PhoneIcon sx={iconProps} />
              <p style={contentProps}>0868 010 119 (Ms. Hà)</p>
            </Box>

            <Box sx={containterProps}>
              <PhoneIcon sx={iconProps} />
              <p style={contentProps}>0969 685 769 (Ms. Thi)</p>
            </Box>

            <Box sx={containterProps}>
              <FontAwesomeIcon
                icon={faFacebookMessenger}
                color="white"
                size="2x"
              />
              <p style={contentProps}>Học IELTS cùng IPU</p>
            </Box>

            <Box sx={containterProps}>
              <MailOutlineIcon sx={iconProps} />
              <p style={contentProps}>Ieltspowerup@gmail.com</p>
            </Box>
          </Box>

          {/* Mạng xã hội */}
          <Box textAlign="left">
            <h5
              style={{
                color: "rgba(236, 82, 35, 1)",
                marginBottom: 15,
                marginTop: 28,
              }}
            >
              Theo dõi IPU tại
            </h5>
          </Box>
          <Box>
            <Box sx={containterProps}>
              <FontAwesomeIcon icon={faFacebook} color="white" size="2x" />
              <FontAwesomeIcon icon={faYoutube} color="white" size="2x" />
              <FontAwesomeIcon icon={faTiktok} color="white" size="2x" />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {/* Khóa học */}
          <Box textAlign="left">
            <h4
              style={{
                color: "rgba(236, 82, 35, 1)",
                marginBottom: 15,
                marginTop: 28,
              }}
            >
              CÁC KHÓA HỌC IELTS
            </h4>
          </Box>
          <Divider
            variant="fullWidth"
            flexItem
            sx={{
              paddingLeft: 20,
              orderBottomWidth: 3,
              borderColor: "rgba(236, 82, 35, 1)",
            }}
          />
          <Box>
            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                Pre - IELTS
              </Link>
            </Box>

            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                IELTS 5.0 - 5.5+
              </Link>
            </Box>

            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                IELTS 6.0 - 6.5+
              </Link>
            </Box>

            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                IELTS Cấp tốc
              </Link>
            </Box>

            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                Khóa học miễn phí
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {/* Khóa học khác*/}
          <Box textAlign="left">
            <h4
              style={{
                color: "rgba(236, 82, 35, 1)",
                marginBottom: 15,
                marginTop: 28,
              }}
            >
              KHÓA HỌC KHÁC
            </h4>
          </Box>
          <Divider
            variant="fullWidth"
            flexItem
            sx={{
              paddingLeft: 20,
              orderBottomWidth: 3,
              borderColor: "rgba(236, 82, 35, 1)",
            }}
          />
          <Box>
            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                Chứng chỉ Giảng dạy Quốc tế - TESOL
              </Link>
            </Box>

            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                Tiếng Anh giao tiếp
              </Link>
            </Box>

            <Box sx={containterProps}>
              <Link sx={courseProps} href="#" underline="none">
                Khóa học TOEIC
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container mt={4} sx={{margin: { xs: "32px 10px 0px 10px", md: 0 }}}>
        <Grid size={{ xs: 12, md: 1.8 }} />
        <Grid size={{ xs: 12, md: 8 }}>
          <Divider
            variant="fullWidth"
            flexItem
            sx={{
              orderBottomWidth: 3,
              borderColor: "white",
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={{ xs: 3, md: 14 }}
        sx={{ textAlign: "left", ml: { xs: "10px", md: 0 }, mb: {xs: 20, md:0}, mr: { xs: "10px", md: 0 }}}
      >
        <Grid size={{ xs: 12, md: 1.7 }} />
        <Grid size={{ xs: 12, md: 5 }}>
          {/* Copyright */}
          <Box sx={containterProps}>
            <CopyrightIcon sx={copyrightIconProps} />
            <p style={copyrightContentProps}>
              SLC EDUCATION AND TRAINING COMPANY LIMITED
            </p>
          </Box>

          <Box sx={containterProps}>
            <FontAwesomeIcon icon={faCopyright} style={copyrightIconProps} />
            <p style={copyrightContentProps}>
              CÔNG TY TNHH GIÁO DỤC VÀ ĐÀO TẠO SLC
            </p>
          </Box>

          <Box sx={containterProps}>
            <FontAwesomeIcon icon={faAddressCard} style={copyrightIconProps} />
            <p style={copyrightContentProps}>MST: 0316272289</p>
          </Box>

          <Box sx={containterProps}>
            <ContactsIcon sx={copyrightIconProps} />
            <p style={copyrightContentProps}>
              Trung tâm ngoại ngữ Đơn giản. Giấy phép số 186/QĐ-SGDĐT
            </p>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Links */}
          <Box sx={copyrightLinkContainterProps}>
            <Link href="#" sx={copyrightLinkProps} underline="none">
              Giới thiệu
            </Link>
            <Link href="#" sx={copyrightLinkProps} underline="none">
              Chính sách bảo mật
            </Link>
            <Link href="#" sx={copyrightLinkProps} underline="none">
              Điều khoản sử dụng
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Footer;
