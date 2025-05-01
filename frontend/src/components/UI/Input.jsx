import React from "react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2.5 border rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-400 
          transition-colors duration-200
          ${
            error
              ? "border-red-500 bg-red-50 dark:bg-red-900/10"
              : "border-gray-300 dark:border-gray-600"
          }
          ${
            error
              ? "text-red-900 dark:text-red-200"
              : "text-gray-800 dark:text-gray-200"
          }
          bg-white dark:bg-gray-700 
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
