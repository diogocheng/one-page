'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

export default function LibrarySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  return (
    <section className="py-20 bg-[#f5f5f5]">
      {/* Full-screen image modal */}
      {isImageZoomed && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/pac.jpg"
              alt="Library Image Full Screen"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={toggleImageZoom}
              className="absolute top-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 bg-black/50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          
        </motion.div>

        {/* Side-by-side media layout with symmetrical margins */}
        <div className="flex flex-col lg:flex-row gap-5 -mx-24">
          {/* Left column - Image */}
          <div className="flex-1">
            <div>
              <div className="relative">
                <img
                  src="/pac.jpg"
                  alt="Hallo"
                  className="w-full h-[600px] object-cover mb-3"
                  style={{ maxWidth: '100%' }}
                />
                <button
                  onClick={toggleImageZoom}
                  className="absolute bottom-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                >
                  {isImageZoomed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Video */}
          <div className="flex-1">
            <div>
              <div className="relative">
                <video
                  ref={videoRef}
                  src="/pf.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[600px] object-cover mb-3"
                  style={{ maxWidth: '100%' }}
                />
                <button
                  onClick={togglePlayPause}
                  className="absolute bottom-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 italic text-right">
                Playing with some friends in douro padel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}