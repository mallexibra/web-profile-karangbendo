import { ReactNode } from 'react';
import SidebarAdmin from '../sidebar/SidebarAdmin';
import { cn } from '@/utils/classname';
import HeaderAdmin from '../headers/HeaderAdmin';

export default function ContainerAdmin({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-start">
      <SidebarAdmin />
      <section className="w-full bg-gray">
        <HeaderAdmin />
        <div className="p-6 space-y-3">{children}</div>
      </section>
    </main>
  );
}
