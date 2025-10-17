import React, { useState } from "react";
import { Button, Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Module } from "../model/course"; // ✅ Import kiểu dữ liệu bạn đã định nghĩa sẵn

interface CourseModuleDetailsProps {
  modules: Module[];
}

const CourseModuleDetails: React.FC<CourseModuleDetailsProps> = ({ modules }) => {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  const handleToggle = (moduleId: number) => {
    setActiveModuleId((prevId) => (prevId === moduleId ? null : moduleId));
  };

  return (
    <Box sx={{ width: "100%", minWidth: 200 }}>
      {modules.map((module) => {
        const isActive = activeModuleId === module.moduleId;

        return (
          <React.Fragment key={module.moduleId}>
            <Button
              startIcon={
                <FontAwesomeIcon
                  icon={isActive ? faMinus : faPlus}
                  style={{ paddingRight: 15, fontSize: 14 }}
                />
              }
              onClick={() => handleToggle(module.moduleId)}
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
                my: 0.5,
                textAlign: "left",
                ":hover": {
                  backgroundColor: isActive ? "#003E83" : "#FD3F00",
                  color: "white",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              {module.moduleName}
            </Button>

            <Collapse in={isActive} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                <List dense sx={{ listStyleType: "disc", pl: 4 }}>
                  {module.contents.map((content) => (
                    <ListItem key={content.id} sx={{ display: "list-item" }}>
                      <ListItemText primary={content.contentName} />
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
