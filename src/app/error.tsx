'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="tl-wrap py-24 text-center">
      <div className="tl-card-shadow border-2 border-[#1F2937] p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-extrabold mb-2">Terjadi Gangguan</h2>
        <p className="text-[#4B5563] mb-6">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="min-h-[48px] px-7 rounded-full font-bold bg-[#F97316] text-[#1F2937] cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}