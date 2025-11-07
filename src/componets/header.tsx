import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  SxProps,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../images/logo.png";
import DropBox from "./dropbox";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CourseGroupResponse } from "../model/course_model";
import { getCourseName } from "../services/course_services";
import { SelectItem } from "../model/select_item";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Header: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const [khoaHocItems, setKhoaHocItems] = useState<SelectItem[]>([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const res = await getCourseName();
        const apiData: CourseGroupResponse[] = res.data.data;

        if (Array.isArray(apiData)) {
          const formattedData: SelectItem[] = apiData.map((category) => ({
            label: category.categoryName,
            value: category.categoryId.toString(),
            link: `/course/category/${category.categoryId}`,
            subItems: category.courses.map((course) => ({
              label: course.courseName,
              value: course.courseId.toString(),
              link: `/course/${course.courseId}`,
            })),
          }));
          setKhoaHocItems(formattedData);
        } else {
          console.error("Dữ liệu nhận được không phải là mảng:", apiData);
          setKhoaHocItems([]);
        }
      } catch (err) {
        setError("Không thể tải danh sách khóa học.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  //Drawer control
  const [drawerOpen, serDrawerOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => () => serDrawerOpen(open);
  const navigate = useNavigate();

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
    color: "rgba(230, 62, 20, 1)",
    ":hover": {
      borderBottom: 2,
      borderBottomColor: "rgba(26, 29, 175, 1)",
      color: "rgba(26, 29, 175, 1)",
      backgroundColor: "transparent",
    },
  };

  const authButtonProps: SxProps = {
    color: "white",
    width: "100px",
    py: 1,
    transition: "all 0.3s ease",
    opacity: "0.9",
    borderRadius: "15px",
    textTransform: "none",
    fontWeight: "bold",
    ":hover": {
      transform: "scale(0.9)",
    },
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <a href="/">
            <img src={logo} alt="logo" style={{ height: 60, marginTop: 10 }} />
          </a>
        </Box>

        {/* Menu desktop*/}
        {!isMobile && (
          <>
            <Box sx={{ display: "flex", alignItems: "left", gap: 2 }}>
              <DropBox
                label={"Phương pháp học"}
                items={phuongPhapHocItems}
              ></DropBox>
              <DropBox label={"Khóa học"} items={khoaHocItems}></DropBox>

              <Button sx={dropboxProps} onClick={() => {}}>
                Lịch khai giảng
              </Button>
              <DropBox label={"Blog"} items={blogItems}></DropBox>
              <DropBox label={"Về chúng tôi"} items={aboutUsItems}></DropBox>
            </Box>
            <Box>
              {isAuthenticated ? (
                <Button
                  sx={{ ...authButtonProps, backgroundColor: "#ea4213" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  sx={{ ...authButtonProps, backgroundColor: "#ea4213" }}
                  onClick={logout}
                >
                  Login
                </Button>
              )}
            </Box>
          </>
        )}

        {/* Menu Mobile */}
        {isMobile && (
          <>
            <IconButton onClick={toggleDrawer(true)} color="error">
              <MenuIcon />
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
                <Button sx={dropboxProps} onClick={() => {}}>
                  Lịch khai giảng
                </Button>
                <DropBox label={"Blog"} items={blogItems}></DropBox>
                <DropBox label={"Về chúng tôi"} items={aboutUsItems}></DropBox>
              </Box>
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{ gap: 2 }}
              >
                <Button
                  sx={{ ...authButtonProps, backgroundColor: "#ea4213" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>

                <Button
                  sx={{ ...authButtonProps, backgroundColor: "#001b86" }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
