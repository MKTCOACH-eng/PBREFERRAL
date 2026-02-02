'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GuestGallery() {
  const t = useTranslations('guest.properties');
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/pueblobonito-hero-01-658c8621d460f.jpg',
    '/pueblobonito-hero-01-658c8621d460f.jpg',
    '/pueblobonito-hero-01-658c8621d460f.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-light text-[#1A2332] mb-4">
            {t('title')}
          </h2>
          <p className="text-xl font-light text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`Resort ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
