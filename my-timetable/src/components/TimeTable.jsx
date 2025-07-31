// src/components/TimeTable.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { scheduleData } from "../data/schedule";
import TimeSlot from "./TimeSlot.jsx";
import Modal from "./Modal.jsx";

const neonPalette = [
  "#00FFC3",
  "#FF00C8",
  "#00D4FF",
  "#FF9900",
  "#FFFA00",
  "#FF4B91",
  "#6EFF00",
  "#9400FF",
  "#00FF66",
  "#FF0066",
  "#39FF14",
  "#F000FF",
];

const generateSubjectColors = (data) => {
  const subjectMap = {};
  let colorIndex = 0;
  for (const day in data) {
    for (const slot of data[day]) {
      if (!subjectMap[slot.subject]) {
        subjectMap[slot.subject] = neonPalette[colorIndex % neonPalette.length];
        colorIndex++;
      }
    }
  }
  return subjectMap;
};

const TimeTable = ({ viewMode }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hasScrolledInitially, setHasScrolledInitially] = useState(false);
  const timetableRef = useRef(null);
  const subjectColors = useMemo(() => generateSubjectColors(scheduleData), []);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const visibleDays = viewMode === "week" ? days : [viewMode];

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const isToday = (day) => day === todayName;

  const timeLabels = [];
  let current = new Date("1970-01-01T08:00:00");
  for (let i = 0; i < 12; i++) {
    const timeStr = current.toTimeString().slice(0, 5);
    timeLabels.push(timeStr);
    current = new Date(current.getTime() + 50 * 60 * 1000);
  }

  useEffect(() => {
    const ref = timetableRef.current;
    if (!ref) return;

    const firstDayWidth = ref.querySelector(".day-header")?.offsetWidth || 0;
    const todayIndex = visibleDays.indexOf(todayName);

    if (!hasScrolledInitially && todayIndex > 0) {
      ref.scrollLeft = todayIndex * firstDayWidth * 2;
      setHasScrolledInitially(true);
    }

    // 🔴 Do NOT add more scroll logic. Just scroll once and stop.
  }, [visibleDays, todayName, hasScrolledInitially]);

  const getGridPosition = (startTime) => {
    let rowIndex = timeLabels.findIndex((label) => label === startTime);
    if (rowIndex === -1) {
      for (let i = timeLabels.length - 1; i >= 0; i--) {
        if (startTime >= timeLabels[i]) {
          rowIndex = i;
          break;
        }
      }
    }
    return { rowStart: rowIndex + 2 };
  };

  const getSlotSpan = (startTime, endTime) => {
    const startIndex = timeLabels.findIndex((label) => label === startTime);
    const endIndex = timeLabels.findIndex((label) => label === endTime);
    return endIndex - startIndex || 1;
  };

  return (
    <div className="timetable-container" ref={timetableRef}>
      <div
        className="timetable"
        style={{
          gridTemplateColumns: `1fr repeat(${visibleDays.length}, 2fr)`,
        }}
      >
        <div className="time-col">Time</div>
        {visibleDays.map((day) => (
          <div
            key={`header-${day}`}
            className={`day-header ${isToday(day) ? "today-col" : ""}`}
          >
            {day}
          </div>
        ))}

        {timeLabels.map((time, i) => (
          <div
            key={`time-${i}`}
            className="time-label"
            style={{ gridRow: i + 2 }}
          >
            {time}
          </div>
        ))}

        {visibleDays.flatMap((day, dayIndex) => {
          const daySchedule = scheduleData[day] || [];
          return daySchedule.map((classInfo, idx) => {
            const { rowStart } = getGridPosition(classInfo.startTime);
            const rowSpan = getSlotSpan(classInfo.startTime, classInfo.endTime);

            const slotStyle = {
              gridColumn: dayIndex + 2,
              gridRow: `${rowStart} / span ${rowSpan}`,
              backgroundColor: subjectColors[classInfo.subject] || "#444",
            };

            return (
              <TimeSlot
                key={`${day}-${classInfo.subject}-${classInfo.startTime}-${classInfo.location}-${idx}`}
                classInfo={{
                  ...classInfo,
                  color: subjectColors[classInfo.subject] || "#444",
                }}
                slotStyle={slotStyle}
                onClick={() => setSelectedSlot({ ...classInfo, day })}
              />
            );
          });
        })}
      </div>

      {selectedSlot && (
        <Modal info={selectedSlot} onClose={() => setSelectedSlot(null)} />
      )}
    </div>
  );
};

export default TimeTable;
