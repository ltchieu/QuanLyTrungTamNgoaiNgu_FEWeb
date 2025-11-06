import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface CategoryItem {
  id: number;
  name: string;
  link: string;
  courses?: { id: number; name: string; link: string }[];
}

interface SelectProps {
  label: string;
  items: CategoryItem[];
}

const TwoLayerDropBox: React.FC<SelectProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => {
    setIsOpen(false);
    setHoveredCategory(null);
  };

  const handleCategoryClick = (link: string) => {
    navigate(link);
    setIsOpen(false);
  };

  const handleCourseClick = (link: string) => {
    navigate(link);
    setIsOpen(false);
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

      {/* Danh mục */}
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
            minWidth: "220px",
          }}
        >
          {items.map((category) => (
            <li
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                position: "relative",
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onClick={() => handleCategoryClick(category.link)}
            >
              {category.name}

              {/* Danh sách khóa học con */}
              {hoveredCategory === category.id && category.courses && category.courses.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "100%",
                    backgroundColor: "white",
                    listStyle: "none",
                    padding: "10px 0",
                    margin: 0,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    minWidth: "220px",
                    zIndex: 1000,
                  }}
                >
                  {category.courses.map((course) => (
                    <li
                      key={course.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course.link);
                      }}
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = "rgba(26,29,175,0.05)";
                        (e.target as HTMLElement).style.color = "rgba(235, 55, 10, 1)";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = "transparent";
                        (e.target as HTMLElement).style.color = "black";
                      }}
                    >
                      {course.name}
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

export default TwoLayerDropBox;
