import React, { ChangeEvent, FC } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password" | "file";
  label?: string;
  name?: string;
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
  value?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  type,
  label,
  name,
  placeholder,
  error,
  disabled,
  value,
  className,
  onChange,
}) => {
  return (
    <div className="mt-6 flex flex-col">
      <label className="text-md font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        className={`text-base border rounded-lg px-4 py-2 transition duration-200 ease-in-out 
                    ${
                      error
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : "border-gray-300 bg-gray-100 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 
                    ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"}`}
      />
      {error && (
        <p className="text-red-500 text-sm font-medium mt-1">This field can't be empty</p>
      )}
    </div>
  );
};

export default Input;