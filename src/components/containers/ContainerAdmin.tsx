import { ReactNode } from 'react';
import SidebarAdmin from '../sidebar/SidebarAdmin';
import HeaderAdmin from '../headers/HeaderAdmin';

export default function ContainerAdmin({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-start h-screen">
      <SidebarAdmin />
      <section className="w-full bg-gray flex flex-col">
        <HeaderAdmin />
        <div className="flex-grow px-6 pt-6 pb-10 space-y-3 min-h-0 overflow-y-auto">
          {children}
        </div>
      </section>
    </main>
  );
}
