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
    <div className={cn(classNames, 'max-w-screen-lg mx-auto md:px-3 px-8')}>
      {children}
    </div>
  );
}
