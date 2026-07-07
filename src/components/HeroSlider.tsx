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
    <section className="relative w-full overflow-hidden bg-slate-950 lg:h-[700px]">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-x-0 top-0 h-[260px] transition-opacity duration-700 ease-in-out sm:h-[320px] lg:inset-0 lg:h-full ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="h-full w-full object-cover object-center"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-950/5 via-slate-950/20 to-slate-950/75 lg:bg-gradient-to-r lg:from-slate-950/80 lg:via-slate-950/55 lg:to-slate-950/25" /> */}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-10 pt-[210px] sm:px-6 sm:pb-12 sm:pt-[270px] lg:flex lg:min-h-[700px] lg:items-center lg:pt-20">
        {/* we not need this extra content */}
        {/* <div className="max-w-xl rounded-[28px] bg-white p-6 text-slate-900 shadow-2xl shadow-slate-950/10 ring-1 ring-slate-200/70 sm:p-8 lg:bg-white/10 lg:text-white lg:ring-white/15 lg:backdrop-blur-md">
          <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-green-700 ring-1 ring-green-200 sm:text-sm lg:bg-green-400/15 lg:text-green-100 lg:ring-green-300/25">
            Trusted Household Essentials
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-6xl">
            Everyday products for homes that expect{" "}
            <span className="text-green-600 lg:text-green-300">quality and consistency</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:text-slate-200">
            Explore dependable Dhatri products backed by trusted local
            distribution, practical value, and responsive service.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#products">
              <Button
                size="lg"
                className="min-h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition-all hover:from-green-600 hover:to-emerald-700 sm:px-8"
              >
                Explore Products
              </Button>
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:px-8 lg:border-white/25 lg:text-white lg:hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div> */}
      </div>

      {/* Slider Indicators */}
      <div className="absolute left-0 right-0 top-[226px] z-10 flex justify-center gap-2 sm:top-[284px] lg:bottom-6 lg:top-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-green-400" : "w-3 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
