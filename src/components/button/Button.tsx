import { cn } from '@/utils/classname';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'base' | 'lg';
  color?: 'primary' | 'warning' | 'danger';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disable?: boolean;
}

export default function Button({
  children,
  onClick,
  size = 'base',
  color = 'primary',
  type = 'button',
  className,
  disable = false
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    base: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const colorClasses = {
    primary: 'bg-primary text-white hover:bg-primary/80',
    warning: 'bg-warning text-white hover:bg-warning/80',
    danger: 'bg-danger text-white hover:bg-danger/80',
  };

  const disabledClasses = {
    primary: 'bg-primary/60 text-white cursor-not-allowed',
    warning: 'bg-warning/60 text-white cursor-not-allowed',
    danger: 'bg-danger/60 text-white cursor-not-allowed',
  };

  return (
    <button
      onClick={!disable ? onClick : undefined}
      type={type}
      className={cn(
        'font-medium rounded-md transition-colors',
        className,
        sizeClasses[size],
        disable ? disabledClasses[color] : colorClasses[color],
      )}
      disabled={disable}
    >
      {children}
    </button>
  );
}
