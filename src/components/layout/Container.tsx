import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  maxWidth = 'xl', 
  padding = true 
}) => {
  const baseStyles = 'mx-auto';
  
  const maxWidthStyles = {
    sm: 'max-w-screen-sm',      // 640px
    md: 'max-w-screen-md',      // 768px  
    lg: 'max-w-screen-lg',      // 1024px
    xl: 'max-w-[1280px]',       // Design system container-max-width
    full: 'max-w-full'
  };
  
  const paddingStyles = padding ? 'px-4 sm:px-6 lg:px-8' : '';
  
  const combinedClassName = `${baseStyles} ${maxWidthStyles[maxWidth]} ${paddingStyles} ${className}`;
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Container;
