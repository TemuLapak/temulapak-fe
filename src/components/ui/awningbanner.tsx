interface AwningBannerProps {
  flapCount?: number;
  size?: 'default' | 'sm' | 'cta';
  colorScheme?: 'teal' | 'orange';
}

export function AwningBanner({
  flapCount = 14,
  size = 'default',
  colorScheme = 'teal',
}: AwningBannerProps) {
  const railClass = size === 'sm' ? 'tl-rail tl-rail-sm' : 'tl-rail';
  const sizeClass =
    size === 'sm' ? 'tl-awning-sm' : size === 'cta' ? 'tl-awning-cta' : '';
  const colorClass = colorScheme === 'orange' ? 'tl-awning-orange' : '';

  return (
    <>
      <div className={railClass} aria-hidden="true" />
      <div
        className={`tl-awning ${sizeClass} ${colorClass}`.trim()}
        aria-hidden="true"
      >
        {Array.from({ length: flapCount }).map((_, idx) => (
          <i key={idx} className="tl-awning-flap" />
        ))}
      </div>
    </>
  );
}