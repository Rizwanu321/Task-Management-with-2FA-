import React from "react";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm",
  outline:
    "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30",
  danger: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm",
  success:
    "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-sm",
  secondary:
    "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white shadow-sm",
};

const sizes = {
  xs: "py-1 px-2 text-xs rounded",
  sm: "py-1.5 px-3 text-sm rounded",
  md: "py-2 px-4 rounded-md",
  lg: "py-2.5 px-5 text-lg rounded-md",
  xl: "py-3 px-6 text-xl rounded-lg",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
        flex justify-center items-center gap-2
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
