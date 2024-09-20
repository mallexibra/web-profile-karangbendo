import { forwardRef } from 'react';

interface DataOption {
  label: string;
  value: string;
}

interface InputFormProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  data: DataOption[];
}

export const SelectForm = forwardRef<HTMLSelectElement, InputFormProps>(
  (
    {
      label,
      name,
      data,
      ...props
    }: {
      label: string;
      name: string;
      data: DataOption[];
    },
    ref,
  ) => {
    return (
      <select
        className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
        name={name}
        id={label}
        {...props}
        ref={ref}
      >
        <option value="" selected disabled>{`Pilih ${label}`}</option>
        {data.map((opt: DataOption, i: number) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  },
);

SelectForm.displayName = "SelectForm";
