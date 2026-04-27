import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface SkyProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

export default function Sky({ timeOfDay, weather }: SkyProps) {
  const getSkyGradient = () => {
    const isCloudy = weather === "cloudy" || weather === "rain" || weather === "storm" || weather === "fog";
    const isRainy = weather === "rain" || weather === "storm";

    if (timeOfDay < 0.15) {
      // Sunrise
      if (isRainy) return "linear-gradient(180deg, #4A5568 0%, #5A6B7C 30%, #6B7D8E 60%, #7A8E9F 100%)";
      if (isCloudy) return "linear-gradient(180deg, #6B7B8C 0%, #8B9DAD 30%, #A8B8C8 60%, #C5D3E0 100%)";
      return "linear-gradient(180deg, #FF6B35 0%, #FF8E53 20%, #FFB347 40%, #87CEEB 70%, #E0F6FF 100%)";
    } else if (timeOfDay < 0.35) {
      // Morning
      if (isRainy) return "linear-gradient(180deg, #4A5568 0%, #5A6B7C 40%, #6B7D8E 70%, #7A8E9F 100%)";
      if (isCloudy) return "linear-gradient(180deg, #6B7B8C 0%, #8B9DAD 40%, #A8B8C8 70%, #C5D3E0 100%)";
      return "linear-gradient(180deg, #4FC3F7 0%, #81D4FA 30%, #B3E5FC 60%, #E1F5FE 100%)";
    } else if (timeOfDay < 0.5) {
      // Noon
      if (isRainy) return "linear-gradient(180deg, #3D4F5F 0%, #4A5D6E 30%, #5A6E7F 60%, #6A7E8F 100%)";
      if (isCloudy) return "linear-gradient(180deg, #5A6E7F 0%, #7A8E9F 30%, #9AADBE 60%, #B8C8D8 100%)";
      return "linear-gradient(180deg, #0288D1 0%, #29B6F6 25%, #4FC3F7 50%, #81D4FA 75%, #B3E5FC 100%)";
    } else if (timeOfDay < 0.65) {
      // Afternoon
      if (isRainy) return "linear-gradient(180deg, #3D4F5F 0%, #4A5D6E 40%, #5A6E7F 70%, #6A7E8F 100%)";
      if (isCloudy) return "linear-gradient(180deg, #5A6E7F 0%, #7A8E9F 40%, #9AADBE 70%, #B8C8D8 100%)";
      return "linear-gradient(180deg, #0277BD 0%, #0288D1 30%, #29B6F6 60%, #81D4FA 100%)";
    } else if (timeOfDay < 0.8) {
      // Sunset
      if (isRainy) return "linear-gradient(180deg, #2D3D4D 0%, #3D4D5D 20%, #4D5D6D 40%, #5D6D7D 60%, #6D7D8D 100%)";
      if (isCloudy) return "linear-gradient(180deg, #5A4A3A 0%, #6A5A4A 20%, #7A6A5A 40%, #8A7A6A 60%, #9A8A7A 100%)";
      return "linear-gradient(180deg, #4A148C 0%, #7B1FA2 10%, #C62828 25%, #FF6F00 40%, #FF8F00 55%, #FFB300 70%, #FFCA28 85%, #FFE082 100%)";
    } else {
      // Night
      if (isRainy) return "linear-gradient(180deg, #0A0F14 0%, #0D1117 20%, #111820 45%, #152028 70%, #1A1A2E 100%)";
      if (isCloudy) return "linear-gradient(180deg, #0D1117 0%, #1A1A2E 20%, #1E2535 45%, #222A3A 70%, #1A1A2E 100%)";
      return "linear-gradient(180deg, #0D1117 0%, #1A1A2E 20%, #16213E 45%, #0F3460 70%, #1A1A2E 100%)";
    }
  };

  const getOverlayOpacity = () => {
    if (timeOfDay < 0.65) return 0;
    return (timeOfDay - 0.65) / 0.35;
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ background: getSkyGradient() }}
        transition={{ duration: 1.5 }}
      />
      {/* Night overlay for stars visibility */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: getOverlayOpacity() * 0.35 }}
        transition={{ duration: 1.5 }}
      />
      {/* Horizon glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        animate={{
          background:
            weather === "rain" || weather === "storm"
              ? "linear-gradient(180deg, transparent 0%, rgba(60, 80, 100, 0.2) 100%)"
              : weather === "cloudy"
              ? "linear-gradient(180deg, transparent 0%, rgba(100, 110, 120, 0.15) 100%)"
              : timeOfDay < 0.15
              ? "linear-gradient(180deg, transparent 0%, rgba(255, 180, 100, 0.15) 100%)"
              : timeOfDay < 0.65
              ? "linear-gradient(180deg, transparent 0%, rgba(100, 200, 255, 0.1) 100%)"
              : timeOfDay < 0.8
              ? "linear-gradient(180deg, transparent 0%, rgba(255, 150, 80, 0.2) 100%)"
              : "linear-gradient(180deg, transparent 0%, rgba(50, 80, 120, 0.1) 100%)",
        }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
}
