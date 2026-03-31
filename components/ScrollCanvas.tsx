'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

interface ScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
  onProgress?: (progress: number) => void;
  onLoadComplete?: () => void;
  /** Fire onLoadComplete after this many frames are ready. Default = totalFrames. */
  readyThreshold?: number;
}

export default function ScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
  onProgress,
  onLoadComplete,
  readyThreshold,
}: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [canvasMounted, setCanvasMounted] = useState(false);
  const renderFrameRef = useRef<number>(0);
  const completeFiredRef = useRef(false);

  // How many frames must settle before we unlock the site
  const threshold = readyThreshold ?? totalFrames;

  useEffect(() => {
    let settledCount = 0;
    const loadedImages: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    imagesRef.current = loadedImages;

    const handleSettled = (idx: number) => {
      settledCount++;

      // Scaled progress towards total
      const pct = Math.min((settledCount / totalFrames) * 100, 100);
      if (onProgress) onProgress(pct);

      // As soon as frame 0 is ready, boot the canvas and draw it
      if (idx === 0 && !canvasMounted) {
        setCanvasMounted(true);
      }

      // Unlock the preloader once threshold frames have settled
      if (settledCount >= threshold && !completeFiredRef.current) {
        completeFiredRef.current = true;
        if (onLoadComplete) onLoadComplete();
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const idx = i - 1;
      const paddedIndex = i.toString().padStart(3, '0');

      img.onload = () => {
        loadedImages[idx] = img;
        handleSettled(idx);
      };
      img.onerror = () => {
        loadedImages[idx] = null;
        handleSettled(idx);
      };

      // Give first 10 frames high browser fetch priority
      if (i <= 10) img.setAttribute('fetchpriority', 'high');

      img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;

      // Hit cache immediately
      if (img.complete) {
        img.onload = null;
        img.onerror = null;
        loadedImages[idx] = img;
        handleSettled(idx);
      }
    }

    // Hard fallback: 8s max then force-unlock regardless
    const timeout = setTimeout(() => {
      if (!completeFiredRef.current) {
        completeFiredRef.current = true;
        if (onLoadComplete) onLoadComplete();
      }
    }, 8000);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, imageFolderPath]);

  // ─── Drawing ───────────────────────────────────────────────────────────────

  const drawImage = (img: HTMLImageElement | null | undefined) => {
    if (!canvasRef.current || !img || !img.complete || img.naturalWidth === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const canvasAR = rect.width / rect.height;
    const imgAR = img.naturalWidth / img.naturalHeight;
    let rw = rect.width, rh = rect.height, x = 0, y = 0;
    if (imgAR > canvasAR) {
      rw = rect.height * imgAR;
      x = (rect.width - rw) / 2;
    } else {
      rh = rect.width / imgAR;
      y = (rect.height - rh) / 2;
    }

    ctx.drawImage(img, x, y, rw, rh);
    ctx.restore();
  };

  // Scroll → frame
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const imgs = imagesRef.current;
    if (!imgs.length) return;
    const frameIndex = Math.min(Math.floor(latest * totalFrames), totalFrames - 1);
    if (frameIndex !== renderFrameRef.current) {
      renderFrameRef.current = frameIndex;
      const img = imgs[frameIndex];
      if (img?.complete && img.naturalWidth > 0) {
        requestAnimationFrame(() => drawImage(img));
      }
    }
  });

  // First draw + resize listener
  useEffect(() => {
    if (!canvasMounted) return;
    const imgs = imagesRef.current;
    const handleResize = () => drawImage(imgs[renderFrameRef.current]);
    window.addEventListener('resize', handleResize);
    drawImage(imgs[0]);
    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasMounted]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
    />
  );
}
