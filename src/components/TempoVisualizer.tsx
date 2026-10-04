import React, { useRef, useEffect } from 'react';

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
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background horizontal and vertical grid lines
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
      const gridRows = 4;
      for (let j = 1; j < gridRows; j++) {
        const y = (height / gridRows) * j;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 1. STRATEGY WAVE (Deep, smooth low-frequency foundational swell in violet)
      {
        const baseHeight = height * 0.72;
        const amp = 26;
        const freq = 0.0035;
        const speed = 0.6;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        for (let x = 0; x <= width; x += 3) {
          const y =
            baseHeight +
            Math.sin(x * freq + time * speed) * amp +
            Math.cos(x * freq * 0.5 + time * 0.4) * 12;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Gradient fill
        const grad = ctx.createLinearGradient(0, baseHeight - 40, 0, height);
        grad.addColorStop(0, 'rgba(139, 92, 246, 0.18)');
        grad.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const y =
            baseHeight +
            Math.sin(x * freq + time * speed) * amp +
            Math.cos(x * freq * 0.5 + time * 0.4) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = '#8B5CF6';
        ctx.stroke();
      }

      // 2. RELEASE WAVE (Medium frequency continuous delivery pulse in azure/sky)
      {
        const baseHeight = height * 0.52;
        const amp = 34;
        const freq = 0.008;
        const speed = 1.1;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        for (let x = 0; x <= width; x += 3) {
          const y =
            baseHeight +
            Math.sin(x * freq - time * speed) * amp +
            Math.sin(x * freq * 1.8 + time * 0.7) * 14;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Gradient fill
        const grad = ctx.createLinearGradient(0, baseHeight - 50, 0, height);
        grad.addColorStop(0, 'rgba(2, 132, 199, 0.22)');
        grad.addColorStop(1, 'rgba(2, 132, 199, 0.0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const y =
            baseHeight +
            Math.sin(x * freq - time * speed) * amp +
            Math.sin(x * freq * 1.8 + time * 0.7) * 14;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#0284C7';
        ctx.stroke();
      }

      // 3. SPRINT WAVE (Fast, agile high-frequency execution pulse in electric cyan)
      {
        const baseHeight = height * 0.32;
        const amp = 30;
        const freq = 0.015;
        const speed = 1.8;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        for (let x = 0; x <= width; x += 3) {
          const y =
            baseHeight +
            Math.sin(x * freq + time * speed) * amp +
            Math.cos(x * freq * 2.2 + time * 1.2) * 10;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Gradient fill
        const grad = ctx.createLinearGradient(0, baseHeight - 40, 0, height);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Glowing Stroke
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const y =
            baseHeight +
            Math.sin(x * freq + time * speed) * amp +
            Math.cos(x * freq * 2.2 + time * 1.2) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = 2.8;
        ctx.strokeStyle = '#00F0FF';
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow
      }

      // Draw subtle rhythmic pulse points along the peaks
      const pulseTime = (time * 0.8) % 1;
      const scanX = pulseTime * width;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
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
      <div className="bg-[#0A0F1D] text-white rounded-2xl p-5 sm:p-7 shadow-2xl border border-slate-800/80 relative overflow-hidden">
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Header matching Image 1: Eyebrow on left, Legend on right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-mono-tag text-xs tracking-widest uppercase font-semibold text-slate-300">
              Aligning Strategy with Execution
            </span>
          </div>

          {/* Clean Legend matching Image 1 */}
          <div className="flex items-center gap-5 text-xs font-mono-tag text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00F0FF]" />
              <span className="text-cyan-400 font-medium">Sprint</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-sky-400 rounded-full" />
              <span className="text-sky-400 font-medium">Release</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-violet-400 rounded-full" />
              <span className="text-violet-400 font-medium">Strategy</span>
            </div>
          </div>
        </div>

        {/* Waveform Canvas Area */}
        <div className="relative pt-4 select-none">
          <div className="relative h-48 sm:h-64 w-full bg-slate-950/70 rounded-xl border border-slate-800/80 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
