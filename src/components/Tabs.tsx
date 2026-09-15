import React from 'react';

export interface TabsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
  type?: 'No Background' | 'Background';
}

export const Tabs = <T extends string>({ 
  options, 
  value, 
  onChange, 
  fullWidth = false,
  type = 'No Background'
}: TabsProps<T>) => {
  const isBg = type === 'Background';

  return (
    <div className={`relative w-full ${isBg ? 'flex overflow-x-auto hide-scrollbar border border-[var(--color-bluegrey-200)] bg-[var(--color-navy-25)]' : ''}`}>
      {!isBg && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-bluegrey-200)] z-0" />}
      <div className={`flex ${fullWidth ? 'w-full' : ''} ${isBg ? '' : 'overflow-x-auto hide-scrollbar relative z-10'}`}>
        {options.map((option, index) => {
          const isActive = option === value;
          const isLast = index === options.length - 1;
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`
                relative flex items-center justify-center h-[38px] px-[14px] text-[14px] font-medium transition-colors whitespace-nowrap
                ${fullWidth ? 'flex-1' : ''}
                ${isBg 
                  ? `${index > 0 ? 'border-l border-l-[var(--color-bluegrey-200)]' : ''} ${isLast && !fullWidth ? 'border-r border-r-[var(--color-bluegrey-200)]' : ''} ` + (isActive 
                      ? 'bg-[var(--color-gray-0)] text-[var(--color-orange-500)] z-10' 
                      : 'bg-transparent text-[var(--color-bluegrey-500)] hover:text-[var(--color-orange-500)] z-0')
                  : (isActive 
                      ? 'text-[var(--color-navy-500)] border-b-2 border-[var(--color-navy-500)]' 
                      : 'text-[var(--color-bluegrey-500)] border-b-2 border-transparent hover:text-[var(--color-navy-500)] hover:bg-[var(--color-navy-50)]')
                }
              `}
            >
              {option}
              {isBg && isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-orange-500)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
