"use client";

import React, { useEffect, useRef, useState } from "react";

interface CenteredWaveformButtonProps {
  text: string;
  className?: string;
}

export default function CenteredWaveformButton({
  text,
  className = "",
}: CenteredWaveformButtonProps) {
  const [bars, setBars] = useState(8);
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBars = () => {
      if (waveformRef.current) {
        const width = waveformRef.current.offsetWidth;
        const newBars = Math.min(130, Math.floor(width / 4));
        setBars(newBars);
      }
    };

    updateBars();
    window.addEventListener("resize", updateBars);
    return () => window.removeEventListener("resize", updateBars);
  }, []);

  return (
    <button
      className={`flex items-center justify-start w-full bg-black text-white px-4 py-3 rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-900 ${className}`}
    >
      <div
        ref={waveformRef}
        className="relative h-6 mr-2 flex-grow flex items-center"
      >
        {[...Array(bars)].map((_, index) => (
          <div
            key={index}
            className="flex-grow bg-white rounded-full animate-continuous-waveform mx-px"
            style={{
              animationDelay: `${(index * 0.1) % 1}s`,
              minWidth: "2px",
            }}
          ></div>
        ))}
        <div className="absolute -top-1 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
      <span className="font-medium whitespace-nowrap text-sm sm:text-base flex-shrink-0">
        {text}
      </span>
    </button>
  );
}
