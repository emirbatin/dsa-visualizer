import { useState, useRef, useEffect } from "react";

const usePanZoom = () => {
  const containerRef = useRef();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const newScale = scale + (e.deltaY < 0 ? zoomFactor : -zoomFactor);
    setScale(Math.min(2, Math.max(0.5, newScale))); // scale minimum 0.5, maximum 3
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      setPosition((prev) => ({
        x: Math.min(200, Math.max(-500, prev.x + deltaX)), // limit pan to -500 to 500
        y: Math.min(200, Math.max(-500, prev.y + deltaY)), // limit pan to -500 to 500
      }));
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging, lastMousePos, position, scale]);

  return { containerRef, scale, position, dragging };
};

export default usePanZoom;
