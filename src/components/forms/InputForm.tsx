export const InputForm = ({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}) => {
  if (type != 'file') {
    return (
      <input
        type="text"
        className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
        placeholder={placeholder}
        name={name}
        id={label}
      />
    );
  } else {
    return (
      <div className="w-full px-2 py-5 border-custom border text-xs font-semibold space-y-2 text-center bg-second rounded-md outline-none">
        <input type="file" className="hidden" name={name} id={label} />
        <p>
          <span className="text-primary">Click to upload</span> or drag and drop
          image
        </p>
        <p className="text-black/25">Any file up to 10MB</p>
      </div>
    );
  }
};
