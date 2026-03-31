'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

interface ScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
  onProgress?: (progress: number) => void;
  onLoadComplete?: () => void;
}

export default function ScrollCanvas({ scrollYProgress, totalFrames, imageFolderPath, onProgress, onLoadComplete }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const renderFrameRef = useRef<number>(0);

  // Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const handleSettled = () => {
      loadedCount++;
      if (onProgress) onProgress(Math.min((loadedCount / totalFrames) * 100, 100));
      if (loadedCount === totalFrames && onLoadComplete) onLoadComplete();
    };

    for (let i = 1; i <= totalFrames; i++) {
       const img = new Image();
       const paddedIndex = i.toString().padStart(3, '0');

       img.onload = handleSettled;
       // Critical fix: if any image errors (404, network, etc.) still count it
       // so the preloader never gets permanently stuck
       img.onerror = handleSettled;
       
       // Use absolute path to guarantee resolution from domain root on Vercel
       img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
       if (img.complete) {
          img.onload = null;
          img.onerror = null;
          handleSettled();
       }

       loadedImages.push(img);
    }
    setImages(loadedImages);

    // Safety timeout: if still loading after 15s, force-complete the preloader
    const timeout = setTimeout(() => {
      if (loadedCount < totalFrames && onLoadComplete) {
        onLoadComplete();
      }
    }, 15000);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, imageFolderPath]);

  // Handle Resize and Drawing Logic
  const drawImage = (img: HTMLImageElement | undefined) => {
    if (!canvasRef.current || !img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Resize canvas context backing store if needed
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    } else {
      ctx.save();
      ctx.scale(dpr, dpr);
    }

    // Object-fit: cover logic
    const canvasAspectRatio = rect.width / rect.height;
    const imageAspectRatio = img.width / img.height;

    let renderWidth = rect.width;
    let renderHeight = rect.height;
    let x = 0;
    let y = 0;

    if (imageAspectRatio > canvasAspectRatio) {
      renderWidth = rect.height * imageAspectRatio;
      x = (rect.width - renderWidth) / 2;
    } else {
      renderHeight = rect.width / imageAspectRatio;
      y = (rect.height - renderHeight) / 2;
    }

    ctx.drawImage(img, x, y, renderWidth, renderHeight);

    // If we scaled above, restore
    if (canvas.width === rect.width * dpr && canvas.height === rect.height * dpr) {
      ctx.restore();
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    // Map scroll progress (0..1) to frame index (0..totalFrames-1)
    const frameIndex = Math.min(
      Math.floor(latest * totalFrames),
      totalFrames - 1
    );

    if (frameIndex !== renderFrameRef.current) {
      renderFrameRef.current = frameIndex;
      requestAnimationFrame(() => drawImage(images[frameIndex]));
    }
  });

  // initial draw and on window resize draw
  useEffect(() => {
    if (images.length > 0) {
      const handleResize = () => drawImage(images[renderFrameRef.current]);
      window.addEventListener('resize', handleResize);
      drawImage(images[renderFrameRef.current]);
      
      // Attempt first draw once image 0 loads
      if(!images[0].complete) {
        images[0].onload = () => drawImage(images[0]);
      } else {
        drawImage(images[0]);
      }

      return () => window.removeEventListener('resize', handleResize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
    />
  );
}
