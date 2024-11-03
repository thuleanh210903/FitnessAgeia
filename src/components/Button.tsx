import React, { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Specify default types for button
  onClick?: () => void;
  isDisabled?: boolean;
  children?: ReactNode;
  href?: string;
  variant?: "secondary" | "primary" | "link"; // Use variant for styling
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  isDisabled = false,
  variant = "primary",
  children,
  href,
  onClick,
  className = "",
  type = "button",
}) => {
  const baseStyles = "px-4 py-2 rounded font-bold focus:outline-none"; // Common styles for all buttons

  const variantStyles =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : variant === "secondary"
      ? "bg-gray-500 text-white hover:bg-gray-600"
      : "text-blue-500 hover:underline"; // For "link" variant

  if (variant === "link" && href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles} ${className} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={(e) => isDisabled && e.preventDefault()} // Prevent click if disabled
        aria-disabled={isDisabled} // Accessibility
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined} // Prevent onClick if disabled
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles} ${className} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
