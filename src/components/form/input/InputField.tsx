import React, { FC } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string; // Optional hint text
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  defaultValue,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
}) => {
  // Determine input styles based on state (disabled, success, error)
  let inputClasses = `h-11 w-full rounded-xl border appearance-none px-4 py-2.5 text-sm font-medium transition-all duration-200 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  // Add styles for the different states
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-200 cursor-not-allowed bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` text-error-800 border-error-500 focus:border-error-600 focus:ring-2 focus:ring-error-500/20 shadow-theme-xs dark:text-error-400 dark:border-error-500 dark:focus:ring-error-500/30`;
  } else if (success) {
    inputClasses += ` text-success-700 border-success-400 focus:border-success-500 focus:ring-2 focus:ring-success-500/20 shadow-theme-xs dark:text-success-400 dark:border-success-500 dark:focus:ring-success-500/30`;
  } else {
    inputClasses += ` bg-white text-gray-800 border-gray-300 focus:border-blue-light-500 focus:ring-2 focus:ring-blue-light-500/20 shadow-theme-xs hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-blue-light-400 dark:hover:border-gray-600`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {/* Optional Hint Text */}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
