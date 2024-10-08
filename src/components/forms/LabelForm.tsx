import { ReactNode } from 'react';

export default function LabelForm({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label htmlFor={label}>
      <span className="font-semibold block mb-1">{label}</span>
      {children}
    </label>
  );
}
