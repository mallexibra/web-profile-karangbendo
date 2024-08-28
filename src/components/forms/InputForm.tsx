'use client';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { forwardRef, useState } from 'react';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: 'text' | 'password' | 'file' | 'number' | 'date';
  placeholder?: string;
}

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, name, type, placeholder, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    if (type === 'text' || type === "number" || type === "date") {
      return (
        <input
          type={type}
          className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
          placeholder={placeholder}
          name={name}
          id={label}
          {...props}
          ref={ref}
        />
      );
    }

    if (type === 'password') {
      return (
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
            placeholder={placeholder}
            name={name}
            id={label}
            {...props}
            ref={ref}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full px-2 py-5 border-custom border text-xs font-semibold space-y-2 text-center bg-second rounded-md outline-none">
        <input
          type="file"
          {...props}
          className="hidden"
          name={name}
          id={label}
          ref={ref}
        />
        <p>
          <span className="text-primary">Click to upload</span> or drag and drop
          image
        </p>
        <p className="text-black/25">Any file up to 10MB</p>
      </div>
    );
  },
);
