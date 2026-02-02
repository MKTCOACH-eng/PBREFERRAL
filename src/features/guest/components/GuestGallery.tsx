'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GuestGallery() {
  const t = useTranslations('guest.properties');
  const [currentSlide, setCurrentSlide] = useState(0);

  const properties = [
    {
      name: 'Pueblo Bonito Sunset Beach',
      location: 'Los Cabos',
      images: [
        '/pueblo-bonito-sunset-beach-golf-and-spa-resort-hero.webp',
        '/pueblobonito-sunsetbeach-golf-6556d4b6dcc8e.jpg',
        '/pueblobonito-montecristo-hero-01-1-658df6f66235c.jpg'
      ],
      key: 'sunset'
    },
    {
      name: 'Quivira Golf Club',
      location: 'Los Cabos',
      images: [
        '/pb-montecristoestates-gallery-04-60df3d4ee6fd0.jpg',
        '/pb-montecristoestates-gallery-05-60df3d528a32c.jpg',
        '/pb-montecristoestates-gallery-12-60df3d69216ca.jpg'
      ],
      key: 'quivira'
    },
    {
      name: 'Pueblo Bonito Emerald Bay',
      location: 'Mazatlán',
      images: [
        '/pueblobonito-mazatlan-gallery-img-01-6542c2cc87066.jpg',
        '/pb-mazatlan-gallery-03-60cce90164f93.jpg',
        '/pb-mazatlan-hero-mobile-01-65b16cd64394f.jpg'
      ],
      key: 'emerald'
    }
  ];

  const allSlides = properties.flatMap(property => 
    property.images.map((image, idx) => ({
      image,
      property: property.name,
      location: property.location,
      key: property.key,
      isFirst: idx === 0
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [allSlides.length]);

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F6F3] to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#C8A882] font-light mb-4">
            {t('subtitle')}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A2332] mb-6">
            {t('title')}
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C8A882] to-transparent mx-auto"></div>
        </div>

        {/* Gallery Carousel */}
        <div className="relative h-[600px] rounded-sm overflow-hidden shadow-2xl mb-8">
          {allSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.property}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Property Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-sm uppercase tracking-[0.2em] mb-2 text-[#C8A882]">
                  {slide.location}
                </p>
                <h3 className="text-3xl md:text-4xl font-serif font-light mb-4">
                  {slide.property}
                </h3>
                {slide.isFirst && (
                  <p className="text-white/90 font-light max-w-2xl">
                    {t(`${slide.key}.tagline`)}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            {allSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-[#C8A882]'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                } rounded-full`}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Property Cards with Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Sunset Beach */}
          <div className="bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="relative h-48">
              <Image
                src="/pueblo-bonito-sunset-beach-golf-and-spa-resort-hero.webp"
                alt="Sunset Beach"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
                {t('sunset.name')}
              </h3>
              <p className="text-sm text-[#C8A882] mb-4 uppercase tracking-wide">Los Cabos</p>
              <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
                {t('sunset.description')}
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contacto Los Cabos</p>
                <a href="tel:+526241455400" className="text-sm text-[#1A2332] hover:text-[#C8A882] transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +52 (624) 145-5400
                </a>
                <a href="mailto:info@pueblobonito.com" className="text-sm text-[#1A2332] hover:text-[#C8A882] transition-colors flex items-center gap-2 mt-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@pueblobonito.com
                </a>
              </div>
            </div>
          </div>

          {/* Quivira Golf */}
          <div className="bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="relative h-48">
              <Image
                src="/pb-montecristoestates-gallery-04-60df3d4ee6fd0.jpg"
                alt="Quivira Golf Club"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
                {t('quivira.name')}
              </h3>
              <p className="text-sm text-[#C8A882] mb-4 uppercase tracking-wide">Los Cabos</p>
              <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
                {t('quivira.description')}
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contacto Los Cabos</p>
                <a href="tel:+526241455400" className="text-sm text-[#1A2332] hover:text-[#C8A882] transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +52 (624) 145-5400
                </a>
                <a href="mailto:info@pueblobonito.com" className="text-sm text-[#1A2332] hover:text-[#C8A882] transition-colors flex items-center gap-2 mt-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@pueblobonito.com
                </a>
              </div>
            </div>
          </div>

          {/* Emerald Bay Mazatlán */}
          <div className="bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="relative h-48">
              <Image
                src="/pueblobonito-mazatlan-gallery-img-01-6542c2cc87066.jpg"
                alt="Emerald Bay"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
                {t('emerald.name')}
              </h3>
              <p className="text-sm text-[#C8A882] mb-4 uppercase tracking-wide">Mazatlán</p>
              <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
                {t('emerald.description')}
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contacto Mazatlán</p>
                <a href="tel:+526699898900" className="text-sm text-[#1A2332] hover:text-[#C8A882] transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +52 (669) 989-8900
                </a>
                <a href="mailto:info@pueblobonito.com" className="text-sm text-[#1A2332] hover:text-[#C8A882] transition-colors flex items-center gap-2 mt-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@pueblobonito.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
