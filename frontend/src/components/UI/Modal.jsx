import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={`
          ${sizeClasses[size]} w-full bg-white dark:bg-gray-800
          rounded-xl shadow-xl z-10 overflow-hidden
          transition-all duration-300 transform
          animate-modal-in
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
            id="modal-title"
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                      focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1
                      transition-colors duration-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-5 overflow-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
