import React from "react";
import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "dark" | "primary";
  padding?: "sm" | "md" | "lg" | "xl";
  container?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  background = "gray",
  padding = "lg",
  container = true,
}) => {
  const backgroundStyles = {
    white: "bg-white text-ecoware-text-dark",
    gray: "bg-ecoware-gray-light text-ecoware-text-dark",
    dark: "bg-ecoware-primary text-white",
    primary: "bg-ecoware-primary text-ecoware-text-light",
  };

  const paddingStyles = {
    sm: "py-12",
    md: "py-16",
    lg: "py-20", // Default 80px as per design system
    xl: "py-24",
  };

  const combinedClassName = `${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`;

  if (container) {
    return (
      <section className={combinedClassName}>
        <Container>{children}</Container>
      </section>
    );
  }

  return <section className={combinedClassName}>{children}</section>;
};

export default Section;
