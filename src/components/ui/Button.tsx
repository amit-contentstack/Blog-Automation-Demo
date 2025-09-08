"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "underline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-ecoware-primary text-ecoware-text-light hover:bg-ecoware-primary-hover hover:scale-105 focus:ring-ecoware-primary",
    outline:
      "border-2 border-ecoware-primary bg-transparent text-ecoware-primary hover:bg-ecoware-primary hover:text-white focus:ring-ecoware-primary",
    underline:
      "underline text-ecoware-primary hover:text-ecoware-primary-accent pb-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent",
  };

  const sizeStyles = {
    sm: "h-8 text-sm px-3",
    md: "h-11 text-base px-6",
    lg: "h-13 text-lg px-8",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
