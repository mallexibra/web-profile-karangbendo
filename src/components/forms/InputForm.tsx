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
        const [isDragging, setIsDragging] = useState(false);

        const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = () => {
            setIsDragging(false);
        };

        const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);
            const fileInput = ref as React.RefObject<HTMLInputElement>;
            const files = event.dataTransfer.files;
            console.log(fileInput, files)
            if (fileInput.current && files.length > 0) {
                fileInput.current.files = files;
            }
        };

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
            <div className={`w-full px-2 py-5 border-custom border text-xs font-semibold text-center rounded-md outline-none transition-colors duration-300 ${isDragging ? 'bg-blue-100 border-dashed border-primary text-primary' : 'bg-second'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <input
                    type="file"
                    {...props}
                    className="hidden"
                    name={name}
                    id={label}
                    ref={ref}
                />
                <p className='text-primary'>Click to upload</p>
                <p className="text-black/25">Any file up to 2MB</p>
            </div>
        );
    },
);

InputForm.displayName = 'InputForm';
