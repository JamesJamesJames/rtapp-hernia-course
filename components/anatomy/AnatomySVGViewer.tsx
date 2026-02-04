'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Layers } from 'lucide-react';
import { getLandmarkById } from '@/lib/data/landmarks';

interface AnatomySVGViewerProps {
  svgUrl: string;
  mode?: 'study' | 'test' | 'interactive';
  onLandmarkClick?: (landmarkId: string) => void;
  highlightedLandmarks?: string[];
  selectedLandmarks?: string[];
  correctLandmarks?: string[];
  incorrectLandmarks?: string[];
  showLabels?: boolean;
  showZones?: boolean;
  showTriangles?: boolean;
  showIliopubicTract?: boolean;
  className?: string;
}

export function AnatomySVGViewer({
  svgUrl,
  mode = 'study',
  onLandmarkClick,
  highlightedLandmarks = [],
  selectedLandmarks = [],
  correctLandmarks = [],
  incorrectLandmarks = [],
  showLabels: initialShowLabels = true,
  showZones: initialShowZones = false,
  showTriangles: initialShowTriangles = false,
  showIliopubicTract: initialShowIliopubicTract = true,
  className = '',
}: AnatomySVGViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  // Layer visibility
  const [showLabels, setShowLabels] = useState(initialShowLabels);
  const [showZones, setShowZones] = useState(initialShowZones);
  const [showTriangles, setShowTriangles] = useState(initialShowTriangles);
  const [showIliopubicTract, setShowIliopubicTract] = useState(initialShowIliopubicTract);
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Load SVG content
  useEffect(() => {
    fetch(svgUrl)
      .then(response => response.text())
      .then(text => {
        setSvgContent(text);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, [svgUrl]);

  // Set up SVG interactions
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const container = containerRef.current;
    const svgElement = container.querySelector('svg');
    if (!svgElement) return;

    svgRef.current = svgElement;

    // Add click handlers to landmarks
    const landmarkElements = svgElement.querySelectorAll('[data-landmark-id]');
    landmarkElements.forEach(element => {
      const landmarkId = element.getAttribute('data-landmark-id');
      if (!landmarkId) return;

      element.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onLandmarkClick) {
          onLandmarkClick(landmarkId);
        }
      });

      element.addEventListener('mouseenter', () => {
        setHoveredLandmark(landmarkId);
      });

      element.addEventListener('mouseleave', () => {
        setHoveredLandmark(null);
      });
    });

    // Also handle hotspot clicks
    const hotspots = svgElement.querySelectorAll('[data-target]');
    hotspots.forEach(hotspot => {
      const targetId = hotspot.getAttribute('data-target');
      if (!targetId) return;

      hotspot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onLandmarkClick) {
          onLandmarkClick(targetId);
        }
      });
    });
  }, [svgContent, onLandmarkClick]);

  // Update landmark visual states
  useEffect(() => {
    if (!svgRef.current) return;

    const landmarkElements = svgRef.current.querySelectorAll('[data-landmark-id]');
    landmarkElements.forEach(element => {
      const landmarkId = element.getAttribute('data-landmark-id');
      if (!landmarkId) return;

      // Reset all classes
      element.classList.remove('landmark-highlighted', 'landmark-selected', 'landmark-correct', 'landmark-incorrect');

      // Apply new states
      if (correctLandmarks.includes(landmarkId)) {
        element.classList.add('landmark-correct');
      } else if (incorrectLandmarks.includes(landmarkId)) {
        element.classList.add('landmark-incorrect');
      } else if (selectedLandmarks.includes(landmarkId)) {
        element.classList.add('landmark-selected');
      } else if (highlightedLandmarks.includes(landmarkId)) {
        element.classList.add('landmark-highlighted');
      }
    });
  }, [highlightedLandmarks, selectedLandmarks, correctLandmarks, incorrectLandmarks, svgContent]);

  // Update layer visibility
  useEffect(() => {
    if (!svgRef.current) return;

    const labelLayer = svgRef.current.querySelector('[data-layer="labels"]');
    const zoneLayer = svgRef.current.querySelector('[data-layer="zones"]');
    const triangleLayer = svgRef.current.querySelector('[data-layer="triangles"]');
    const iptLayer = svgRef.current.querySelector('[data-layer="iliopubic-tract"]');

    if (labelLayer) {
      (labelLayer as SVGElement).style.visibility = (mode === 'study' || showLabels) ? 'visible' : 'hidden';
    }
    if (zoneLayer) {
      (zoneLayer as SVGElement).style.visibility = showZones ? 'visible' : 'hidden';
    }
    if (triangleLayer) {
      (triangleLayer as SVGElement).style.visibility = showTriangles ? 'visible' : 'hidden';
    }
    if (iptLayer) {
      (iptLayer as SVGElement).style.visibility = showIliopubicTract ? 'visible' : 'hidden';
    }
  }, [showLabels, showZones, showTriangles, showIliopubicTract, mode, svgContent]);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoom(z => Math.min(z + 0.25, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(z => Math.max(z - 0.25, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(z => Math.min(Math.max(z + delta, 0.5), 4));
  }, []);

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Get hovered landmark info
  const hoveredLandmarkInfo = hoveredLandmark ? getLandmarkById(hoveredLandmark) : null;

  return (
    <div className={`relative bg-gray-900 rounded-xl overflow-hidden ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-1 flex flex-col gap-1">
          <button
            onClick={handleZoomIn}
            className="p-2 text-white hover:bg-white/20 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-white hover:bg-white/20 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-white hover:bg-white/20 rounded transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Layer toggle */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="p-2 bg-black/60 backdrop-blur-sm text-white hover:bg-white/20 rounded-lg transition-colors"
            title="Toggle Layers"
          >
            <Layers className="w-5 h-5" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 top-full mt-2 bg-black/80 backdrop-blur-sm rounded-lg p-3 min-w-[160px]">
              <div className="text-white text-sm space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLabels}
                    onChange={(e) => setShowLabels(e.target.checked)}
                    className="rounded"
                  />
                  Labels
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showZones}
                    onChange={(e) => setShowZones(e.target.checked)}
                    className="rounded"
                  />
                  Zones
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTriangles}
                    onChange={(e) => setShowTriangles(e.target.checked)}
                    className="rounded"
                  />
                  Triangles
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showIliopubicTract}
                    onChange={(e) => setShowIliopubicTract(e.target.checked)}
                    className="rounded"
                  />
                  Iliopubic Tract
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mode indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
          {mode === 'study' ? (
            <>
              <Eye className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm">Study Mode</span>
            </>
          ) : mode === 'test' ? (
            <>
              <EyeOff className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm">Test Mode</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm">Interactive</span>
            </>
          )}
        </div>
      </div>

      {/* Zoom level indicator */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="text-white text-sm">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Hovered landmark info */}
      {hoveredLandmarkInfo && (
        <div className="absolute bottom-4 left-4 z-10 max-w-xs">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3">
            <h4 className="text-white font-semibold text-sm">{hoveredLandmarkInfo.name}</h4>
            <p className="text-gray-300 text-xs mt-1">{hoveredLandmarkInfo.description}</p>
            <p className="text-gray-400 text-xs mt-1">
              Zone: {hoveredLandmarkInfo.zone.replace('ZONE_', '')}
            </p>
          </div>
        </div>
      )}

      {/* SVG Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}

export default AnatomySVGViewer;
