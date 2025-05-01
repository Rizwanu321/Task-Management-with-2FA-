import React from "react";

const Card = ({
  children,
  className = "",
  elevation = "md",
  hoverEffect = false,
  onClick = null,
}) => {
  const elevationClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg ${elevationClasses[elevation]} 
        overflow-hidden transition-all duration-300
        ${hoverEffect ? "hover:shadow-lg transform hover:-translate-y-1" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
