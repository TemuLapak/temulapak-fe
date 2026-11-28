interface SparkleStarProps {
  size: number;
  fill: string;
  className?: string;
}

export function SparkleStar({ size, fill, className = '' }: SparkleStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none ${className}`.trim()}
    >
      <path
        d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z"
        fill={fill}
        stroke="#1F2937"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}