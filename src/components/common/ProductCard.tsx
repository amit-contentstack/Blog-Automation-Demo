'use client';

import React from 'react';
import Image from 'next/image';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  sustainability?: {
    recycled?: number;
    biodegradable?: boolean;
    carbonNeutral?: boolean;
  };
  specifications?: {
    material: string;
    dimensions?: string;
    weight?: string;
  };
  pricing?: {
    price?: string;
    unit?: string;
    minOrder?: number;
  };
  onLearnMore?: (id: string) => void;
  onGetQuote?: (id: string) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  image,
  category,
  sustainability,
  specifications,
  pricing,
  onLearnMore,
  onGetQuote,
  className = ''
}) => {
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore(id);
    } else {
      // Default behavior - navigate to product detail
      window.location.href = `/products/${id}`;
    }
  };

  const handleGetQuote = () => {
    if (onGetQuote) {
      onGetQuote(id);
    } else {
      // Default behavior - navigate to contact with product pre-selected
      window.location.href = `/contact?product=${id}`;
    }
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      {/* Product Image */}
      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105 grayscale hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm">
            {category}
          </Badge>
        </div>

        {/* Sustainability Badges */}
        {sustainability && (
          <div className="absolute top-3 right-3 space-y-1">
            {sustainability.biodegradable && (
              <Badge variant="secondary" size="sm" className="block">
                🌱 Biodegradable
              </Badge>
            )}
            {sustainability.carbonNeutral && (
              <Badge variant="secondary" size="sm" className="block">
                🌍 Carbon Neutral
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-ecoware-text-dark mb-2">
          {name}
        </h3>

        <p className="text-ecoware-gray-dark text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Sustainability Score */}
        {sustainability?.recycled && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-ecoware-gray-dark">Recycled Content</span>
              <span className="text-sm font-semibold text-ecoware-primary">{sustainability.recycled}%</span>
            </div>
            <div className="w-full bg-ecoware-gray-medium rounded-full h-2">
              <div 
                className="bg-ecoware-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${sustainability.recycled}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Specifications */}
        {specifications && (
          <div className="mb-4 space-y-1">
            <div className="text-xs text-ecoware-gray-dark">
              <span className="font-medium">Material:</span> {specifications.material}
            </div>
            {specifications.dimensions && (
              <div className="text-xs text-ecoware-gray-dark">
                <span className="font-medium">Dimensions:</span> {specifications.dimensions}
              </div>
            )}
            {specifications.weight && (
              <div className="text-xs text-ecoware-gray-dark">
                <span className="font-medium">Weight:</span> {specifications.weight}
              </div>
            )}
          </div>
        )}

        {/* Pricing */}
        {pricing && (
          <div className="mb-4">
            {pricing.price && (
              <div className="text-lg font-bold text-ecoware-text-dark">
                {pricing.price}
                {pricing.unit && <span className="text-sm font-normal text-ecoware-gray-dark">/{pricing.unit}</span>}
              </div>
            )}
            {pricing.minOrder && (
              <div className="text-xs text-ecoware-gray-dark">
                Min. order: {pricing.minOrder} units
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLearnMore}
            className="flex-1"
          >
            Learn More
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleGetQuote}
            className="flex-1"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
