import React, { useRef, useEffect } from 'react';

interface IntersectionNode {
  x: number;
  y: number;
  type: 'roadmap-delivery' | 'roadmap-strategy' | 'delivery-strategy';
}

export const TempoVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Handle high DPI crisp rendering
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.018;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      const gridCols = 12;
      for (let i = 1; i < gridCols; i++) {
        const x = (width / gridCols) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      const gridRows = 5;
      for (let j = 1; j < gridRows; j++) {
        const y = (height / gridRows) * j;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── WAVE PARAMETERS (Harmonically centered to cross and align) ──
      // 1. STRATEGY WAVE (Violet / Deep Foundational Swell)
      const w1Base = height * 0.55;
      const w1Amp = 34;
      const w1Freq = 0.0035;
      const w1Speed = 0.55;

      // 2. DELIVERY WAVE (Sky / Mid-Frequency Continuous Value Delivery)
      const w2Base = height * 0.49;
      const w2Amp = 36;
      const w2Freq = 0.0078;
      const w2Speed = 1.05;

      // 3. ROADMAP WAVE (Electric Cyan / Agile Prioritized Flow)
      const w3Base = height * 0.43;
      const w3Amp = 34;
      const w3Freq = 0.0145;
      const w3Speed = 1.7;

      // Sample curves at step size dx
      const step = 2;
      const pointsW1: { x: number; y: number }[] = [];
      const pointsW2: { x: number; y: number }[] = [];
      const pointsW3: { x: number; y: number }[] = [];
      const intersections: IntersectionNode[] = [];

      for (let x = 0; x <= width; x += step) {
        const y1 =
          w1Base +
          Math.sin(x * w1Freq + time * w1Speed) * w1Amp +
          Math.cos(x * w1Freq * 0.5 + time * 0.35) * 12;

        const y2 =
          w2Base +
          Math.sin(x * w2Freq - time * w2Speed) * w2Amp +
          Math.sin(x * w2Freq * 1.8 + time * 0.65) * 14;

        const y3 =
          w3Base +
          Math.sin(x * w3Freq + time * w3Speed) * w3Amp +
          Math.cos(x * w3Freq * 2.2 + time * 1.15) * 10;

        pointsW1.push({ x, y: y1 });
        pointsW2.push({ x, y: y2 });
        pointsW3.push({ x, y: y3 });

        // Check exact crossings between previous step and current step
        const len = pointsW1.length;
        if (len > 1) {
          const prev = len - 2;
          const curr = len - 1;

          // 1. Roadmap (w3) crossing Delivery (w2)
          const d32_prev = pointsW3[prev].y - pointsW2[prev].y;
          const d32_curr = pointsW3[curr].y - pointsW2[curr].y;
          if (d32_prev * d32_curr <= 0 && Math.abs(d32_prev - d32_curr) > 0.0001) {
            const t = Math.abs(d32_prev) / (Math.abs(d32_prev) + Math.abs(d32_curr));
            const ix = pointsW3[prev].x + t * (pointsW3[curr].x - pointsW3[prev].x);
            // Exactly on the line segment
            const iy = pointsW3[prev].y + t * (pointsW3[curr].y - pointsW3[prev].y);
            intersections.push({ x: ix, y: iy, type: 'roadmap-delivery' });
          }

          // 2. Roadmap (w3) crossing Strategy (w1)
          const d31_prev = pointsW3[prev].y - pointsW1[prev].y;
          const d31_curr = pointsW3[curr].y - pointsW1[curr].y;
          if (d31_prev * d31_curr <= 0 && Math.abs(d31_prev - d31_curr) > 0.0001) {
            const t = Math.abs(d31_prev) / (Math.abs(d31_prev) + Math.abs(d31_curr));
            const ix = pointsW3[prev].x + t * (pointsW3[curr].x - pointsW3[prev].x);
            const iy = pointsW3[prev].y + t * (pointsW3[curr].y - pointsW3[prev].y);
            intersections.push({ x: ix, y: iy, type: 'roadmap-strategy' });
          }

          // 3. Delivery (w2) crossing Strategy (w1)
          const d21_prev = pointsW2[prev].y - pointsW1[prev].y;
          const d21_curr = pointsW2[curr].y - pointsW1[curr].y;
          if (d21_prev * d21_curr <= 0 && Math.abs(d21_prev - d21_curr) > 0.0001) {
            const t = Math.abs(d21_prev) / (Math.abs(d21_prev) + Math.abs(d21_curr));
            const ix = pointsW2[prev].x + t * (pointsW2[curr].x - pointsW2[prev].x);
            const iy = pointsW2[prev].y + t * (pointsW2[curr].y - pointsW2[prev].y);
            intersections.push({ x: ix, y: iy, type: 'delivery-strategy' });
          }
        }
      }

      // ── DRAW WAVE 1: STRATEGY (Deep Violet) ──
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (const pt of pointsW1) ctx.lineTo(pt.x, pt.y);
      ctx.lineTo(width, height);
      ctx.closePath();
      const grad1 = ctx.createLinearGradient(0, w1Base - 50, 0, height);
      grad1.addColorStop(0, 'rgba(139, 92, 246, 0.16)');
      grad1.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
      ctx.fillStyle = grad1;
      ctx.fill();

      ctx.beginPath();
      for (let i = 0; i < pointsW1.length; i++) {
        if (i === 0) ctx.moveTo(pointsW1[i].x, pointsW1[i].y);
        else ctx.lineTo(pointsW1[i].x, pointsW1[i].y);
      }
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#8B5CF6';
      ctx.stroke();

      // ── DRAW WAVE 2: DELIVERY (Sky Blue) ──
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (const pt of pointsW2) ctx.lineTo(pt.x, pt.y);
      ctx.lineTo(width, height);
      ctx.closePath();
      const grad2 = ctx.createLinearGradient(0, w2Base - 60, 0, height);
      grad2.addColorStop(0, 'rgba(2, 132, 199, 0.20)');
      grad2.addColorStop(1, 'rgba(2, 132, 199, 0.0)');
      ctx.fillStyle = grad2;
      ctx.fill();

      ctx.beginPath();
      for (let i = 0; i < pointsW2.length; i++) {
        if (i === 0) ctx.moveTo(pointsW2[i].x, pointsW2[i].y);
        else ctx.lineTo(pointsW2[i].x, pointsW2[i].y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#0284C7';
      ctx.stroke();

      // ── DRAW WAVE 3: ROADMAP (Electric Cyan Glowing Pulse) ──
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (const pt of pointsW3) ctx.lineTo(pt.x, pt.y);
      ctx.lineTo(width, height);
      ctx.closePath();
      const grad3 = ctx.createLinearGradient(0, w3Base - 50, 0, height);
      grad3.addColorStop(0, 'rgba(0, 240, 255, 0.22)');
      grad3.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
      ctx.fillStyle = grad3;
      ctx.fill();

      ctx.beginPath();
      for (let i = 0; i < pointsW3.length; i++) {
        if (i === 0) ctx.moveTo(pointsW3[i].x, pointsW3[i].y);
        else ctx.lineTo(pointsW3[i].x, pointsW3[i].y);
      }
      ctx.lineWidth = 2.8;
      ctx.strokeStyle = '#00F0FF';
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── DRAW GLOWING ALIGNMENT NODES (LOCKED DIRECTLY ON LINE CROSSINGS) ──
      for (const node of intersections) {
        // Dynamic pulse radius on node
        const pulse = Math.sin(time * 4 + node.x * 0.02) * 1.5;

        // Outer soft glow halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6.5 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.22)';
        ctx.fill();

        // Thin radiant ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8.5 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Solid brilliant center pinpoint locked precisely on the line
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Vertical rhythmic scanline
      const scanX = ((time * 0.75) % 1) * width;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full max-w-[1180px] mx-auto px-4 mt-8">
      {/* Main Waveform Display Card */}
      <div className="bg-[#0A0F1D] text-white rounded-2xl p-5 sm:p-7 shadow-2xl border border-slate-800/80 relative overflow-hidden">
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Header: Eyebrow on left, Legend on right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-mono-tag text-xs tracking-widest uppercase font-semibold text-slate-300">
              Aligning Roadmap, Delivery & Strategy
            </span>
          </div>

          {/* Clean Dynamic Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tag text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00F0FF]" />
              <span className="text-cyan-400 font-semibold">Roadmap</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-sky-400 rounded-full" />
              <span className="text-sky-400 font-semibold">Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-violet-400 rounded-full" />
              <span className="text-violet-400 font-semibold">Strategy</span>
            </div>
          </div>
        </div>

        {/* Waveform Canvas Area */}
        <div className="relative pt-4 select-none">
          <div className="relative h-52 sm:h-64 w-full bg-slate-950/70 rounded-xl border border-slate-800/80 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
            />
          </div>
        </div>

        {/* Visual Indicator footer note */}
        <div className="mt-3.5 flex items-center text-[11px] text-slate-500 font-mono-tag">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Harmonic Alignment</span>
          </div>
        </div>
      </div>
    </div>
  );
};
