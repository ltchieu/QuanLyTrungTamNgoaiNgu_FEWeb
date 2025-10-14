import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../images/logo.png";
import DropBox from "./dropbox";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  //Drawer control
  const [drawerOpen, serDrawerOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => () => serDrawerOpen(open);

  const phuongPhapHocItems = [
    { label: "TRUE Grammar – Ngữ pháp", value: "home", link: "/about" },
    { label: "Tư duy PAW – IELTS Writing", value: "about", link: "/about" },
    {
      label: "Tư duy SWITCH – IELTS Speaking",
      value: "contact",
      link: "/contact",
    },
    {
      label: "SR & AR – phương pháp độc quyền",
      value: "contact",
      link: "/contact",
    },
  ];

  const khoaHocItems = [
    { label: "Tổng quan khóa học", value: "home", link: "/course" },
    { label: "Pre – IELTS (IELTS 4.5)", value: "about", link: "/about" },
    {
      label: "IELTS Reading & Listening",
      value: "contact",
      link: "/contact",
    },
    {
      label: "IELTS Writing & Speaking",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Các khóa học IELTS miễn phí",
      value: "contact",
      link: "/contact",
    },
    {
      label: "IELTS Advanced 7.0+",
      value: "contact",
      link: "/contact",
    },
    {
      label: "IELTS cấp tốc",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Nền tảng – Tiếng Anh Giao Tiếp",
      value: "contact",
      link: "/contact",
    },
  ];

  const blogItems = [
    {
      label: "Tự học IELTS",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Về IELTS",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Bài mẫu Writing",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Tin tức",
      value: "contact",
      link: "/contact",
    },
  ];

  const aboutUsItems = [
    {
      label: "Về chúng tôi",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Kết quả học viên",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Tài liệu học IELTS miễn phí",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Workshop",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Lộ trình tự học IELTS",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Quyền lợi học viên IPU",
      value: "contact",
      link: "/contact",
    },
  ];

  const dropboxProps = {
    fontWeight: "bold", 
    textTransform: "uppercase",
    borderRadius: 0,
    fontSize: 18,
    color:"rgba(230, 62, 20, 1)",
    ":hover": {
      borderBottom: 2,
      borderBottomColor:"rgba(26, 29, 175, 1)",
      color: "rgba(26, 29, 175, 1)",
      backgroundColor: "transparent"
    }
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <a href="/"><img src={logo} alt="logo" style={{ height: 60, marginTop: 10, }} /></a>
        </Box>

        {/* Menu desktop*/}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "left", gap: 2 }}>
            <DropBox
              label={"Phương pháp học"}
              items={phuongPhapHocItems}
            ></DropBox>
            <DropBox label={"Khóa học"} items={khoaHocItems}></DropBox>
            <Button
              sx={dropboxProps}
              
              onClick={() => {}}
            >
              Lịch khai giảng
            </Button>
            <DropBox label={"Blog"} items={blogItems}></DropBox>
            <DropBox label={"Về chúng tôi"} items={aboutUsItems}></DropBox>
          </Box>
        )}

        {/* Menu Mobile */}
        {isMobile && (
          <>
          <IconButton onClick={toggleDrawer(true)} color="error">
              <MenuIcon/>
          </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{
                  width: 250,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <DropBox
              label={"Phương pháp học"}
              items={phuongPhapHocItems}
            ></DropBox>
            <DropBox label={"Khóa học"} items={khoaHocItems}></DropBox>
            <Button
              sx={dropboxProps}
              onClick={() => {}}
            >
              Lịch khai giảng
            </Button>
            <DropBox label={"Blog"} items={blogItems}></DropBox>
            <DropBox label={"Về chúng tôi"} items={aboutUsItems}></DropBox>           
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
