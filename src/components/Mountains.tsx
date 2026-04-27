import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface MountainsProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

function MountainLayer({
  color,
  height,
  points,
  parallaxSpeed,
}: {
  color: string;
  height: string;
  points: string;
  parallaxSpeed: number;
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0"
      style={{ height }}
      animate={{ x: [0, -20, 0] }}
      transition={{
        duration: parallaxSpeed * 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-[120%] h-full -ml-[10%]"
      >
        <path d={points} fill={color} />
      </svg>
    </motion.div>
  );
}

export default function Mountains({ timeOfDay, weather }: MountainsProps) {
  const isRainy = weather === "rain" || weather === "storm";
  const isCloudy = weather === "cloudy" || weather === "fog";

  const getMountainColors = () => {
    if (isRainy) {
      return {
        far: "#3A4A5A",
        mid: "#2A3A4A",
        near: "#1A2A3A",
        closest: "#0A1A2A",
      };
    }
    if (isCloudy) {
      return {
        far: "#5A6A7A",
        mid: "#4A5A6A",
        near: "#3A4A5A",
        closest: "#2A3A4A",
      };
    }
    if (timeOfDay < 0.15) {
      return { far: "#8B7355", mid: "#6B5B4F", near: "#5D4E37", closest: "#4A3F2F" };
    } else if (timeOfDay < 0.65) {
      return { far: "#7BA3A8", mid: "#5E8B7E", near: "#3D6B5F", closest: "#2F523D" };
    } else if (timeOfDay < 0.8) {
      return { far: "#8B6F5C", mid: "#6B4E3D", near: "#5A3D2E", closest: "#4A2F22" };
    } else {
      return { far: "#2C3E50", mid: "#1A252F", near: "#0F1A24", closest: "#0A1118" };
    }
  };

  const colors = getMountainColors();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[70%] overflow-hidden">
      <MountainLayer
        color={colors.far}
        height="55%"
        points="M0,320 L0,180 Q120,80 240,150 Q360,60 480,130 Q600,40 720,120 Q840,50 960,140 Q1080,70 1200,130 Q1320,60 1440,150 L1440,320 Z"
        parallaxSpeed={3}
      />
      <MountainLayer
        color={colors.mid}
        height="45%"
        points="M0,320 L0,220 Q100,140 200,200 Q300,100 400,180 Q500,80 600,170 Q700,90 800,190 Q900,100 1000,180 Q1100,110 1200,200 Q1300,120 1440,210 L1440,320 Z"
        parallaxSpeed={2}
      />
      <MountainLayer
        color={colors.near}
        height="38%"
        points="M0,320 L0,240 Q80,160 160,220 Q240,130 320,210 Q400,140 480,230 Q560,150 640,220 Q720,140 800,230 Q880,150 960,220 Q1040,140 1120,210 Q1200,130 1280,220 Q1360,150 1440,240 L1440,320 Z"
        parallaxSpeed={1.5}
      />
      <MountainLayer
        color={colors.closest}
        height="30%"
        points="M0,320 L0,260 Q60,180 120,250 Q180,170 240,260 Q300,180 360,250 Q420,170 480,260 Q540,180 600,250 Q660,170 720,260 Q780,180 840,250 Q900,170 960,260 Q1020,180 1080,250 Q1140,170 1200,260 Q1260,180 1320,250 Q1380,170 1440,260 L1440,320 Z"
        parallaxSpeed={1}
      />
      <motion.div
        className="absolute bottom-[52%] left-0 right-0 h-[8%]"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-[120%] h-full -ml-[10%]">
          <path
            d="M200,100 L240,30 L280,100 M460,100 L500,20 L540,100 M700,100 L720,40 L740,100 M960,100 L1000,25 L1040,100 M1180,100 L1220,35 L1260,100"
            fill={timeOfDay > 0.75 || isRainy ? "#4A5568" : "#F5F5F5"}
            stroke="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
