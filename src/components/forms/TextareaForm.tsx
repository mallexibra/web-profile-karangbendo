export default function TextareaForm({
  children,
  label,
  placeholder,
  rows = 5,
  ...props
}: {
  children?: string;
  label: string;
  placeholder: string;
  rows?: number;
}) {
  return (
    <textarea
      {...props}
      className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
      id={label}
      placeholder={placeholder}
      rows={rows}
    />
  );
}
