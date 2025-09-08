import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = true 
}) => {
  const baseStyles = 'bg-ecoware-gray-light rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]';
  const hoverStyles = hover ? 'hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-in-out' : '';
  const paddingStyles = padding ? 'p-5' : '';
  
  const combinedClassName = `${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`;
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Card;
