import { cn } from '@/utils/classname';
import { ReactNode } from 'react';

export default function ContainerClient({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: string;
}) {
  return (
    <div className={cn(classNames, 'max-w-screen-xl mx-auto px-3')}>
      {children}
    </div>
  );
}
