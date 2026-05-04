"use client";

import { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { createPortal } from "react-dom";

export default function ImageZoom({ src, alt = "Document", isOpen, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, src]);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
      <div
        className="absolute inset-0 flex items-center justify-center"
        onWheel={handleWheel}
      >
        <div
          className="relative cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transition: isDragging ? "none" : "transform 0.2s",
            }}
            className="max-w-[90vw] max-h-[90vh] object-contain select-none"
            draggable={false}
          />
        </div>
      </div>

      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-semibold">{alt}</h3>
        <p className="text-sm text-slate-300">
          Scroll to zoom, drag to pan | {Math.round(scale * 100)}%
        </p>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          title="Reset"
        >
          <RotateCw className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors ml-2"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
