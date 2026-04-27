import { motion } from "framer-motion";
import { useMemo } from "react";
import type { WeatherCondition } from "../hooks/useWeather";

interface StarsProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
}

export default function Stars({ timeOfDay, weather }: StarsProps) {
  const stars = useMemo<Star[]>(() => {
    const result: Star[] = [];
    for (let i = 0; i < 180; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }
    return result;
  }, []);

  // Stars hidden during day or when cloudy/rainy
  const isVisible = timeOfDay > 0.75 && (weather === "clear" || weather === "fog");
  const opacity = isVisible ? (timeOfDay - 0.75) / 0.25 : 0;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: `rgba(255, 255, 255, ${star.brightness})`,
            boxShadow: star.size > 2 ? `0 0 ${star.size * 2}px rgba(255,255,255,0.5)` : "none",
          }}
          animate={{
            opacity: [opacity * 0.3 * star.brightness, opacity * star.brightness, opacity * 0.3 * star.brightness],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
