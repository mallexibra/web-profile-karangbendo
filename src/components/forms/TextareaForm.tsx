export default function TextareaForm({
  children,
  label,
  placeholder,
}: {
  children?: string;
  label: string;
  placeholder: string;
}) {
  return (
    <textarea
      className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
      name={label}
      id={label}
      placeholder={placeholder}
      rows={5}
    >
      {children}
    </textarea>
  );
}
