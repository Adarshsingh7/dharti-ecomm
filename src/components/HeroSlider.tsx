"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  "/slider/slide1.jpg",
  "/slider/slide2.jpg",
  "/slider/slide3.jpg",
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="object-cover w-full h-full"
          />
          {/* Dark Overlay to make text readable */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center">
        <div className="inline-block animate-bounce rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300 font-medium mb-6 backdrop-blur-md border border-green-500/30">
          Welcome to Dharti Products
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
          Discover the Magic of <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
            Dharti Products
          </span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-slate-200 mb-10 drop-shadow-md">
          Premium quality, authentic products curated just for you. Explore our collection and experience the difference today.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="#products">
            <Button
              size="lg"
              className="rounded-full px-8 shadow-xl hover:scale-105 transition-all bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold border-none"
            >
              Explore Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-green-400 w-8" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
