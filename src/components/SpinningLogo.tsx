import React, { useState } from 'react';

interface SpinningLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  interactive?: boolean;
}

export const SpinningLogo: React.FC<SpinningLogoProps> = ({
  size = 'md',
  className = '',
  interactive = true,
}) => {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    hero: 'w-28 h-28 sm:w-32 sm:h-32',
  }[size];

  // Primary local files with live fallback
  const ringPrimary = './uploads/cadence-x-outer-ring.png';
  const ringFallback = 'https://www.cadence-x.com/uploads/cadence-x-outer-ring.png';
  const staticPrimary = './uploads/cadence-x-static.png';
  const staticFallback = 'https://www.cadence-x.com/uploads/cadence-x-static.png';

  const [ringSrc, setRingSrc] = useState(ringPrimary);
  const [staticSrc, setStaticSrc] = useState(staticPrimary);

  // Dynamic animation duration based on speed state
  const durationSec = isHovered ? 12 : speedMultiplier === 2 ? 8 : 40;

  return (
    <div
      className={`relative rounded-full overflow-hidden select-none transition-transform duration-300 ${sizeClasses} ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onClick={() => {
        if (interactive) {
          setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1));
        }
      }}
      title={interactive ? 'Cadence-X Rhythm Core — Click to boost cycle velocity' : 'Cadence-X'}
      role="img"
      aria-label="Cadence-X spinning logo"
    >
      {/* Outer ambient glow */}
      {size === 'hero' && (
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl pointer-events-none transform scale-110" />
      )}

      {/* Rotating outer ring */}
      <img
        src={ringSrc}
        onError={() => setRingSrc(ringFallback)}
        alt=""
        style={{
          animation: `spin-slow ${durationSec}s linear infinite`,
        }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* Static center logo mark */}
      <img
        src={staticSrc}
        onError={() => setStaticSrc(staticFallback)}
        alt="Cadence-X logo"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
};
