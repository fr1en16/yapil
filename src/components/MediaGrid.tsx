'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { InteractiveTiltCard } from '@/components/ui/tilt-card';
import { ImageZoom } from '@/components/ui/image-zoom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaImage {
  name: string;
  width: number;
  height: number;
  isVideo?: boolean;
}

interface MediaGroup {
  prefix: string;
  images: MediaImage[];
}

interface MediaGridProps {
  groups: MediaGroup[];
}

export default function MediaGrid({ groups }: MediaGridProps) {
  const [resolvedGroups, setResolvedGroups] = useState<MediaGroup[]>(groups);
  const [columns, setColumns] = useState<MediaGroup[][]>([]);
  const [colsCount, setColsCount] = useState<number>(4);
  const [activeIndices, setActiveIndices] = useState<{ [prefix: string]: number }>({});

  useEffect(() => {
    setResolvedGroups(groups);
  }, [groups]);

  useEffect(() => {
    const checkColumns = () => {
      const w = window.innerWidth;
      if (w >= 1920) {
        setColsCount(4);
      } else if (w >= 1200) {
        setColsCount(3);
      } else {
        setColsCount(2);
      }
    };

    checkColumns();
    window.addEventListener('resize', checkColumns);
    return () => window.removeEventListener('resize', checkColumns);
  }, []);

  useEffect(() => {
    const cols: MediaGroup[][] = Array.from({ length: colsCount }, () => []);
    const colHeights = new Array(colsCount).fill(0);

    resolvedGroups.forEach((group) => {
      const activeIdx = activeIndices[group.prefix] || 0;
      const activeImg = group.images[activeIdx] || group.images[0];

      let minColIdx = 0;
      let minHeight = colHeights[0];

      for (let i = 1; i < colsCount; i++) {
        if (colHeights[i] < minHeight) {
          minHeight = colHeights[i];
          minColIdx = i;
        }
      }

      cols[minColIdx].push(group);
      colHeights[minColIdx] += activeImg.height / activeImg.width;
    });

    setColumns(cols);
  }, [resolvedGroups, colsCount, activeIndices]);

  const handleImageLoad = (name: string, naturalWidth: number, naturalHeight: number) => {
    setResolvedGroups((prev) =>
      prev.map((group) => {
        const updatedImages = group.images.map((img) => {
          if (img.name === name && (img.width !== naturalWidth || img.height !== naturalHeight)) {
            return { ...img, width: naturalWidth, height: naturalHeight };
          }
          return img;
        });
        return { ...group, images: updatedImages };
      })
    );
  };

  const handleIndexChange = useCallback((prefix: string, index: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [prefix]: index,
    }));
  }, []);

  if (columns.length === 0) {
    return (
      <div className="media-grid-wrapper">
        <div className="media-masonry-grid-ssr">
          {groups.map((group) => {
            const firstImg = group.images[0];
            return (
              <div key={group.prefix} className="media-masonry-item" style={{ aspectRatio: `${firstImg.width} / ${firstImg.height}` }}>
                <InteractiveTiltCard
                  borderRadius={0}
                  tiltFactor={15}
                  hoverScale={1}
                  glareEffect={true}
                  glareIntensity={0.25}
                  glareSize={60}
                >
                  <ImageZoom>
                    {firstImg.isVideo ? (
                      <video
                        src={`/media/${firstImg.name}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={`/media/${firstImg.name}`}
                        alt={firstImg.name.replace(/^\d+_/i, '').split('.')[0]}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </ImageZoom>
                </InteractiveTiltCard>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="media-grid-wrapper">
      <div className="media-masonry-grid">
        {columns.map((colGroups, colIdx) => (
          <div key={colIdx} className="media-masonry-column">
            {colGroups.map((group) => {
              const activeIdx = activeIndices[group.prefix] || 0;
              const currentImg = group.images[activeIdx] || group.images[0];
              return (
                <div 
                  key={group.prefix} 
                  className="media-masonry-item" 
                  style={{ 
                    aspectRatio: `${currentImg.width} / ${currentImg.height}`,
                  }}
                >
                  <InteractiveTiltCard
                    borderRadius={0}
                    tiltFactor={15}
                    hoverScale={1}
                    glareEffect={true}
                    glareIntensity={0.25}
                    glareSize={60}
                  >
                    <MediaSliderCard
                      groupPrefix={group.prefix}
                      images={group.images}
                      onImageLoad={handleImageLoad}
                      activeIndex={activeIdx}
                      onIndexChange={handleIndexChange}
                    />
                  </InteractiveTiltCard>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

interface MediaSliderCardProps {
  groupPrefix: string;
  images: MediaImage[];
  onImageLoad: (name: string, width: number, height: number) => void;
  activeIndex: number;
  onIndexChange: (prefix: string, index: number) => void;
}

function MediaSliderCard({ 
  groupPrefix, 
  images, 
  onImageLoad, 
  activeIndex,
  onIndexChange
}: MediaSliderCardProps) {
  const [prevImg, setPrevImg] = useState<MediaImage | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const lenis = (window as any).yapilLenis ?? (window as any).lenis;
    if (isZoomed) {
      if (typeof lenis?.stop === "function") {
        lenis.stop();
      }
    } else if (typeof lenis?.start === "function") {
      lenis.start();
    }
    return () => {
      if (typeof lenis?.start === "function") {
        lenis.start();
      }
    };
  }, [isZoomed]);

  useEffect(() => {
    if (!isZoomed || !images[activeIndex]?.isVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, activeIndex, images]);

  useEffect(() => {
    if (images.length <= 1 || isZoomed) return;

    if (images[activeIndex]?.isVideo) return;

    const interval = setInterval(() => {
      const nextIdx = (activeIndex + 1) % images.length;

      setPrevImg(images[activeIndex]);
      setIsTransitioning(true);

      const timeout = setTimeout(() => {
        onIndexChange(groupPrefix, nextIdx);
        setIsTransitioning(false);
      }, 400);

      return () => clearTimeout(timeout);
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [activeIndex, images, isZoomed, groupPrefix, onIndexChange]);

  const currentImg = images[activeIndex];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {prevImg && !isZoomed && (
        prevImg.isVideo ? (
          <video
            src={`/media/${prevImg.name}`}
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={`/media/${prevImg.name}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      )}

      <div className="relative z-10 w-full h-full">
        {currentImg.isVideo ? (
          <>
            {/* Inline video in the slider card */}
            <video
              src={`/media/${currentImg.name}`}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transition: 'opacity 0.4s ease-in-out',
              }}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                onImageLoad(currentImg.name, video.videoWidth || 1920, video.videoHeight || 1080);
              }}
              onEnded={() => {
                const nextIdx = (activeIndex + 1) % images.length;
                setPrevImg(currentImg);
                setIsTransitioning(true);
                setTimeout(() => {
                  onIndexChange(groupPrefix, nextIdx);
                  setIsTransitioning(false);
                }, 400);
              }}
            />

            {/* Zoom trigger for the video card */}
            <div 
              className="absolute inset-0 z-20 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(true);
              }}
            />

            {/* Portal to overlay video when zoomed */}
            <AnimatePresence>
              {isZoomed && createPortal(
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 cursor-zoom-out"
                  onClick={() => setIsZoomed(false)}
                >
                  <motion.video
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={`/media/${currentImg.name}`}
                    autoPlay
                    loop
                    controls
                    playsInline
                    className="max-w-[90vw] max-h-[90vh] object-contain cursor-default"
                    onClick={(e) => e.stopPropagation()}
                    onLoadedMetadata={(e) => {
                      e.currentTarget.volume = 0.3;
                    }}
                  />
                </motion.div>,
                document.body
              )}
            </AnimatePresence>
          </>
        ) : (
          <ImageZoom onZoomChange={setIsZoomed}>
            <img
              src={`/media/${currentImg.name}`}
              alt={currentImg.name.replace(/^\d+_/i, '').split('.')[0]}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transition: 'opacity 0.4s ease-in-out',
              }}
              onLoad={(e) => {
                const img = e.currentTarget;
                onImageLoad(currentImg.name, img.naturalWidth, img.naturalHeight);
              }}
            />
          </ImageZoom>
        )}
      </div>
    </div>
  );
}
