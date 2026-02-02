'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GuestPhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    // Los Cabos
    '/pueblo-bonito-sunset-beach-golf-and-spa-resort-hero.webp',
    '/pueblobonito-sunsetbeach-golf-6556d4b6dcc8e.jpg',
    '/pb-montecristoestates-gallery-04-60df3d4ee6fd0.jpg',
    // Mazatlán
    '/pueblobonito-mazatlan-gallery-img-01-6542c2cc87066.jpg',
    '/pb-mazatlan-gallery-03-60cce90164f93.jpg',
    '/pb-mazatlan-hero-mobile-01-65b16cd64394f.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`Resort ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
