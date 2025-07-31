import React from "react";
import "./Modal.css";

const Modal = ({ info, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-color-bar"
          style={{ backgroundColor: info.color || "#555" }}
        />
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{info.subject}</h2>
        <p><strong>Day:</strong> {info.day}</p>
        <p><strong>Time:</strong> {info.startTime} – {info.endTime}</p>
        <p><strong>Type:</strong> {info.type}</p>
        <p><strong>Location:</strong> {info.location}</p>
        <p><strong>Tag:</strong> {info.tag}</p>
      </div>
    </div>
  );
};

export default Modal;
