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
    <div className={cn(classNames, 'max-w-6xl mx-auto px-3')}>{children}</div>
  );
}
