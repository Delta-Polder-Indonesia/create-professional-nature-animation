import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import type { WeatherCondition } from "../hooks/useWeather";

interface BirdsProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

interface Bird {
  id: number;
  startX: number;
  startY: number;
  speed: number;
  size: number;
  delay: number;
  wingSpeed: number;
}

function BirdSVG({ size, wingPhase }: { size: number; wingPhase: number }) {
  const wingY = Math.sin(wingPhase) * 8;
  return (
    <svg
      viewBox="0 0 40 20"
      width={size}
      height={size * 0.5}
      fill="none"
      stroke="#1a1a2e"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d={`M2 10 Q10 ${10 - wingY} 20 10 Q30 ${10 - wingY} 38 10`}
        animate={{
          d: [
            `M2 10 Q10 ${10 - wingY} 20 10 Q30 ${10 - wingY} 38 10`,
            `M2 10 Q10 ${10 + wingY} 20 10 Q30 ${10 + wingY} 38 10`,
            `M2 10 Q10 ${10 - wingY} 20 10 Q30 ${10 - wingY} 38 10`,
          ],
        }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function Birds({ timeOfDay, weather }: BirdsProps) {
  const [wingPhase, setWingPhase] = useState(0);
  const isRainy = weather === "rain" || weather === "storm";
  const isNight = timeOfDay > 0.75;

  useEffect(() => {
    const interval = setInterval(() => {
      setWingPhase((prev) => prev + 0.15);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const birds = useMemo<Bird[]>(() => {
    // Fewer birds during rain or night
    const count = isRainy || isNight ? 3 : 8;
    const result: Bird[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 30 + 10,
        speed: Math.random() * 25 + 20,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 15,
        wingSpeed: Math.random() * 0.5 + 0.3,
      });
    }
    return result;
  }, [isRainy, isNight]);

  const birdColor = timeOfDay > 0.75 ? "#888" : "#1a1a2e";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute"
          style={{
            top: `${bird.startY}%`,
          }}
          animate={{
            left: ["-10%", "110%"],
            top: [
              `${bird.startY}%`,
              `${bird.startY - 5}%`,
              `${bird.startY + 3}%`,
              `${bird.startY - 2}%`,
              `${bird.startY}%`,
            ],
          }}
          transition={{
            left: {
              duration: bird.speed,
              repeat: Infinity,
              ease: "linear",
              delay: bird.delay,
            },
            top: {
              duration: bird.speed / 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bird.delay,
            },
          }}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -3, 0] }}
            transition={{ duration: bird.speed / 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BirdSVG size={bird.size} wingPhase={wingPhase * bird.wingSpeed} />
          </motion.div>
        </motion.div>
      ))}

      {/* V-formation birds - only when clear and day */}
      {!isRainy && !isNight && (
        <motion.div
          className="absolute"
          style={{ top: "15%" }}
          animate={{
            left: ["-15%", "115%"],
            top: ["15%", "12%", "18%", "14%", "15%"],
          }}
          transition={{
            left: { duration: 35, repeat: Infinity, ease: "linear", delay: 5 },
            top: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 },
          }}
        >
          <div className="flex flex-col items-center gap-1">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex gap-3">
                {Array.from({ length: row === 1 ? 1 : 2 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 + row * 0.15 }}
                  >
                    <svg width="18" height="10" viewBox="0 0 40 20" fill="none" stroke={birdColor} strokeWidth="1.5" strokeLinecap="round">
                      <motion.path
                        d="M2 10 Q10 2 20 10 Q30 2 38 10"
                        animate={{ d: ["M2 10 Q10 2 20 10 Q30 2 38 10", "M2 10 Q10 18 20 10 Q30 18 38 10", "M2 10 Q10 2 20 10 Q30 2 38 10"] }}
                        transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
