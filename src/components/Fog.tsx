import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface FogProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

export default function Fog({ timeOfDay, weather }: FogProps) {
  const isFoggy = weather === "fog";
  const isRainy = weather === "rain" || weather === "storm";

  // Fog appears during early morning, late evening, or when weather is foggy
  const timeFogOpacity =
    timeOfDay < 0.2
      ? Math.min(1, (0.2 - timeOfDay) / 0.1) * 0.4
      : timeOfDay > 0.7 && timeOfDay < 0.85
      ? Math.min(1, (timeOfDay - 0.7) / 0.1) * 0.3
      : 0;

  const weatherFogOpacity = isFoggy ? 0.6 : isRainy ? 0.25 : 0;
  const fogOpacity = Math.max(timeFogOpacity, weatherFogOpacity);

  if (fogOpacity <= 0) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[50%] overflow-hidden pointer-events-none z-20">
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={layer}
          className="absolute w-[200%] h-full"
          style={{
            bottom: `${layer * 10}%`,
            opacity: fogOpacity * (0.5 - layer * 0.15),
          }}
          animate={{
            x: layer % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            duration: 20 + layer * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id={`fogGrad-${layer}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="30%" stopColor="white" stopOpacity="0.6" />
                <stop offset="70%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M0,100 Q180,${60 + layer * 20} 360,100 Q540,${40 + layer * 15} 720,100 Q900,${70 + layer * 10} 1080,100 Q1260,${50 + layer * 20} 1440,100 L1440,200 L0,200 Z`}
              fill={`url(#fogGrad-${layer})`}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
