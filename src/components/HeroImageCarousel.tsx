"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseAsset } from "@contentstack/delivery-sdk";

interface HeroImageCarouselProps {
  images: BaseAsset[];
  autoSlideInterval?: number;
}

const HeroImageCarousel: React.FC<HeroImageCarouselProps> = ({
  images,
  autoSlideInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  // Get the images for current view (left, center, right)
  const getVisibleImages = () => {
    if (images.length === 0) return { left: null, center: null, right: null };
    if (images.length === 1)
      return { left: null, center: images[0], right: null };
    if (images.length === 2) {
      return {
        left: images[(currentIndex - 1 + images.length) % images.length],
        center: images[currentIndex],
        right: null,
      };
    }

    return {
      left: images[(currentIndex - 1 + images.length) % images.length],
      center: images[currentIndex],
      right: images[(currentIndex + 1) % images.length],
    };
  };

  const { left, center, right } = getVisibleImages();

  // Animation variants for different positions - only width changes
  const centerVariants = {
    initial: { width: 80, opacity: 0.7 },
    animate: { width: 400, opacity: 1 },
    exit: { width: 80, opacity: 0.7 },
  };

  const leftVariants = {
    initial: { width: 80, opacity: 0.7 },
    animate: { width: 80, opacity: 0.8 },
    exit: { width: 80, opacity: 0.7 },
  };

  const rightVariants = {
    initial: { width: 80, opacity: 0.7 },
    animate: { width: 80, opacity: 0.8 },
    exit: { width: 80, opacity: 0.7 },
  };

  const transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    duration: 0.8,
  };

  return (
    <div className="relative">
      {/* Main carousel container - Hero size */}
      <div className="relative w-full max-w-2xl ml-auto overflow-hidden">
        <div className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-ecoware-primary/10 to-ecoware-primary/5">
          {/* Strip-like carousel layout */}
          <div className="flex items-center justify-center w-full h-full gap-2 px-4">
            {/* Left Image */}
            {left && (
              <motion.div
                key={`left-${currentIndex}`}
                className="overflow-hidden rounded-2xl shadow-lg"
                variants={leftVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                style={{ height: "320px" }}
              >
                <img
                  src={left.url}
                  alt="Hero image left"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {/* Center Image (Main) */}
            {center && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`center-${currentIndex}`}
                  className="overflow-hidden rounded-3xl shadow-2xl"
                  variants={centerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  style={{ height: "320px" }}
                >
                  <img
                    src={center.url}
                    alt="Hero image center"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Right Image */}
            {right && (
              <motion.div
                key={`right-${currentIndex}`}
                className="overflow-hidden rounded-2xl shadow-lg"
                variants={rightVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                style={{ height: "320px" }}
              >
                <img
                  src={right.url}
                  alt="Hero image right"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImageCarousel;
