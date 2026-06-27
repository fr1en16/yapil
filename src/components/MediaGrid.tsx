'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { InteractiveTiltCard } from '@/components/ui/tilt-card';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';

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

interface LightboxState {
  prefix: string;
  index: number;
}

export default function MediaGrid({ groups }: MediaGridProps) {
  const [resolvedGroups, setResolvedGroups] = useState<MediaGroup[]>(groups);
  const [columns, setColumns] = useState<MediaGroup[][]>([]);
  const [colsCount, setColsCount] = useState<number>(4);
  const [activeIndices, setActiveIndices] = useState<{ [prefix: string]: number }>({});
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

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

  const openLightbox = useCallback((prefix: string, index: number) => {
    setLightbox({ prefix, index });
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
                  <div
                    className="relative h-full w-full"
                    role="button"
                    tabIndex={0}
                    aria-label={`Открыть ${firstImg.name} на весь экран`}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openLightbox(group.prefix, 0);
                      }
                    }}
                  >
                    {firstImg.isVideo ? (
                      <video
                        src={`/media/${firstImg.name}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full cursor-zoom-in object-cover"
                        onClick={(event) => {
                          event.stopPropagation();
                          openLightbox(group.prefix, 0);
                        }}
                      />
                    ) : (
                      <img
                        src={`/media/${firstImg.name}`}
                        alt={firstImg.name.replace(/^\d+_/i, '').split('.')[0]}
                        loading="lazy"
                        className="w-full h-full cursor-zoom-in object-cover"
                        onClick={(event) => {
                          event.stopPropagation();
                          openLightbox(group.prefix, 0);
                        }}
                      />
                    )}
                  </div>
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
                      onOpen={openLightbox}
                      isLightboxOpen={lightbox?.prefix === group.prefix}
                    />
                  </InteractiveTiltCard>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {lightbox && (
        <MediaLightbox
          groups={resolvedGroups}
          state={lightbox}
          onChange={(nextState) => {
            setLightbox(nextState);
            handleIndexChange(nextState.prefix, nextState.index);
          }}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

interface MediaSliderCardProps {
  groupPrefix: string;
  images: MediaImage[];
  onImageLoad: (name: string, width: number, height: number) => void;
  activeIndex: number;
  onIndexChange: (prefix: string, index: number) => void;
  onOpen: (prefix: string, index: number) => void;
  isLightboxOpen: boolean;
}

function MediaSliderCard({ 
  groupPrefix, 
  images, 
  onImageLoad, 
  activeIndex,
  onIndexChange,
  onOpen,
  isLightboxOpen,
}: MediaSliderCardProps) {
  const [prevImg, setPrevImg] = useState<MediaImage | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isLightboxOpen) return;

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
  }, [activeIndex, images, isLightboxOpen, groupPrefix, onIndexChange]);

  const currentImg = images[activeIndex];

  return (
    <div
      className="relative h-full w-full select-none overflow-hidden"
      onClickCapture={(event) => {
        event.stopPropagation();
        onOpen(groupPrefix, activeIndex);
      }}
    >
      {prevImg && !isLightboxOpen && (
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

      <div
        className="relative z-10 h-full w-full"
        role="button"
        tabIndex={0}
        aria-label={`Открыть ${currentImg.name} на весь экран`}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen(groupPrefix, activeIndex);
          }
        }}
      >
        {currentImg.isVideo ? (
          <video
            src={`/media/${currentImg.name}`}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full cursor-zoom-in object-cover"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 0.4s ease-in-out',
            }}
            onLoadedMetadata={(e) => {
              const video = e.currentTarget;
              onImageLoad(currentImg.name, video.videoWidth || 1920, video.videoHeight || 1080);
            }}
          />
        ) : (
          <img
            src={`/media/${currentImg.name}`}
            alt={currentImg.name.replace(/^\d+_/i, '').split('.')[0]}
            loading="lazy"
            className="w-full h-full cursor-zoom-in object-cover"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 0.4s ease-in-out',
            }}
            onLoad={(e) => {
              const img = e.currentTarget;
              onImageLoad(currentImg.name, img.naturalWidth, img.naturalHeight);
            }}
          />
        )}
      </div>
    </div>
  );
}

interface MediaLightboxProps {
  groups: MediaGroup[];
  state: LightboxState;
  onChange: (state: LightboxState) => void;
  onClose: () => void;
}

function MediaLightbox({ groups, state, onChange, onClose }: MediaLightboxProps) {
  const group = groups.find((item) => item.prefix === state.prefix);
  const images = group?.images ?? [];
  const current = images[state.index] ?? images[0];
  const hasNavigation = images.length > 1;

  const move = useCallback((direction: -1 | 1) => {
    if (!images.length) return;
    const nextIndex = (state.index + direction + images.length) % images.length;
    onChange({ prefix: state.prefix, index: nextIndex });
  }, [images.length, onChange, state.index, state.prefix]);

  useEffect(() => {
    const lenis = (window as Window & { yapilLenis?: { stop?: () => void; start?: () => void }; lenis?: { stop?: () => void; start?: () => void } }).yapilLenis
      ?? (window as Window & { lenis?: { stop?: () => void; start?: () => void } }).lenis;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop?.();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start?.();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, onClose]);

  if (!current) return null;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Медиагалерея ${state.prefix}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white hover:text-black md:right-6 md:top-6"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      {hasNavigation && (
        <>
          <button
            type="button"
            aria-label="Предыдущее медиа"
            className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white hover:text-black md:left-6"
            onClick={(event) => {
              event.stopPropagation();
              move(-1);
            }}
          >
            <ChevronLeft size={30} />
          </button>
          <button
            type="button"
            aria-label="Следующее медиа"
            className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white hover:text-black md:right-6"
            onClick={(event) => {
              event.stopPropagation();
              move(1);
            }}
          >
            <ChevronRight size={30} />
          </button>
        </>
      )}

      <motion.div
        key={current.name}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        drag={!current.isVideo && hasNavigation ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 || info.velocity.x < -500) move(1);
          if (info.offset.x > 50 || info.velocity.x > 500) move(-1);
        }}
        className="flex h-full w-full items-center justify-center px-2 py-16 md:px-24 md:py-10"
        style={{ touchAction: 'pan-y' }}
      >
        {current.isVideo ? (
          <LightboxVideoPlayer src={`/media/${current.name}`} title={current.name} />
        ) : (
          <img
            src={`/media/${current.name}`}
            alt={current.name.replace(/^\d+_/i, '').split('.')[0]}
            className="h-auto w-auto max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-1rem)] object-contain md:max-h-[calc(100dvh-5rem)] md:max-w-[calc(100vw-12rem)]"
            onClick={(event) => event.stopPropagation()}
          />
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

interface LightboxVideoPlayerProps {
  src: string;
  title: string;
}

function LightboxVideoPlayer({ src, title }: LightboxVideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;
    const video = videoRef.current;
    if (!player || !video) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (player.requestFullscreen) {
      await player.requestFullscreen();
      return;
    }

    const iosVideo = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    iosVideo.webkitEnterFullscreen?.();
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={playerRef}
      className="media-video-player group/player relative inline-flex h-auto w-auto max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-1rem)] items-center justify-center overflow-hidden bg-black md:max-h-[calc(100dvh-5rem)] md:max-w-[calc(100vw-12rem)]"
      onClick={(event) => event.stopPropagation()}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted={isMuted}
        playsInline
        aria-label={title}
        className="block h-auto w-auto max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-1rem)] object-contain md:max-h-[calc(100dvh-5rem)] md:max-w-[calc(100vw-12rem)]"
        onClick={togglePlayback}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => {
          event.currentTarget.volume = 0.3;
          event.currentTarget.muted = false;
          setIsMuted(false);
          setDuration(event.currentTarget.duration || 0);
        }}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      >
        Ваш браузер не поддерживает видео.
      </video>

      {!isPlaying && (
        <button
          type="button"
          aria-label="Воспроизвести"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]"
          onClick={togglePlayback}
        >
          <Play size={25} fill="currentColor" />
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-4 pt-12 opacity-100 transition-opacity md:opacity-0 md:group-hover/player:opacity-100 md:group-focus-within/player:opacity-100">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={currentTime}
          aria-label="Позиция видео"
          className="media-video-progress mb-3 block w-full cursor-pointer"
          style={{ '--video-progress': `${progress}%` } as React.CSSProperties}
          onChange={(event) => {
            const nextTime = Number(event.currentTarget.value);
            if (videoRef.current) videoRef.current.currentTime = nextTime;
            setCurrentTime(nextTime);
          }}
        />

        <div className="flex items-center gap-1 text-white">
          <button
            type="button"
            aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
            className="flex h-9 w-9 items-center justify-center transition-colors hover:text-[var(--accent)]"
            onClick={togglePlayback}
          >
            {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
          </button>
          <button
            type="button"
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            className="flex h-9 w-9 items-center justify-center transition-colors hover:text-[var(--accent)]"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <span className="ml-2 font-mono text-[11px] tracking-wide text-white/70">
            {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
          </span>
          <button
            type="button"
            aria-label={isFullscreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
            className="ml-auto flex h-9 w-9 items-center justify-center transition-colors hover:text-[var(--accent)]"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatVideoTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
