import { motion } from "framer-motion";
import { useMemo } from "react";
import type { WeatherCondition } from "../hooks/useWeather";

interface TreesProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

interface Tree {
  id: number;
  x: number;
  scale: number;
  type: "pine" | "round" | "tall" | "bush";
  delay: number;
}

function PineTree({ color, scale }: { color: string; scale: number }) {
  const swayDuration = 3 + Math.random() * 2;
  return (
    <svg viewBox="0 0 60 120" width={60 * scale} height={120 * scale}>
      <motion.g
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: swayDuration, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "30px 120px" }}
      >
        <polygon points="30,5 10,40 50,40" fill={color} />
        <polygon points="30,25 8,60 52,60" fill={color} />
        <polygon points="30,45 5,80 55,80" fill={color} />
        <polygon points="30,65 2,100 58,100" fill={color} />
        <rect x="25" y="100" width="10" height="20" fill="#5D4037" />
      </motion.g>
    </svg>
  );
}

function RoundTree({ color, scale }: { color: string; scale: number }) {
  const swayDuration = 4 + Math.random() * 2;
  return (
    <svg viewBox="0 0 80 100" width={80 * scale} height={100 * scale}>
      <motion.g
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: swayDuration, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "40px 100px" }}
      >
        <circle cx="40" cy="35" r="28" fill={color} />
        <circle cx="25" cy="45" r="20" fill={color} />
        <circle cx="55" cy="45" r="20" fill={color} />
        <circle cx="40" cy="55" r="22" fill={color} />
        <rect x="35" y="75" width="10" height="25" fill="#5D4037" />
      </motion.g>
    </svg>
  );
}

function TallTree({ color, scale }: { color: string; scale: number }) {
  const swayDuration = 3.5 + Math.random() * 2;
  return (
    <svg viewBox="0 0 50 140" width={50 * scale} height={140 * scale}>
      <motion.g
        animate={{ rotate: [-1.2, 1.2, -1.2] }}
        transition={{ duration: swayDuration, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "25px 140px" }}
      >
        <ellipse cx="25" cy="30" rx="20" ry="28" fill={color} />
        <ellipse cx="25" cy="55" rx="18" ry="25" fill={color} />
        <ellipse cx="25" cy="80" rx="16" ry="22" fill={color} />
        <rect x="20" y="100" width="10" height="40" fill="#5D4037" />
      </motion.g>
    </svg>
  );
}

function Bush({ color, scale }: { color: string; scale: number }) {
  return (
    <svg viewBox="0 0 70 50" width={70 * scale} height={50 * scale}>
      <motion.g
        animate={{ scaleX: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <ellipse cx="20" cy="35" rx="18" ry="15" fill={color} />
        <ellipse cx="35" cy="28" rx="22" ry="18" fill={color} />
        <ellipse cx="50" cy="35" rx="16" ry="14" fill={color} />
        <ellipse cx="35" cy="40" rx="28" ry="12" fill={color} />
      </motion.g>
    </svg>
  );
}

export default function Trees({ timeOfDay, weather }: TreesProps) {
  const trees = useMemo<Tree[]>(() => {
    const result: Tree[] = [];
    const types: ("pine" | "round" | "tall" | "bush")[] = ["pine", "round", "tall", "bush"];
    for (let i = 0; i < 30; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        scale: Math.random() * 0.6 + 0.3,
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 3,
      });
    }
    return result.sort((a, b) => a.scale - b.scale);
  }, []);

  const getTreeColor = () => {
    if (weather === "rain" || weather === "storm") return "#1A2F1A";
    if (weather === "cloudy" || weather === "fog") return "#2D4A27";
    if (timeOfDay < 0.15) return "#4A6741";
    if (timeOfDay < 0.65) return "#2D5A27";
    if (timeOfDay < 0.8) return "#5D4E37";
    return "#1A2F1A";
  };

  const color = getTreeColor();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[25%] overflow-hidden pointer-events-none">
      {trees.map((tree) => (
        <div
          key={tree.id}
          className="absolute bottom-0"
          style={{
            left: `${tree.x}%`,
            zIndex: Math.floor(tree.scale * 10),
          }}
        >
          {tree.type === "pine" && <PineTree color={color} scale={tree.scale} />}
          {tree.type === "round" && <RoundTree color={color} scale={tree.scale} />}
          {tree.type === "tall" && <TallTree color={color} scale={tree.scale} />}
          {tree.type === "bush" && <Bush color={color} scale={tree.scale} />}
        </div>
      ))}
    </div>
  );
}
