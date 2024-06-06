import React, { useState } from "react";
import "./DragAndDrop.css";

interface DragAndDropProps {
  children: React.ReactNode;
  onFilesDrop: (files: File[]) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFilesDrop, children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);

    // Filter media files (audio and video)
    const mediaFiles = files.filter(
      (file) =>
        file.type.startsWith("audio/") || file.type.startsWith("video/"),
    );

    onFilesDrop(mediaFiles);
  };

  return (
    <div
      className={`main-container ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      {isDragging && (
        <div className="drag-overlay">
          <h1>Drop media anywhere</h1>
          <span className="text-xs font-normal">
            While we primarily support Video and Audio files, duh!
          </span>
          <span className="text-xs font-medium">
            You feel free to drop any file here, and let StreamX take care of
            the rest.
          </span>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
