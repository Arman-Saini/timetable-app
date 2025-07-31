// src/components/TimeSlot.jsx
import React from "react";

// Determine if color is light (for dark text) or dark (for white text)
const isLightColor = (hex) => {
  if (!hex || typeof hex !== "string") return false;
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 180; // tweakable threshold
};

const TimeSlot = ({ classInfo, slotStyle, onClick }) => {
  const textColor = isLightColor(classInfo.color) ? "#111" : "#fff";

  const tagText = classInfo.tag === "E" ? "Elective" : "Regular";
  const type = classInfo.location.toLowerCase().includes("lab") ? "Lab" : "Class";

  return (
    <div
      className="time-slot"
      style={{
        ...slotStyle,
        backgroundColor: classInfo.color,
        color: textColor,
        cursor: "pointer",
        borderRadius: "10px",
        padding: "4px 8px",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2px",
        fontSize: "0.8rem",
        lineHeight: 1.2
      }}
      onClick={onClick}
    >
      <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
        {classInfo.subject}
      </div>
      <div style={{ opacity: 0.9, fontSize: "0.75rem" }}>
        {classInfo.location} · {type} · {tagText} ({classInfo.tag})
      </div>
      <div style={{ opacity: 0.8, fontSize: "0.7rem" }}>
        {classInfo.startTime} - {classInfo.endTime}
      </div>
    </div>
  );
};

export default TimeSlot;
