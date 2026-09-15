import React from 'react';
import Icon, { IconName } from './Icon';

export type ButtonType = 'Primary' | 'Sub' | 'Orange' | 'Danger' | 'Ghost' | 'File';
export type ButtonSize = 'Small' | 'Medium' | '36' | 'Large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 디자인 스타일 타입 */
  type?: ButtonType;
  /** HTML button type ('button' | 'submit' | 'reset') */
  htmlType?: 'button' | 'submit' | 'reset';
  /** 버튼 크기 규격 */
  size?: ButtonSize;
  /** 좌측 아이콘 (Icon 컴포넌트의 IconName 문자열 또는 ReactNode) */
  icon?: IconName | React.ReactNode;
  /** 우측 아이콘 (Icon 컴포넌트의 IconName 문자열 또는 ReactNode) */
  rightIcon?: IconName | React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 추가 클래스 */
  className?: string;
  /** 툴팁 텍스트 */
  title?: string;
}

/** 컴포넌트 내부 자체 완결형 크기별 스타일 정의 */
const sizeStyles: Record<ButtonSize, string> = {
  Small: 'h-[24px] text-[12px] px-[8px] py-[3px] rounded-[6px] gap-[4px]',
  Medium: 'h-[32px] text-[13px] px-[12px] py-[6px] rounded-[8px] gap-[6px]',
  '36': 'h-[36px] text-[13.5px] px-[12px] py-[7px] rounded-[8px] gap-[6px]',
  Large: 'h-[40px] text-[14.5px] px-[16px] py-[10px] rounded-[8px] gap-[8px]',
};

/** 버튼 크기에 대응하는 기본 아이콘 크기(px) */
const iconSizes: Record<ButtonSize, number> = {
  Small: 13,
  Medium: 15,
  '36': 16,
  Large: 17,
};

/** 컴포넌트 내부 자체 완결형 타입(Variant)별 스타일 정의 (Nexgen 디자인 시스템 토큰 완벽 일치) */
const typeStyles: Record<ButtonType, string> = {
  Primary:
    'bg-[#2a3461] text-[#ffffff] hover:bg-[#364275] active:bg-[#1b2343] border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.08)] font-semibold',
  Sub:
    'bg-[#ffffff] text-[#2a3461] border border-[#c2cfdf] hover:border-[#2a3461] hover:bg-[#edf0f7] hover:text-[#2a3461] active:bg-[#dde3f1] active:border-[#1b2343] shadow-[0_1px_2px_rgba(0,0,0,0.04)] font-semibold',
  Orange:
    'bg-[#ef5a27] text-[#ffffff] hover:bg-[#f77038] active:bg-[#d84a1c] border border-transparent shadow-[0_1px_2px_rgba(239,90,39,0.25)] font-semibold',
  Danger:
    'bg-[#fff5f5] text-[#ef4444] border border-[#ffadad] hover:bg-[#fae0e0] hover:border-[#ef4444] active:bg-[#ffd6d6] font-semibold',
  Ghost:
    'bg-transparent text-[#556780] hover:bg-[#edf0f7] hover:text-[#2a3461] active:bg-[#dde3f1] border border-transparent font-medium',
  File:
    'bg-[#fff4db] text-[#ef5a27] hover:bg-[#fff0d1] active:bg-[#ffe8a0] border border-transparent font-bold',
};

export const Button: React.FC<ButtonProps> = ({
  type = 'Primary',
  htmlType = 'button',
  size = 'Medium',
  icon,
  rightIcon,
  disabled = false,
  onClick,
  children,
  className = '',
  title,
  ...restProps
}) => {
  const baseClasses =
    'inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 leading-none select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#2a3461]/40 active:scale-[0.98] cursor-pointer';
  const disabledClasses =
    disabled ? 'opacity-45 pointer-events-none cursor-not-allowed shadow-none active:scale-100' : '';

  const currentSizeClass = sizeStyles[size] || sizeStyles.Medium;
  const currentTypeClass = typeStyles[type] || typeStyles.Primary;
  const currentIconSize = iconSizes[size] || iconSizes.Medium;

  const combinedClasses = [
    baseClasses,
    currentSizeClass,
    currentTypeClass,
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderIcon = (iconTarget?: IconName | React.ReactNode) => {
    if (!iconTarget) return null;
    if (typeof iconTarget === 'string') {
      return (
        <span className="flex items-center justify-center shrink-0">
          <Icon name={iconTarget as IconName} size={currentIconSize} />
        </span>
      );
    }
    return (
      <span className="flex items-center justify-center shrink-0">
        {iconTarget}
      </span>
    );
  };

  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={combinedClasses}
      title={title}
      {...restProps}
    >
      {renderIcon(icon)}
      <span>{children}</span>
      {renderIcon(rightIcon)}
    </button>
  );
};

export default Button;
export type { IconName };
