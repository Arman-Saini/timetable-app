// src/App.jsx
import React, { useState, useEffect } from "react";
import TimeTable from "./components/TimeTable";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [viewMode, setViewMode] = useState("week");

  // Set the theme class on the <body> or <html>
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      {/* === Controls Container === */}
      <div className="controls">
        {/* === Theme Toggle Button === */}
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* === View Dropdown === */}
        <select
          className="day-selector"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <option value="week">Full Week</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>

      {/* === Timetable === */}
      <TimeTable viewMode={viewMode} />
    </div>
  );
}

export default App;
