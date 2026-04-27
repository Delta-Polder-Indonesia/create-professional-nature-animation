import { motion } from "framer-motion";
import { useMemo } from "react";
import type { WeatherCondition } from "../hooks/useWeather";

interface CloudsProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  scale: number;
  speed: number;
  opacity: number;
}

function CloudShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full" fill={color}>
      <ellipse cx="40" cy="50" rx="35" ry="25" />
      <ellipse cx="80" cy="40" rx="45" ry="35" />
      <ellipse cx="120" cy="45" rx="40" ry="30" />
      <ellipse cx="155" cy="50" rx="30" ry="22" />
      <ellipse cx="60" cy="55" rx="50" ry="20" />
      <ellipse cx="110" cy="55" rx="55" ry="22" />
    </svg>
  );
}

export default function Clouds({ timeOfDay, weather }: CloudsProps) {
  const isCloudy = weather === "cloudy" || weather === "rain" || weather === "storm" || weather === "fog";
  const isRainy = weather === "rain" || weather === "storm";

  const clouds = useMemo<Cloud[]>(() => {
    const baseCount = isCloudy ? 18 : 12;
    const count = isRainy ? 22 : baseCount;
    const result: Cloud[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * (isCloudy ? 45 : 35) + 5,
        scale: isCloudy ? Math.random() * 1.2 + 0.5 : Math.random() * 0.8 + 0.4,
        speed: isCloudy ? Math.random() * 30 + 20 : Math.random() * 40 + 30,
        opacity: isCloudy ? Math.random() * 0.3 + 0.6 : Math.random() * 0.4 + 0.4,
      });
    }
    return result;
  }, [isCloudy, isRainy]);

  const getCloudColor = () => {
    if (isRainy) return "rgba(100, 110, 120, 0.9)";
    if (isCloudy) return "rgba(180, 190, 200, 0.9)";
    if (timeOfDay < 0.15) return "rgba(255, 220, 180, 0.9)";
    if (timeOfDay < 0.65) return "rgba(255, 255, 255, 0.85)";
    if (timeOfDay < 0.8) return "rgba(255, 180, 140, 0.8)";
    return "rgba(150, 160, 180, 0.5)";
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.y}%`,
            width: `${cloud.scale * 200}px`,
            height: `${cloud.scale * 80}px`,
            opacity: cloud.opacity,
          }}
          animate={{
            left: ["-20%", "120%"],
          }}
          transition={{
            duration: cloud.speed,
            repeat: Infinity,
            ease: "linear",
            delay: cloud.x / 100 * cloud.speed,
          }}
        >
          <CloudShape color={getCloudColor()} />
        </motion.div>
      ))}
    </div>
  );
}
