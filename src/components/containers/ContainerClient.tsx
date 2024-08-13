import { ReactNode } from 'react';

export default function ContainerClient({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
