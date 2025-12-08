import React, { ReactNode } from "react";

interface SelectProps {
  children: ReactNode;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  children,
  value,
  onChange,
  className = "",
  disabled = false,
  error = false,
  success = false,
  placeholder,
}) => {
  // Base styles
  let selectClasses = `h-11 w-full rounded-xl border appearance-none px-4 py-2.5 text-sm font-medium transition-all duration-200 bg-white dark:bg-gray-900 dark:text-white/90 cursor-pointer ${className}`;

  // Add styles for the different states
  if (disabled) {
    selectClasses += ` text-gray-500 border-gray-200 cursor-not-allowed bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    selectClasses += ` text-error-800 border-error-500 focus:border-error-600 focus:ring-2 focus:ring-error-500/20 shadow-theme-xs dark:text-error-400 dark:border-error-500 dark:focus:ring-error-500/30`;
  } else if (success) {
    selectClasses += ` text-success-700 border-success-400 focus:border-success-500 focus:ring-2 focus:ring-success-500/20 shadow-theme-xs dark:text-success-400 dark:border-success-500 dark:focus:ring-success-500/30`;
  } else {
    selectClasses += ` text-gray-800 border-gray-300 focus:border-blue-light-500 focus:ring-2 focus:ring-blue-light-500/20 shadow-theme-xs hover:border-gray-400 dark:border-gray-700 dark:focus:border-blue-light-400 dark:hover:border-gray-600`;
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClasses}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {/* Custom arrow icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="h-5 w-5 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;

