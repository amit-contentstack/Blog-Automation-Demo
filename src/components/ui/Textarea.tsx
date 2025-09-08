import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  id,
  rows = 4,
  ...props 
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'w-full bg-ecoware-gray-light border border-ecoware-gray-medium rounded-lg px-4 py-3 text-base transition-colors duration-200 ease-in-out focus:outline-none focus:border-ecoware-primary focus:ring-2 focus:ring-ecoware-primary/20 resize-vertical min-h-[100px]';
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '';
  
  const combinedClassName = `${baseStyles} ${errorStyles} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-ecoware-text-dark mb-2">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={combinedClassName}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-ecoware-gray-dark">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;
