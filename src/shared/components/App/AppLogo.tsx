import React from 'react';

export interface AppLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  spin?: boolean;
}

// Framing/Construction-themed logo: house outline with wall studs
const AppLogo: React.FC<AppLogoProps> = ({ size = 40, spin = false, style, ...props }) => {
  const center = 32;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...props}
    >
      <g>
        {spin && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${center} ${center}`}
            to={`360 ${center} ${center}`}
            dur="18s"
            repeatCount="indefinite"
          />
        )}
        {/* Roof */}
        <path d="M10 28 L32 10 L54 28" />
        {/* Walls */}
        <path d="M14 28 V54 H50 V28" />
        {/* Plates */}
        <line x1="16" y1="34" x2="48" y2="34" />
        <line x1="16" y1="50" x2="48" y2="50" />
        {/* Studs */}
        <line x1="20" y1="34" x2="20" y2="50" />
        <line x1="24" y1="34" x2="24" y2="50" />
        <line x1="28" y1="34" x2="28" y2="50" />
        <line x1="32" y1="34" x2="32" y2="50" />
        <line x1="36" y1="34" x2="36" y2="50" />
        <line x1="40" y1="34" x2="40" y2="50" />
        <line x1="44" y1="34" x2="44" y2="50" />
        {/* Ridge nail (accent dot) */}
        <circle cx="32" cy="8" r="1.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
};

export default AppLogo;
