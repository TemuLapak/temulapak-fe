'use client';

import { InputHTMLAttributes, ReactNode, useState } from 'react';

interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string;
  label: string;
  optionalTag?: string;
  helperText?: string;
  error?: string;
  rightLabelSlot?: ReactNode;
  showPasswordToggle?: boolean;
  showPasswordAriaLabel?: string;
  hidePasswordAriaLabel?: string;
}

export function FormField({
  id,
  label,
  optionalTag,
  helperText,
  error,
  rightLabelSlot,
  type = 'text',
  showPasswordToggle = false,
  showPasswordAriaLabel = 'Show password',
  hidePasswordAriaLabel = 'Hide password',
  ...inputProps
}: FormFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const resolvedType =
    showPasswordToggle && type === 'password'
      ? isPasswordVisible
        ? 'text'
        : 'password'
      : type;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-[14px] font-bold text-[#1F2937] flex items-center gap-2"
        >
          <span>{label}</span>
          {optionalTag && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C]">
              {optionalTag}
            </span>
          )}
        </label>
        {rightLabelSlot}
      </div>

      <div className="relative">
        <input
          id={id}
          type={resolvedType}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={`w-full min-h-[48px] px-4 rounded-2xl bg-[#FFF7ED]/60 border-2 text-[15px] font-medium text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-colors ${
            showPasswordToggle ? 'pr-12' : ''
          } ${
            error
              ? 'border-[#DC2626] bg-[#FEF2F2]'
              : 'border-[#1F2937] focus:border-[#0F766E] focus:bg-white'
          }`}
          {...inputProps}
        />

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={
              isPasswordVisible
                ? hidePasswordAriaLabel
                : showPasswordAriaLabel
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full grid place-items-center text-[#4B5563] hover:text-[#0F766E] hover:bg-[#CCFBF1]/50 transition-colors cursor-pointer"
          >
            {isPasswordVisible ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error ? (
        <p
          id={`${id}-error`}
          className="text-[13px] font-semibold text-[#DC2626] m-0"
        >
          {error}
        </p>
      ) : (
        helperText && (
          <p id={`${id}-helper`} className="text-[12px] text-[#6B7280] m-0">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}