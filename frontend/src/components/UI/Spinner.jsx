import React from "react";

const sizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const colors = {
  primary: "border-blue-600",
  secondary: "border-gray-600",
  white: "border-white",
};

const Spinner = ({ size = "md", className = "", color = "primary" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`
          animate-spin rounded-full
          border-2 border-t-transparent
          ${colors[color] || colors.primary}
          ${sizes[size] || sizes.md}
          ${className}
        `}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Spinner;
