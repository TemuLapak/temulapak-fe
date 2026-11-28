interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 38, className = '' }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 576 576"
      aria-hidden="true"
      className={className}
    >
      <rect x="27" y="190" width="524" height="348" rx="40" fill="#F97316" />
      <rect x="80" y="240" width="418" height="150" rx="40" fill="#FFFFFF" />
      <path
        d="M10 130C10 80 50 40 100 40H490C540 40 566 90 566 130V220C566 240 548 250 540 244C510 290 470 300 440 280C410 260 390 240 370 244C345 270 320 292 288 292C256 292 231 270 206 244C186 240 166 260 136 280C106 300 66 290 36 244C28 250 10 240 10 220Z"
        fill="#0F766E"
      />
      <circle cx="206" cy="355" r="83" fill="#1F2937" />
      <circle cx="372" cy="355" r="83" fill="#1F2937" />
      <circle cx="237" cy="364" r="41" fill="#FFFFFF" />
      <circle cx="341" cy="364" r="41" fill="#FFFFFF" />
    </svg>
  );
}