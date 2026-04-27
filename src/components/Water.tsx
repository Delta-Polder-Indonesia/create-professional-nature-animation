import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface WaterProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

export default function Water({ timeOfDay, weather }: WaterProps) {
  const isRainy = weather === "rain" || weather === "storm";

  const getWaterColor = () => {
    if (isRainy) return "#1A2F3D";
    if (timeOfDay < 0.15) return "#5B8FA8";
    if (timeOfDay < 0.65) return "#2E7D9A";
    if (timeOfDay < 0.8) return "#4A6B7C";
    return "#1A2F3D";
  };

  const getReflectionColor = () => {
    if (isRainy) return "rgba(80, 100, 120, 0.25)";
    if (timeOfDay < 0.15) return "rgba(255, 180, 100, 0.3)";
    if (timeOfDay < 0.65) return "rgba(100, 200, 255, 0.2)";
    if (timeOfDay < 0.8) return "rgba(255, 150, 80, 0.3)";
    return "rgba(100, 120, 150, 0.15)";
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[12%] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: getWaterColor() }}
        transition={{ duration: 1 }}
      />

      {[0, 1, 2, 3].map((layer) => (
        <motion.div
          key={layer}
          className="absolute w-[200%] h-full"
          style={{
            bottom: `${layer * 8}%`,
            opacity: 0.3 + layer * 0.15,
          }}
          animate={{
            x: layer % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            duration: isRainy ? 3 + layer * 1.5 : 8 + layer * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
            <path
              d={`M0,50 Q180,${30 - layer * 5} 360,50 Q540,${70 + layer * 3} 720,50 Q900,${30 - layer * 5} 1080,50 Q1260,${70 + layer * 3} 1440,50 L1440,100 L0,100 Z`}
              fill={getReflectionColor()}
            />
          </svg>
        </motion.div>
      ))}

      {/* Rain ripples on water */}
      {isRainy &&
        [...Array(25)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-blue-200/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              scale: [0, 2, 3],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          >
            <div className="w-4 h-2 rounded-full border border-blue-200/30" />
          </motion.div>
        ))}

      {/* Sparkles */}
      {[...Array(isRainy ? 50 : 20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
