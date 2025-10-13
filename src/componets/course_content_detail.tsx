import React, { useState } from "react";
import { Button, Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// --- PHẦN MODELS VÀ MOCK DATA ---

interface Module {
  MAMODULE: number;
  MAKHOAHOC: number;
  TENMODULE: string;
  THOILUONG: number;
}

interface NoiDung {
  id: number;
  TENNOIDUNG: string;
  MAMODULE: number;
}

const mockModules: Module[] = [
  { MAMODULE: 101, MAKHOAHOC: 1, TENMODULE: "Giới thiệu về ReactJS", THOILUONG: 120 },
  { MAMODULE: 102, MAKHOAHOC: 1, TENMODULE: "State và Props trong React", THOILUONG: 180 },
  { MAMODULE: 103, MAKHOAHOC: 2, TENMODULE: "Lập trình bất đồng bộ với Javascript", THOILUONG: 150 },
];

const mockNoiDung: NoiDung[] = [
  { id: 1, TENNOIDUNG: "Cài đặt môi trường phát triển", MAMODULE: 101 },
  { id: 2, TENNOIDUNG: "JSX là gì?", MAMODULE: 101 },
  { id: 3, TENNOIDUNG: "Tạo component đầu tiên", MAMODULE: 101 },
  { id: 4, TENNOIDUNG: "Sự khác biệt giữa State và Props", MAMODULE: 102 },
  { id: 5, TENNOIDUNG: "Luồng dữ liệu một chiều (One-way data flow)", MAMODULE: 102 },
  { id: 6, TENNOIDUNG: "Callbacks và Promises", MAMODULE: 103 },
  { id: 7, TENNOIDUNG: "Sử dụng Async/Await hiệu quả", MAMODULE: 103 },
  { id: 8, TENNOIDUNG: "Xử lý lỗi trong Promise", MAMODULE: 103 },
];

// --- PHẦN ĐỊNH DẠNG DỮ LIỆU CHO COMPONENT ---

interface ContentItem {
  id: string;
  text: string;
}

interface ButtonItem {
  id: string;
  label: string;
  content: ContentItem[];
}

// Hàm này sẽ xử lý dữ liệu từ mock data để component có thể hiểu được
const formatDataForComponent = (modules: Module[], noiDungs: NoiDung[]): ButtonItem[] => {
  return modules.map(module => {
    // Lọc ra các nội dung thuộc về module hiện tại
    const relatedContent = noiDungs
      .filter(content => content.MAMODULE === module.MAMODULE)
      .map(content => ({
        id: `content-${content.id}`,
        text: content.TENNOIDUNG,
      }));

    return {
      id: `module-${module.MAMODULE}`,
      label: module.TENMODULE,
      content: relatedContent,
    };
  });
};

// --- COMPONENT ---

const CourseModuleDetails: React.FC = () => {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  // Tạo dữ liệu cho component từ mock data
  const buttonData = formatDataForComponent(mockModules, mockNoiDung);

  const handleButtonClick = (buttonId: string) => {
    setActiveButtonId(prevId => (prevId === buttonId ? null : buttonId));
  };

  return (
    <Box sx={{ width: "100%", minWidth: 200 }}>
      {buttonData.map((item) => {
        const isActive = activeButtonId === item.id;

        return (
          <React.Fragment key={item.id}>
            <Button
              startIcon={
                <FontAwesomeIcon
                  icon={isActive ? faMinus : faPlus}
                  style={{ paddingRight: 15, fontSize: 14 }}
                />
              }
              onClick={() => handleButtonClick(item.id)}
              sx={{
                color: isActive ? "white" : "black",
                backgroundColor: isActive ? "#003E83" : "#f1f1f1",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "12px",
                width: "100%",
                padding: "10px",
                justifyContent: "flex-start",
                pl: 4,
                fontSize: 16,
                minWidth: "200px",
                my: 0.5,
                textAlign: 'left',
                ":hover": {
                  backgroundColor: isActive ? "#003E83" : "#FD3F00",
                  color: "white",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              {item.label}
            </Button>

            <Collapse in={isActive} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
                  {item.content.map((contentItem) => (
                    <ListItem key={contentItem.id} sx={{ display: "list-item" }}>
                      <ListItemText primary={contentItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CourseModuleDetails;