// src/components/terminal/terminal.js
import React, { useState, useRef } from 'react';
import './terminal.css'; 
import Output from './output.js';

const Terminal = () => {
  const [position, setPosition] = useState({ x: 500, y: 100 });
  const [size, setSize] = useState({ width: 1000, height: 600 });
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0 });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) {
      isResizing.current = true;
      resizeStart.current = { width: size.width, height: size.height, x: e.clientX, y: e.clientY };
    } else {
      isDragging.current = true;
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      setPosition({
        x: Math.max(0, Math.min(newX, windowWidth - size.width)),
        y: Math.max(0, Math.min(newY, windowHeight - size.height)),
      });
    } else if (isResizing.current) {
      const newWidth = Math.max(100, resizeStart.current.width + (e.clientX - resizeStart.current.x));
      const newHeight = Math.max(100, resizeStart.current.height + (e.clientY - resizeStart.current.y));
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="terminal"
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid white',
        // overflowY: 'auto',
        // overflowX: 'auto'
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          backgroundColor: 'white',
        }}
      />
        <Output/>
      <div
        className="resize-handle"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '10px',
          height: '10px',
          backgroundColor: 'gray',
          cursor: 'se-resize',
        }}
        onMouseDown={(e) => {
          e.stopPropagation(); 
          isResizing.current = true;
          resizeStart.current = { width: size.width, height: size.height, x: e.clientX, y: e.clientY };
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />
    </div>
  );
};

export default Terminal;