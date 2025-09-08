import React from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const defaultSocialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com/company/ecoware-solutions', icon: 'linkedin' },
  { name: 'Facebook', url: 'https://facebook.com/ecowaresolutions', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/ecowaresolutions', icon: 'instagram' },
  { name: 'Twitter', url: 'https://twitter.com/ecowaresolutions', icon: 'twitter' }
];

const SocialLinks: React.FC<SocialLinksProps> = ({
  links = defaultSocialLinks,
  size = 'md',
  variant = 'default',
  className = '',
  orientation = 'horizontal'
}) => {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const variantStyles = {
    default: 'text-ecoware-gray-dark hover:text-ecoware-primary transition-colors duration-200',
    outlined: 'text-ecoware-gray-dark hover:text-ecoware-primary border border-ecoware-gray-medium hover:border-ecoware-primary rounded-full p-2 transition-all duration-200',
    filled: 'text-white bg-ecoware-gray-dark hover:bg-ecoware-primary hover:text-ecoware-text-light rounded-full p-2 transition-all duration-200'
  };

  const orientationStyles = orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col';
  const gapStyles = orientation === 'horizontal' ? 'space-x-4' : 'space-y-4';

  const renderIcon = (iconName: string) => {
    // Using simple placeholder divs for now - in a real app you'd use actual icon components
    const iconContent = {
      linkedin: (
        <svg className={sizeStyles[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      facebook: (
        <svg className={sizeStyles[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
        </svg>
      ),
      instagram: (
        <svg className={sizeStyles[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.01 6.71.048 2.739.26.26 2.739.048 6.71.01 7.929 0 8.396 0 12.017c0 3.624.01 4.09.048 5.311.26 3.971 2.739 6.45 6.71 6.662 1.218.037 1.687.048 5.311.048 3.624 0 4.09-.01 5.311-.048 3.971-.26 6.45-2.739 6.662-6.71.037-1.218.048-1.687.048-5.311 0-3.624-.01-4.09-.048-5.311C23.784 2.739 21.305.26 17.334.048 16.115.01 15.647 0 12.017 0zm0 2.16c3.563 0 3.985.01 5.39.048 1.3.06 2.007.26 2.48.433.624.246 1.068.54 1.537 1.01.47.47.764.913 1.01 1.537.174.473.372 1.18.433 2.48.037 1.404.048 1.826.048 5.39 0 3.563-.01 3.985-.048 5.39-.06 1.3-.26 2.007-.433 2.48-.246.624-.54 1.068-1.01 1.537-.47.47-.913.764-1.537 1.01-.473.174-1.18.372-2.48.433-1.404.037-1.826.048-5.39.048-3.563 0-3.985-.01-5.39-.048-1.3-.06-2.007-.26-2.48-.433-.624-.246-1.068-.54-1.537-1.01-.47-.47-.764-.913-1.01-1.537-.174-.473-.372-1.18-.433-2.48C2.17 16.002 2.16 15.58 2.16 12.017c0-3.563.01-3.985.048-5.39.06-1.3.26-2.007.433-2.48.246-.624.54-1.068 1.01-1.537.47-.47.913-.764 1.537-1.01.473-.174 1.18-.372 2.48-.433C8.032 2.17 8.454 2.16 12.017 2.16zm0 3.378a6.477 6.477 0 1 0 0 12.954 6.477 6.477 0 0 0 0-12.954zm0 10.694a4.217 4.217 0 1 1 0-8.434 4.217 4.217 0 0 1 0 8.434zm8.244-10.944a1.518 1.518 0 1 1-3.036 0 1.518 1.518 0 0 1 3.036 0z" clipRule="evenodd"/>
        </svg>
      ),
      twitter: (
        <svg className={sizeStyles[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
        </svg>
      )
    };

    return iconContent[iconName as keyof typeof iconContent] || (
      <div className={`${sizeStyles[size]} bg-current rounded`}></div>
    );
  };

  return (
    <div className={`${orientationStyles} ${gapStyles} ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center ${variantStyles[variant]}`}
          aria-label={`Follow us on ${link.name}`}
        >
          {renderIcon(link.icon)}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
