import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface CourseCardProps {
  imageSrc: string;
  title: string;
  summaryItems: string[];
}

const CourseRecommendCard: React.FC<CourseCardProps> = ({
  imageSrc,
  title,
  summaryItems,
}) => {
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
        borderRadius: "30px",
        margin: "25px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Phần hình ảnh */}
      <Box sx={{ padding: "10px" }}>
        <Box
          component="img"
          src={imageSrc}
          alt={title}
          sx={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "25px",
          }}
        />
      </Box>

      {/* Phần nội dung text (tên và danh sách) */}
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>

        <List dense>
          {summaryItems.map((item, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemIcon sx={{ minWidth: "32px" }}>
                <CheckCircleIcon sx={{ color: "#FD3F00" }} />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Button */}
      <Box sx={{mb: 2}}>
        <Button
          sx={{
            backgroundColor: "#FF4500",
            color: "white",
            height: 40,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            padding: "10px",
            ":hover": {
              backgroundColor: "#003E83",
            },
          }}
        > Tìm hiểu thêm</Button>
      </Box>
    </Box>
  );
};

export default CourseRecommendCard;
