import React, { ReactNode } from "react";
import "./ControlButtons.css";

interface ControlButtonsProps {
  children: ReactNode;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ children }) => {
  return <div className="media-control-buttons px-8 mb-4">{children}</div>;
};

export default ControlButtons;
