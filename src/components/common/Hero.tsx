'use client';

import React from 'react';
import Button from '../ui/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  overlay?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  overlay = false,
  textAlign = 'center',
  className = ''
}) => {
  const textAlignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  const handleCtaClick = (cta: typeof primaryCta) => {
    if (cta?.onClick) {
      cta.onClick();
    } else if (cta?.href) {
      window.location.href = cta.href;
    }
  };

  return (
    <section 
      className={`relative py-20 md:py-32 bg-cover bg-center bg-no-repeat ${className}`}
      style={backgroundStyle}
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/50"></div>
      )}
      
      <div className="relative max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl ${textAlign === 'center' ? 'mx-auto' : ''}`}>
          {/* Subtitle */}
          {subtitle && (
            <div className={`mb-6 ${textAlignStyles[textAlign]}`}>
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-ecoware-primary text-ecoware-text-light rounded-full">
                {subtitle}
              </span>
            </div>
          )}

          {/* Main Title */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${textAlignStyles[textAlign]} ${backgroundImage && overlay ? 'text-white' : 'text-ecoware-text-dark'}`}>
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className={`text-lg md:text-xl leading-relaxed mb-8 max-w-3xl ${textAlign === 'center' ? 'mx-auto' : ''} ${textAlignStyles[textAlign]} ${backgroundImage && overlay ? 'text-gray-200' : 'text-ecoware-gray-dark'}`}>
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className={`flex flex-col sm:flex-row gap-4 ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
              {primaryCta && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleCtaClick(primaryCta)}
                  className="min-w-[200px]"
                >
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleCtaClick(secondaryCta)}
                  className="min-w-[200px]"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
