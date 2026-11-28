'use client';

interface GoogleAuthButtonProps {
  label: string;
  loadingLabel: string;
  dividerLabel: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function GoogleAuthButton({
  label,
  loadingLabel,
  dividerLabel,
  isLoading = false,
  disabled = false,
  onClick,
}: GoogleAuthButtonProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center my-1">
        <span className="h-[1.5px] w-full bg-[#E5E7EB]" />
        <span className="px-3 bg-white text-[12px] font-bold text-[#6B7280] whitespace-nowrap">
          {dividerLabel}
        </span>
        <span className="h-[1.5px] w-full bg-[#E5E7EB]" />
      </div>

      <button
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        className="w-full min-h-[48px] px-6 rounded-full font-extrabold text-[15px] bg-white text-[#1F2937] border-2 border-[#1F2937] hover:bg-[#FFF7ED] active:translate-y-[1px] transition-all inline-flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.22 1.18-3.24 0-5.99-2.19-6.97-5.13H1.02v3.14C3.05 21.2 7.24 24 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.03 14.04c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.18H1.02C.37 7.47 0 8.91 0 10.44s.37 2.97 1.02 4.26l4.01-3.14Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.8 0 3.41.62 4.68 1.82l3.51-3.51C18.07 1.19 15.3 0 12 0 7.24 0 3.05 2.8 1.02 6.82l4.01 3.14c.98-2.94 3.73-5.21 6.97-5.21Z"
          />
        </svg>
        <span>{isLoading ? loadingLabel : label}</span>
      </button>
    </div>
  );
}