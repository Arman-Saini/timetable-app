// src/components/TimeSlot.jsx
import React from "react";

// Determine if color is light (for dark text) or dark (for white text)
const isLightColor = (hex) => {
  if (!hex || typeof hex !== "string") return false;
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 180; // tweakable threshold
};

const TimeSlot = ({ classInfo, slotStyle, onClick }) => {
  // --- Null check ---
  if (!classInfo) {
    console.error("⛔ TimeSlot Error: classInfo is undefined or null.");
    return null;
  }

  const {
    subject = "Unknown",
    location = "—",
    tag = "?",
    color = "#444",
    startTime,
    endTime,
    day,
  } = classInfo;

  if (!startTime || !endTime) {
    console.error(
      `⛔ TimeSlot Error: Missing startTime or endTime for subject "${subject}".`,
      classInfo
    );
  }

  if (!day) {
    console.warn(
      `⚠️ TimeSlot Warning: Missing day for subject "${subject}".`,
      classInfo
    );
  }

  const textColor = isLightColor(color) ? "#111" : "#fff";
  const tagText = tag === "E" ? "Elective" : "Regular";
  const type = classInfo.type === "Lab" ? "Lab" : "Class";


  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
  const todayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const isToday = todayName === day;

  const isCurrentSlot =
    isToday &&
    startTime &&
    endTime &&
    currentTime >= startTime &&
    currentTime < endTime;

  return (
    <div
      className="time-slot"
      style={{
        ...slotStyle,
        backgroundColor: color,
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
        lineHeight: 1.2,
        boxShadow: isCurrentSlot
          ? "0 0 10px 2px rgba(255, 255, 255, 0.6), 0 0 20px 4px #00ffd5"
          : undefined,
        position: "relative",
      }}
      onClick={onClick}
    >
      <div style={{ fontWeight: "bold", fontSize: "1rem" }}>{subject}</div>
      <div style={{ opacity: 0.9, fontSize: "0.75rem" }}>
        {location} · {type} · {tagText} ({tag})
      </div>
      <div style={{ opacity: 0.8, fontSize: "0.7rem" }}>
        {startTime || "--:--"} - {endTime || "--:--"}
      </div>
      {isCurrentSlot && (
        <div
          style={{
            position: "absolute",
            bottom: 4,
            right: 6,
            fontSize: "0.7rem",
            opacity: 0.8,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "2px 6px",
            borderRadius: "6px",
          }}
        >
          {currentTime}
        </div>
      )}
    </div>
  );
};

export default TimeSlot;
