'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Figure } from '@/types/paper';
import { getFigurePath } from '@/lib/content';

interface FigureGalleryProps {
  figures: Figure[];
  slug: string;
  onFigureView?: (figureId: string) => void;
}

export function FigureGallery({ figures, slug, onFigureView }: FigureGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    if (onFigureView && figures[index]) {
      onFigureView(figures[index].id);
    }
  };

  const handleClose = () => setSelectedIndex(null);

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      if (onFigureView && figures[newIndex]) {
        onFigureView(figures[newIndex].id);
      }
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < figures.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      if (onFigureView && figures[newIndex]) {
        onFigureView(figures[newIndex].id);
      }
    }
  };

  if (figures.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No figures available for this module.
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {figures.map((figure, index) => (
          <button
            key={figure.id}
            onClick={() => handleOpen(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 border border-gray-200 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src={getFigurePath(slug, figure.filename)}
              alt={figure.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {figure.caption}
                </p>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {index + 1}/{figures.length}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <FigureLightbox
            figures={figures}
            slug={slug}
            currentIndex={selectedIndex}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface FigureLightboxProps {
  figures: Figure[];
  slug: string;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function FigureLightbox({
  figures,
  slug,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: FigureLightboxProps) {
  const figure = figures[currentIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Touch state for pinch-to-zoom
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(1);

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Reset on figure change
  useEffect(() => {
    resetTransform();
  }, [currentIndex, resetTransform]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case '+':
        case '=':
          setScale((s) => Math.min(s + 0.5, 4));
          break;
        case '-':
          setScale((s) => Math.max(s - 0.5, 1));
          break;
        case '0':
          resetTransform();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, resetTransform]);

  // Mouse handlers for drag/pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
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

  // Touch handlers for pinch-to-zoom and pan
  const getDistance = (touches: React.TouchList) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      setInitialPinchDistance(getDistance(e.touches));
      setInitialScale(scale);
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan start
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      // Pinch move
      const currentDistance = getDistance(e.touches);
      const scaleChange = currentDistance / initialPinchDistance;
      const newScale = Math.min(Math.max(initialScale * scaleChange, 1), 4);
      setScale(newScale);
      e.preventDefault();
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Pan move
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setInitialPinchDistance(null);
    setIsDragging(false);
  };

  // Double-tap to zoom
  const lastTapRef = useRef<number>(0);
  const handleDoubleTap = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (scale === 1) {
        setScale(2);
      } else {
        resetTransform();
      }
    }
    lastTapRef.current = now;
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 4));
  const zoomOut = () => {
    const newScale = Math.max(scale - 0.5, 1);
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {currentIndex + 1} / {figures.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 1}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom out (-)"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            disabled={scale >= 4}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom in (+)"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={resetTransform}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Reset (0)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-2"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={(e) => {
          handleTouchStart(e);
          handleDoubleTap(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <img
            ref={imageRef}
            src={getFigurePath(slug, figure.filename)}
            alt={figure.caption}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
        </div>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < figures.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 text-white">
        <h3 className="font-semibold mb-1">{figure.caption}</h3>
        <p className="text-sm text-gray-400">{figure.description}</p>
      </div>

      {/* Mobile zoom hint */}
      <div className="md:hidden text-center pb-4 text-gray-500 text-xs">
        Pinch to zoom | Double-tap to toggle zoom
      </div>
    </motion.div>
  );
}
