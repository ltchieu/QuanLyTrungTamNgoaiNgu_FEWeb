import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SxProps,
  Toolbar,
  Typography,
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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBook, faSchool } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, logout, user } = useAuth();
  const [khoaHocItems, setKhoaHocItems] = useState<SelectItem[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Hàm helper để điều hướng và đóng menu
  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  // Hàm helper để logout và đóng menu
  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const phuongPhapHocItems = [
    { label: "TRUE Grammar – Ngữ pháp", value: "home", link: "/about" },
    { label: "Tư duy PAW – IELTS Writing", value: "about", link: "/about" },
    {
      label: "Tư duy SWITCH – IELTS Speaking",
      value: "mindset",
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
      value: "learning",
      link: "/contact",
    },
    {
      label: "Về IELTS",
      value: "about_IELTS",
      link: "/contact",
    },
    {
      label: "Bài mẫu Writing",
      value: "pattern",
      link: "/contact",
    },
    {
      label: "Tin tức",
      value: "news",
      link: "/contact",
    },
  ];

  const aboutUsItems = [
    {
      label: "Về chúng tôi",
      value: "about_us",
      link: "/contact",
    },
    {
      label: "Kết quả học viên",
      value: "result",
      link: "/contact",
    },
    {
      label: "Tài liệu học IELTS miễn phí",
      value: "contact",
      link: "/contact",
    },
    {
      label: "Workshop",
      value: "workshop",
      link: "/contact",
    },
    {
      label: "Lộ trình tự học IELTS",
      value: "path",
      link: "/contact",
    },
    {
      label: "Quyền lợi học viên IPU",
      value: "quyenloi",
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
                <>
                  <IconButton onClick={handleMenuClick} size="small">
                    {/* Lấy ảnh từ user.avatar hoặc chữ cái đầu của tên */}
                    <Avatar sx={{ width: 34, height: 34 }}>
                      H
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        width: 300,
                        borderRadius: "16px",
                        "& .MuiAvatar-root": {
                          width: 40,
                          height: 40,
                          ml: -0.5,
                          mr: 1.5,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    {/* Header của Menu */}
                    <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                      <Avatar>H</Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          Công Hiếu
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          @c4_conghiu779
                        </Typography>
                      </Box>
                    </Box>

                    <Divider />

                    {/* Các link của Học viên */}
                    <MenuItem
                      onClick={() => handleNavigate("/student/schedule")}
                    >
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faCalendar} />
                      </ListItemIcon>
                      Lịch học của bạn
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleNavigate("/student/registered-courses")
                      }
                    >
                      <ListItemIcon>
                        <AppRegistrationIcon fontSize="small" />
                      </ListItemIcon>
                      Khóa học đã đăng ký
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("/student/active-courses")}
                    >
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faSchool} />
                      </ListItemIcon>
                      Khóa đang học
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("/student/documents")}
                    >
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faBook} />
                      </ListItemIcon>
                      Tài liệu
                    </MenuItem>

                    <Divider />

                    {/* Quản lý tài khoản & Đăng xuất */}
                    <MenuItem
                      onClick={() => handleNavigate("/account/profile")}
                    >
                      <ListItemIcon>
                        <ManageAccountsIcon fontSize="small" />
                      </ListItemIcon>
                      Quản lý tài khoản
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </>
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
                  isMobile={isMobile}
                ></DropBox>
                <DropBox
                  label={"Khóa học"}
                  items={khoaHocItems}
                  isMobile={isMobile}
                ></DropBox>
                <Button sx={dropboxProps} onClick={() => {}}>
                  Lịch khai giảng
                </Button>
                <DropBox
                  label={"Blog"}
                  items={blogItems}
                  isMobile={isMobile}
                ></DropBox>
                <DropBox
                  label={"Về chúng tôi"}
                  items={aboutUsItems}
                  isMobile={isMobile}
                ></DropBox>
              </Box>
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{ gap: 2 }}
              >
                {isAuthenticated ? (
                  <Button
                    sx={{
                      ...authButtonProps,
                      backgroundColor: "#ea4213",
                      width: "auto",
                      px: 2,
                    }}
                    onClick={() => {
                      logout();
                      toggleDrawer(false)();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      sx={{ ...authButtonProps, backgroundColor: "#ea4213" }}
                      onClick={() => {
                        navigate("/login");
                        toggleDrawer(false)();
                      }}
                    >
                      Login
                    </Button>
                  </>
                )}
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
