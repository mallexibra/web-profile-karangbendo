import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white border-custom border-2 p-5 rounded-lg">
      {children}
    </div>
  );
}
