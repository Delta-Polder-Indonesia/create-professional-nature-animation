import { motion } from "framer-motion";
import { useMemo } from "react";
import type { WeatherCondition } from "../hooks/useWeather";

interface ForegroundProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

interface Flower {
  id: number;
  x: number;
  color: string;
  delay: number;
  height: number;
}

export default function Foreground({ timeOfDay, weather }: ForegroundProps) {
  const isRainy = weather === "rain" || weather === "storm";

  const flowers = useMemo<Flower[]>(() => {
    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF8E53", "#C44569", "#F8B500", "#E056FD", "#FF9F43"];
    const result: Flower[] = [];
    for (let i = 0; i < 35; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 4,
        height: Math.random() * 8 + 8,
      });
    }
    return result;
  }, []);

  const grassColor = isRainy
    ? "#1A2F1A"
    : timeOfDay > 0.75
    ? "#1A2F1A"
    : timeOfDay > 0.65
    ? "#3D5A27"
    : "#3D6B2F";

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[8%] overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: grassColor }}
        transition={{ duration: 1 }}
      />

      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute bottom-full left-0 w-full h-8">
        <motion.path
          d="M0,60 L0,30 Q20,10 40,30 Q60,5 80,30 Q100,15 120,30 Q140,8 160,30 Q180,12 200,30 Q220,6 240,30 Q260,14 280,30 Q300,7 320,30 Q340,11 360,30 Q380,5 400,30 Q420,13 440,30 Q460,9 480,30 Q500,6 520,30 Q540,15 560,30 Q580,8 600,30 Q620,12 640,30 Q660,5 680,30 Q700,14 720,30 Q740,7 760,30 Q780,11 800,30 Q820,6 840,30 Q860,13 880,30 Q900,9 920,30 Q940,5 960,30 Q980,15 1000,30 Q1020,8 1040,30 Q1060,12 1080,30 Q1100,6 1120,30 Q1140,14 1160,30 Q1180,7 1200,30 Q1220,11 1240,30 Q1260,5 1280,30 Q1300,13 1320,30 Q1340,9 1360,30 Q1380,6 1400,30 Q1420,15 1440,30 L1440,60 Z"
          fill={grassColor}
          animate={{
            d: [
              "M0,60 L0,30 Q20,10 40,30 Q60,5 80,30 Q100,15 120,30 Q140,8 160,30 Q180,12 200,30 Q220,6 240,30 Q260,14 280,30 Q300,7 320,30 Q340,11 360,30 Q380,5 400,30 Q420,13 440,30 Q460,9 480,30 Q500,6 520,30 Q540,15 560,30 Q580,8 600,30 Q620,12 640,30 Q660,5 680,30 Q700,14 720,30 Q740,7 760,30 Q780,11 800,30 Q820,6 840,30 Q860,13 880,30 Q900,9 920,30 Q940,5 960,30 Q980,15 1000,30 Q1020,8 1040,30 Q1060,12 1080,30 Q1100,6 1120,30 Q1140,14 1160,30 Q1180,7 1200,30 Q1220,11 1240,30 Q1260,5 1280,30 Q1300,13 1320,30 Q1340,9 1360,30 Q1380,6 1400,30 Q1420,15 1440,30 L1440,60 Z",
              "M0,60 L0,30 Q20,5 40,30 Q60,10 80,30 Q100,8 120,30 Q140,12 160,30 Q180,6 200,30 Q220,14 240,30 Q260,7 280,30 Q300,11 320,30 Q340,5 360,30 Q380,13 400,30 Q420,9 440,30 Q460,6 480,30 Q500,15 520,30 Q540,8 560,30 Q580,12 600,30 Q620,5 640,30 Q660,14 680,30 Q700,7 720,30 Q740,11 760,30 Q780,6 800,30 Q820,13 840,30 Q860,9 880,30 Q900,5 920,30 Q940,15 960,30 Q980,8 1000,30 Q1020,12 1040,30 Q1060,6 1080,30 Q1100,14 1120,30 Q1140,7 1160,30 Q1180,11 1200,30 Q1220,5 1240,30 Q1260,13 1280,30 Q1300,9 1320,30 Q1340,6 1360,30 Q1380,15 1400,30 Q1420,8 1440,30 L1440,60 Z",
              "M0,60 L0,30 Q20,10 40,30 Q60,5 80,30 Q100,15 120,30 Q140,8 160,30 Q180,12 200,30 Q220,6 240,30 Q260,14 280,30 Q300,7 320,30 Q340,11 360,30 Q380,5 400,30 Q420,13 440,30 Q460,9 480,30 Q500,6 520,30 Q540,15 560,30 Q580,8 600,30 Q620,12 640,30 Q660,5 680,30 Q700,14 720,30 Q740,7 760,30 Q780,11 800,30 Q820,6 840,30 Q860,13 880,30 Q900,9 920,30 Q940,5 960,30 Q980,15 1000,30 Q1020,8 1040,30 Q1060,12 1080,30 Q1100,6 1120,30 Q1140,14 1160,30 Q1180,7 1200,30 Q1220,11 1240,30 Q1260,5 1280,30 Q1300,13 1320,30 Q1340,9 1360,30 Q1380,6 1400,30 Q1420,15 1440,30 L1440,60 Z",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Flowers - fewer during rain */}
      {!isRainy &&
        flowers.map((flower) => (
          <motion.div
            key={flower.id}
            className="absolute bottom-1"
            style={{ left: `${flower.x}%` }}
            animate={{
              y: [0, -2, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: flower.delay,
              ease: "easeInOut",
            }}
          >
            <svg width="12" height={flower.height} viewBox={`0 0 12 ${flower.height}`}>
              <line x1="6" y1="8" x2="6" y2={flower.height} stroke="#4A7C59" strokeWidth="1.5" />
              <circle cx="6" cy="5" r="4" fill={flower.color} />
              <circle cx="6" cy="5" r="2" fill="#FFD93D" />
            </svg>
          </motion.div>
        ))}

      {/* Small rocks */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`rock-${i}`}
          className="absolute bottom-1"
          style={{
            left: `${10 + i * 16 + Math.random() * 8}%`,
            opacity: 0.4,
          }}
        >
          <svg width={12 + Math.random() * 16} height={8 + Math.random() * 8} viewBox="0 0 20 12">
            <ellipse cx="10" cy="8" rx="10" ry="4" fill={timeOfDay > 0.75 || isRainy ? "#2A3A2A" : "#5A6B5A"} />
          </svg>
        </div>
      ))}

      {/* Fireflies for night - only when clear */}
      {timeOfDay > 0.75 && weather === "clear" &&
        [...Array(15)].map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 60 + 10}%`,
              backgroundColor: "#ADFF2F",
              boxShadow: "0 0 6px #ADFF2F, 0 0 12px #ADFF2F",
            }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
