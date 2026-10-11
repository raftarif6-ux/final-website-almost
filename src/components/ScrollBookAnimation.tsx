import React, { useEffect, useRef, useState } from 'react';
import { BOOK_SPECIMEN_IMAGE } from '../data/ebookData';

interface NodeParticle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
}

export const ScrollBookAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  const particlesRef = useRef<NodeParticle[]>([]);
  const coverImageRef = useRef<HTMLImageElement | null>(null);
  const isImageLoadedRef = useRef(false);

  useEffect(() => {
    const pts: NodeParticle[] = [];
    const count = 38;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = 40 + Math.random() * 140;
      const y = -120 + Math.random() * 240;
      pts.push({
        x: 0,
        y: y,
        z: 0,
        baseX: Math.cos(theta) * r,
        baseY: y,
        baseZ: Math.sin(theta) * r,
        radius: 1.5 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7,
        pulseSpeed: 1 + Math.random() * 2,
      });
    }
    particlesRef.current = pts;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = BOOK_SPECIMEN_IMAGE;
    img.onload = () => {
      coverImageRef.current = img;
      isImageLoadedRef.current = true;
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const raw = Math.max(0, Math.min(1, scrolled / totalScrollable));
      targetProgress = raw;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const updateLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;
      setProgress(currentProgress);
      drawCanvas(currentProgress);
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const drawCanvas = (p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 + 10;

    const ambientGlow = ctx.createRadialGradient(
      centerX, centerY, 30,
      centerX, centerY, Math.max(width, height) * 0.6
    );
    ambientGlow.addColorStop(0, 'rgba(230, 165, 50, 0.08)');
    ambientGlow.addColorStop(0.5, 'rgba(110, 168, 255, 0.03)');
    ambientGlow.addColorStop(1, 'rgba(7, 9, 12, 0)');
    ctx.fillStyle = ambientGlow;
    ctx.fillRect(0, 0, width, height);

    const openFactor = Math.sin(Math.min(1, Math.max(0, (p - 0.05) / 0.75)) * Math.PI);
    const cameraRotation = Math.sin(p * Math.PI * 1.5) * 0.35;
    const scale = Math.min(width / 750, height / 650) * (0.85 + openFactor * 0.15);

    const pedestalY = centerY + 195 * scale;
    const pedestalW = 320 * scale;
    const pedestalH = 34 * scale;

    const pedGrad = ctx.createRadialGradient(
      centerX, pedestalY + 10 * scale, 10,
      centerX, pedestalY + 10 * scale, pedestalW * 0.9
    );
    pedGrad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
    pedGrad.addColorStop(0.7, 'rgba(16, 21, 28, 0.4)');
    pedGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = pedGrad;
    ctx.beginPath();
    ctx.ellipse(centerX, pedestalY + 12 * scale, pedestalW * 0.85, pedestalH * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#171D25';
    ctx.strokeStyle = '#2A3441';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(centerX, pedestalY, pedestalW * 0.65, pedestalH * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(centerX, pedestalY - 2, pedestalW * 0.63, pedestalH * 0.33, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E252E';
    ctx.fill();

    const bookW = 160 * scale;
    const bookH = 245 * scale;

    ctx.save();
    ctx.translate(centerX, centerY - 15 * scale);

    const pageCount = 14;
    for (let i = 0; i < pageCount; i++) {
      const pageIndexNorm = i / (pageCount - 1);
      const maxSpread = openFactor * Math.PI * 0.88;
      const angle = (pageIndexNorm - 0.5) * maxSpread + cameraRotation * 0.4;
      const pageElevation = Math.sin(pageIndexNorm * Math.PI) * (openFactor * 45 * scale);
      const isLeft = pageIndexNorm < 0.5;

      ctx.save();
      ctx.rotate(angle * 0.65);
      ctx.translate((isLeft ? -1 : 1) * (openFactor * 18 * scale), -pageElevation * 0.3);

      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 12 * scale;
      ctx.shadowOffsetX = isLeft ? -4 * scale : 4 * scale;

      const pW = bookW * 0.92;
      const pH = bookH * 0.96;
      const pX = isLeft ? -pW : 0;
      const pY = -pH / 2;

      const pageGrad = ctx.createLinearGradient(pX, pY, pX + pW, pY);
      if (isLeft) {
        pageGrad.addColorStop(0, '#EAE6DD');
        pageGrad.addColorStop(0.8, '#F5F2EB');
        pageGrad.addColorStop(1, '#D8D4CA');
      } else {
        pageGrad.addColorStop(0, '#D8D4CA');
        pageGrad.addColorStop(0.2, '#F5F2EB');
        pageGrad.addColorStop(1, '#EAE6DD');
      }
      ctx.fillStyle = pageGrad;
      ctx.beginPath();
      const curl = (1 - Math.abs(pageIndexNorm - 0.5) * 2) * openFactor * 12 * scale;
      ctx.moveTo(pX, pY);
      ctx.quadraticCurveTo(pX + pW / 2, pY - curl, pX + pW, pY);
      ctx.lineTo(pX + pW, pY + pH);
      ctx.quadraticCurveTo(pX + pW / 2, pY + pH - curl, pX, pY + pH);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(42, 52, 65, 0.25)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      if (openFactor > 0.25 && (i === 3 || i === 4 || i === 9 || i === 10)) {
        ctx.fillStyle = 'rgba(82, 101, 124, 0.22)';
        const lineCount = 12;
        const lineStart = pX + (isLeft ? 16 : 24) * scale;
        const lineWidth = pW - 40 * scale;
        for (let l = 0; l < lineCount; l++) {
          const ly = pY + (35 + l * 14) * scale;
          ctx.fillRect(lineStart, ly, lineWidth * (l % 3 === 0 ? 0.7 : 0.95), 1.5 * scale);
        }
      }
      ctx.restore();
    }

    if (openFactor > 0.12) {
      const time = performance.now() * 0.0015;
      const pts = particlesRef.current;
      const spread = openFactor * 1.35;
      const projectedPts: { x: number; y: number; alpha: number; radius: number }[] = [];

      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        const cosR = Math.cos(cameraRotation + time * 0.2);
        const sinR = Math.sin(cameraRotation + time * 0.2);
        const bx = pt.baseX * spread * scale;
        const bz = pt.baseZ * spread * scale;
        const rotX = bx * cosR - bz * sinR;
        const rotZ = bx * sinR + bz * cosR;
        const py = pt.baseY * scale + Math.sin(time * pt.pulseSpeed + i) * 8 * scale;
        const depth = 400;
        const pers = depth / (depth + rotZ);
        const screenX = rotX * pers;
        const screenY = py * pers;

        projectedPts.push({
          x: screenX,
          y: screenY,
          alpha: Math.min(1, pt.alpha * openFactor * 1.3),
          radius: pt.radius * pers * scale,
        });
      }

      ctx.lineWidth = 1 * scale;
      for (let i = 0; i < projectedPts.length; i++) {
        for (let j = i + 1; j < projectedPts.length; j++) {
          const p1 = projectedPts[i];
          const p2 = projectedPts[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 75 * scale * openFactor;
          if (dist < maxDist) {
            const edgeAlpha = (1 - dist / maxDist) * Math.min(p1.alpha, p2.alpha) * 0.55;
            ctx.strokeStyle = `rgba(243, 195, 68, ${edgeAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projectedPts.length; i++) {
        const pNode = projectedPts[i];
        const glow = ctx.createRadialGradient(
          pNode.x, pNode.y, 0,
          pNode.x, pNode.y, pNode.radius * 4.5
        );
        glow.addColorStop(0, `rgba(255, 215, 80, ${pNode.alpha * 0.95})`);
        glow.addColorStop(0.4, `rgba(243, 156, 18, ${pNode.alpha * 0.5})`);
        glow.addColorStop(1, 'rgba(243, 156, 18, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pNode.x, pNode.y, pNode.radius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 250, 215, ${pNode.alpha})`;
        ctx.beginPath();
        ctx.arc(pNode.x, pNode.y, Math.max(1, pNode.radius * 0.8), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.save();
    const coverAngle = -openFactor * Math.PI * 0.75 + cameraRotation * 0.5;
    ctx.rotate(coverAngle);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 24 * scale;
    ctx.shadowOffsetX = -10 * scale;
    ctx.shadowOffsetY = 15 * scale;

    const cW = bookW;
    const cH = bookH;
    const cX = -cW;
    const cY = -cH / 2;

    ctx.fillStyle = '#0c0e11';
    ctx.beginPath();
    ctx.roundRect(cX, cY, cW, cH, 2 * scale);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    if (isImageLoadedRef.current && coverImageRef.current) {
      ctx.drawImage(coverImageRef.current, cX, cY, cW, cH);
    } else {
      ctx.fillStyle = '#10151C';
      ctx.fillRect(cX, cY, cW, cH);
      ctx.fillStyle = '#F3F0E8';
      ctx.font = `600 ${14 * scale}px Geist, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('AI SIDE HUSTLES', cX + cW / 2, cY + 55 * scale);
      ctx.font = `400 ${11 * scale}px Geist, sans-serif`;
      ctx.fillStyle = '#ffd166';
      ctx.fillText('FOR BEGINNERS', cX + cW / 2, cY + 75 * scale);
    }

    const spineGrad = ctx.createLinearGradient(0, cY, 12 * scale, cY);
    spineGrad.addColorStop(0, 'rgba(255,255,255,0.18)');
    spineGrad.addColorStop(0.4, 'rgba(255,255,255,0.05)');
    spineGrad.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = spineGrad;
    ctx.fillRect(0, cY, 10 * scale, cH);

    ctx.strokeStyle = 'rgba(255, 209, 102, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(cX, cY, cW, cH);

    ctx.restore();
    ctx.restore();
    ctx.restore();
  };

  return (
    <section
      id="scroll-animation"
      ref={containerRef}
      className="relative w-full bg-[#07090C] border-y border-[#2A3441]/50"
      style={{ height: '320vh' }}
      aria-label="Scroll-driven 3D animation"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-[#2A3441]/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ffd166] to-[#f39c12] transition-all duration-75"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
};
