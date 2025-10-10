import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type SelectItem = {
  label: string;
  value: string;
  link: string;
};

interface SelectProps {
  label: string;
  items: SelectItem[];
}

const DropBox: React.FC<SelectProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const handleClick = () => {
    if (items.length > 0) navigate(items[0].link);
  };

  const handleSelect = (link: string) => {
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
        {label}<span><KeyboardArrowDownIcon/></span>
      </div>

      {/* Danh sách con */}
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
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "left"
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
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default DropBox;
