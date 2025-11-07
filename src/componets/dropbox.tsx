import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { SelectProps } from "../model/select_item";



const DropBox: React.FC<SelectProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => {
    setIsOpen(false);
    setHoveredItem(null);
  };

  const handleClick = () => {
    if (items.length > 0) navigate(items[0].link);
  };

  const handleSelect = (link: string) => {
    navigate(link);
    setIsOpen(false);
    setHoveredItem(null);
  };

  return (
    <nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      {/* Nút chính */}
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "18px",
          padding: "10px 15px",
          cursor: "pointer",
          borderBottom: isOpen ? "2px solid rgba(26,29,175,1)" : "2px solid transparent",
          color: isOpen ? "rgba(26,29,175,1)" : "rgba(230, 62, 20, 1)",
          transition: "all 0.2s ease",
        }}
      >
        {label}
        <span>
          <KeyboardArrowDownIcon />
        </span>
      </div>

      {/* Danh sách con (Cấp 1 - Danh mục) */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            listStyle: "none",
            padding: "10px 0",
            margin: 0,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 999,
            minWidth: "200px",
          }}
        >
          {items.map((item) => (
            <li
              key={item.value}
              onClick={() => handleSelect(item.link)}
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
                (e.target as HTMLElement).style.backgroundColor = "rgba(26,29,175,0.05)";
                (e.target as HTMLElement).style.color = "rgba(235, 55, 10, 1)";
                (e.target as HTMLElement).style.paddingLeft = "25px";
                setHoveredItem(item.value);
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
                (e.target as HTMLElement).style.color = "black";
                (e.target as HTMLElement).style.paddingLeft = "20px";
              }}
            >
              {item.label}
              {/* Hiển thị icon nếu có menu con */}
              {item.subItems && item.subItems.length > 0 && <KeyboardArrowRightIcon fontSize="small" />}

              {/* Danh sách con (Cấp 2 - Khóa học) */}
              {item.subItems && item.subItems.length > 0 && hoveredItem === item.value && (
                <ul
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "100%",
                    marginLeft: "1px",
                    backgroundColor: "white",
                    listStyle: "none",
                    padding: "10px 0",
                    margin: 0,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    zIndex: 1000,
                    minWidth: "200px",
                  }}
                >
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(subItem.link);
                      }}
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        color: "black",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = "rgba(26,29,175,0.05)";
                        (e.target as HTMLElement).style.color = "rgba(235, 55, 10, 1)";
                        (e.target as HTMLElement).style.paddingLeft = "25px";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = "transparent";
                        (e.target as HTMLElement).style.color = "black";
                        (e.target as HTMLElement).style.paddingLeft = "20px";
                      }}
                    >
                      {subItem.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default DropBox;