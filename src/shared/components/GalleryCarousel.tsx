'use client';

import { useState, useEffect } from 'react';

const galleryImages = [
  '/pb-mazatlan-gallery-03-60cce90164f93.jpg',
  '/pueblobonito-mazatlan-gallery-img-01-6542c2cc87066.jpg',
  '/pb-montecristoestates-gallery-04-60df3d4ee6fd0.jpg',
  '/pb-montecristoestates-gallery-05-60df3d528a32c.jpg',
  '/pb-montecristoestates-gallery-12-60df3d69216ca.jpg',
  '/pueblobonito-sunsetbeach-golf-6556d4b6dcc8e.jpg',
];

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl shadow-xl">
          {galleryImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Pueblo Bonito ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Overlay gradient for better text visibility if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
