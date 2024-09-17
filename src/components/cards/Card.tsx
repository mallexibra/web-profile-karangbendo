import { cn } from '@/utils/classname';
import { ReactNode } from 'react';

export default function Card({ children, classNames }: { children: ReactNode, classNames?: string }) {
  return (
    <div className={cn(classNames, "bg-white border-custom border-2 p-5 rounded-lg")}>
      {children}
    </div>
  );
}
