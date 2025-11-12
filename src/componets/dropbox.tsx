import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SelectItem, SelectProps } from "../model/select_item";

const DropBox: React.FC<SelectProps> = ({ label, items, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => !isMobile && setIsOpen(true);
  const handleMouseLeave = () =>
    !isMobile && (setIsOpen(false), setActiveSubMenu(null));

  const handleLabelClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsOpen(!isOpen);
      setActiveSubMenu(null);
    } else {
      if (items.length > 0) navigate(items[0].link);
    }
  };

  const handleC1ItemClick = (e: React.MouseEvent, item: SelectItem) => {
    e.stopPropagation();

    if (isMobile) {
      if (item.subItems && item.subItems.length > 0) {
        e.preventDefault();
        setActiveSubMenu(activeSubMenu === item.value ? null : item.value);
      } else {
        handleSelect(item.link);
      }
    } else {
      handleSelect(item.link);
    }
  };

  const handleC2ItemClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    handleSelect(link);
  };

  const handleSelect = (link: string) => {
    navigate(link);
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  return (
    <nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: isMobile ? "block" : "inline-block",
        width: isMobile ? "100%" : "auto",
      }}
    >
      {/* Nút chính */}
      <div
        onClick={handleLabelClick}
        style={{
          display: "flex",
          gap: 8,
          justifyContent: isMobile ? "space-between" : "center",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "18px",
          padding: "10px 15px",
          cursor: "pointer",
          borderBottom:
            isOpen && !isMobile
              ? "2px solid rgba(26,29,175,1)"
              : "2px solid transparent",
          color: isOpen ? "rgba(26,29,175,1)" : "rgba(230, 62, 20, 1)",
          transition: "all 0.2s ease",
        }}
      >
        {label}
        <span>
          {isMobile && isOpen ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </span>
      </div>

      {/* Danh sách con (Cấp 1 - Danh mục) */}
      {isOpen && (
        <ul
          style={{
            position: isMobile ? "static" : "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            listStyle: "none",
            padding: isMobile ? "0 0 0 15px" : "10px 0",
            margin: 0,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 999,
            minWidth: "200px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {items.map((item) => (
            <React.Fragment key={item.value}>
              <li
                onClick={(e) => handleC1ItemClick(e, item)}
                style={{
                  position: "relative",
                  padding: "10px 20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "black",
                }}
                onMouseEnter={(e) => {
                  if (isMobile) return;
                  (e.target as HTMLElement).style.backgroundColor =
                    "rgba(26,29,175,0.05)";
                  (e.target as HTMLElement).style.color =
                    "rgba(235, 55, 10, 1)";
                  (e.target as HTMLElement).style.paddingLeft = "25px";
                  setActiveSubMenu(item.value);
                }}
                onMouseLeave={(e) => {
                  if (isMobile) return;
                  (e.target as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.target as HTMLElement).style.color = "black";
                  (e.target as HTMLElement).style.paddingLeft = "20px";
                }}
              >
                {item.label}

                {item.subItems &&
                  item.subItems.length > 0 &&
                  (isMobile ? (
                    activeSubMenu === item.value ? (
                      <KeyboardArrowUpIcon fontSize="small" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )
                  ) : (
                    <KeyboardArrowRightIcon fontSize="small" />
                  ))}
              </li>

              {/* Danh sách con (Cấp 2 - Khóa học) */}
              {item.subItems &&
                item.subItems.length > 0 &&
                activeSubMenu === item.value && (
                  <ul
                    style={{
                      position: isMobile ? "static" : "absolute",
                      top: isMobile ? "0" : "-10px",
                      left: isMobile ? "0" : "100%",
                      marginLeft: isMobile ? "0" : "1px",
                      backgroundColor: isMobile ? "rgba(0,0,0,0.05)" : "white",
                      listStyle: "none",
                      padding: isMobile ? "0 0 0 30px" : "10px 0", 
                      margin: 0,
                      boxShadow: isMobile
                        ? "none"
                        : "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: isMobile ? "0" : "8px",
                      zIndex: 1000,
                      minWidth: isMobile ? "100%" : "200px",
                      width: "100%",
                    }}
                  >
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.value}
                        onClick={(e) => handleC2ItemClick(e, subItem.link)}
                        style={{
                          padding: "10px 20px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          color: "black",
                        }}
                        onMouseEnter={(e) => {
                          if (isMobile) return;
                          (e.target as HTMLElement).style.backgroundColor =
                            "rgba(26,29,175,0.05)";
                          (e.target as HTMLElement).style.color =
                            "rgba(235, 55, 10, 1)";
                          (e.target as HTMLElement).style.paddingLeft = "25px";
                        }}
                        onMouseLeave={(e) => {
                          if (isMobile) return;
                          (e.target as HTMLElement).style.backgroundColor =
                            "transparent";
                          (e.target as HTMLElement).style.color = "black";
                          (e.target as HTMLElement).style.paddingLeft = "20px";
                        }}
                      >
                        {subItem.label}
                      </li>
                    ))}
                  </ul>
                )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default DropBox;
