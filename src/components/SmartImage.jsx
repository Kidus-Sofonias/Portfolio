import React, { useState } from 'react';

/**
 * SmartImage — image with a shimmer skeleton while loading,
 * fade-in on load, and native lazy loading.
 *
 * Usage:
 *   <SmartImage src="/kidus.png" alt="Kidus Sofonias" className="aspect-[4/7]" />
 *
 * The wrapper gets `className` (sizing); the <img> gets `imgClassName`
 * (object-fit etc.). Set `eager` to disable lazy loading for above-the-fold images.
 */
const SmartImage = ({ src, alt, className = '', imgClassName = '', eager = false }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      {/* Shimmer skeleton */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 animate-shimmer transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)} /* hide shimmer rather than loop forever */
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
};

export default SmartImage;
