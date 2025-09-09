import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap";

  const variantStyles = {
    primary: "bg-ecoware-primary text-ecoware-primary",
    secondary: "bg-ecoware-secondary text-white",
    outline: "border border-ecoware-primary bg-zinc-100 text-ecoware-primary",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs font-medium tracking-wide",
    md: "px-3 py-1.5 text-sm font-medium tracking-wide",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return <span className={combinedClassName}>{children}</span>;
};

export default Badge;
