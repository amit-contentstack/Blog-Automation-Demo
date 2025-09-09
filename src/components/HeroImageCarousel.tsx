"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
}

/**
 * A reusable image carousel component with infinite looping and autoplay.
 * @param {object} props - The component props.
 * @param {string[]} props.images - An array of image URLs to display.
 * @param {boolean} [props.autoplay=true] - Whether the carousel should automatically play.
 * @param {number} [props.interval=3000] - The interval for autoplay in milliseconds.
 * @returns {JSX.Element} The image carousel component.
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplay = true,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  // Define animation variants for entering, centered, and exiting images
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      const autoPlayInterval = setInterval(handleNext, interval);
      return () => clearInterval(autoPlayInterval);
    }
  }, [autoplay, interval, currentIndex]);

  return (
    <div className="relative w-full max-w-2xl h-96 mx-auto overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageCarousel;
