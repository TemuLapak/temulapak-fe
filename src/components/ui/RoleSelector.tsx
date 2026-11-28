'use client';

import { RoleOptionItem, SelectableRegisterRole } from '@/types/auth';

interface RoleSelectorProps {
  label: string;
  options: readonly RoleOptionItem[];
  value: SelectableRegisterRole;
  onChange: (nextRole: SelectableRegisterRole) => void;
  disabled?: boolean;
}

export function RoleSelector({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: RoleSelectorProps) {
  return (
    <fieldset disabled={disabled} className="border-0 p-0 m-0">
      <legend className="text-[14px] font-bold text-[#1F2937] mb-2">
        {label}
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
              className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#0F766E] bg-[#CCFBF1]/45 shadow-[0_4px_0_#0F766E]'
                  : 'border-[#1F2937] bg-white hover:bg-[#FFF7ED]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-[#FFEDD5] text-[#C2410C]'
                  }`}
                >
                  {option.badge}
                </span>

                <span
                  aria-hidden="true"
                  className={`w-4 h-4 rounded-full border-2 grid place-items-center ${
                    isSelected ? 'border-[#0F766E]' : 'border-[#9CA3AF]'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                  )}
                </span>
              </div>

              <strong className="block text-[15px] font-extrabold text-[#1F2937]">
                {option.title}
              </strong>
              <p className="text-[12px] leading-snug text-[#4B5563] mt-0.5 mb-0">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}