import React from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ActiveCourseResponse } from "../model/course_model";
import {
  faGraduationCap,
  faMoneyBill,
  faRightToBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: ActiveCourseResponse;
  categoryId: number;
}

const CourseCommonCard: React.FC<CourseCardProps> = ({ course, categoryId }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} sx={{ mb: 10, alignItems: "flex-start" }}>
      {/* CỘT TRÁI: Hình ảnh và Tag tên khóa học */}
      <Grid size={{ xs: 12, md: 3.3 }}>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            minHeight: "350px",
            backgroundColor: "#FFCEB3",
            borderRadius: 5,
          }}
        >
          <Box
            component="img"
            src={`http://localhost:8080/files/${course.image}`}
            alt={course.courseName}
            sx={{
              mt: 2,
              width: "80%",
              height: "80%",
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
          <Button
            onClick={() => {
              navigate(`/course/${course.courseId}?categoryId=${categoryId}`);
            }}
            sx={{
              position: "absolute",
              bottom: 10,
              transform: "translateX(-50%)",
              left: "50%",
              fontWeight: "bold",
              color: "#FD3F00",
              width: "80%",
              borderRadius: 5,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#003E83",
                color: "white",
              },
            }}
          >
            {course.courseName}
          </Button>
        </Box>
      </Grid>

      {/* CỘT PHẢI: Thẻ thông tin màu vàng */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#FFDF00",
            borderRadius: "16px",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Phần 1: Mục tiêu khóa học */}
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              textTransform="uppercase"
              gutterBottom
            >
              Về khóa học
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary={course.description} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary={course.targetLevel} />
              </ListItem>
            </List>
          </Box>

          {/* Phần 2: Chi tiết (màu trắng) */}
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "white",
              borderRadius: 7,
              p: 3,
              flexGrow: 1,
              mb: 2,
              mx: 4,
            }}
          >
            <Grid container spacing={2}>
              {/* Chi tiết bên trái */}
              <Grid size={{ xs: 12, md: 6 }}>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        color="#FD3F00"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    >
                      Đầu vào: {course.entryLevel}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <FontAwesomeIcon icon={faGraduationCap} color="#FD3F00" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    >
                      Đầu ra: {course.targetLevel}
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 1 }}>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{
                    display: { xs: "none", md: "block" },
                    borderRightWidth: "1px",
                    borderColor: "black",
                    height: "100%",
                  }}
                />

                <Divider
                  orientation="horizontal"
                  variant="middle"
                  sx={{
                    display: { xs: "block", md: "none" },
                    borderBottomWidth: "1px",
                    borderColor: "black",
                    width: "100%",
                  }}
                />
              </Grid>

              {/* Chi tiết bên phải */}
              <Grid size={{ xs: 12, md: 5 }}>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <FontAwesomeIcon icon={faMoneyBill} color="#FD3F00" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    >
                      Học phí:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(course.tuitionFee)}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <FontAwesomeIcon icon={faUsers} color="#FD3F00" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    >
                      Sĩ số: 10 - 12 học viên/lớp
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CourseCommonCard;
