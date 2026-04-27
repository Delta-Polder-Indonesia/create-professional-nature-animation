import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface VillageSceneProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

export default function VillageScene({ timeOfDay, weather }: VillageSceneProps) {
  const isRainy = weather === "rain" || weather === "storm";
  const isCloudy = weather === "cloudy" || weather === "fog";
  const isNight = timeOfDay > 0.75;

  const skyColors = () => {
    if (isRainy) return "from-slate-700 via-slate-600 to-slate-500";
    if (isCloudy) return "from-gray-400 via-gray-300 to-blue-200";
    if (timeOfDay < 0.2) return "from-orange-300 via-pink-200 to-blue-200";
    if (timeOfDay < 0.7) return "from-sky-400 via-blue-300 to-blue-100";
    if (timeOfDay < 0.85) return "from-purple-500 via-pink-400 to-orange-300";
    return "from-slate-900 via-indigo-900 to-slate-800";
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b ${skyColors()} transition-all duration-[2000ms]`} />

      {/* Stars */}
      {isNight && !isRainy && (
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 50}%` }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
      )}

      {/* Sun / Moon */}
      <motion.div
        className="absolute z-10"
        animate={{
          left: `${timeOfDay * 90 + 5}%`,
          top: `${10 + Math.sin(timeOfDay * Math.PI) * -15}%`,
          opacity: isNight ? 0 : 1,
        }}
        transition={{ duration: 1 }}
      >
        <div className={`w-20 h-20 rounded-full ${isCloudy ? 'bg-yellow-300/60' : 'bg-yellow-300'} shadow-[0_0_60px_20px_rgba(255,200,0,0.4)]`} />
      </motion.div>

      <motion.div
        className="absolute z-10"
        animate={{
          left: `${((timeOfDay + 0.5) % 1) * 90 + 5}%`,
          top: `${10 + Math.sin(((timeOfDay + 0.5) % 1) * Math.PI) * -15}%`,
          opacity: isNight ? 1 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <div className="w-14 h-14 rounded-full bg-gray-100 shadow-[0_0_30px_10px_rgba(255,255,255,0.15)]" />
      </motion.div>

      {/* Clouds */}
      <div className="absolute inset-0">
        {[...Array(isCloudy ? 12 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${5 + Math.random() * 20}%`, width: `${100 + Math.random() * 150}px`, height: "50px", opacity: isCloudy ? 0.9 : 0.4 }}
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 40 + Math.random() * 30, repeat: Infinity, delay: i * 6 }}
          >
            <svg viewBox="0 0 200 60" fill={isRainy ? "#64748b" : "#ffffff"} opacity="0.85">
              <ellipse cx="40" cy="35" rx="35" ry="22" />
              <ellipse cx="100" cy="25" rx="45" ry="28" />
              <ellipse cx="155" cy="35" rx="35" ry="22" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Birds */}
      {!isRainy && (
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: `${8 + i * 4}%` }}
              animate={{ left: ["-10%", "110%"], top: [`${8 + i * 4}%`, `${6 + i * 4}%`, `${10 + i * 4}%`] }}
              transition={{ duration: 25 + i * 5, repeat: Infinity, delay: i * 10 }}
            >
              <svg width="20" height="10" viewBox="0 0 40 20" fill="none" stroke={isNight ? "#555" : "#333"} strokeWidth="1.5" strokeLinecap="round">
                <motion.path d="M2 10 Q10 2 20 10 Q30 2 38 10" animate={{ d: ["M2 10 Q10 2 20 10 Q30 2 38 10", "M2 10 Q10 18 20 10 Q30 18 38 10", "M2 10 Q10 2 20 10 Q30 2 38 10"] }} transition={{ duration: 0.4, repeat: Infinity }} />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Distant hills */}
      <div className="absolute bottom-[35%] left-0 right-0 h-[25%]">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,200 L0,100 Q200,40 400,100 Q600,20 800,90 Q1000,30 1200,100 Q1400,50 1440,100 L1440,200 Z" fill={isNight || isRainy ? "#2d4a2d" : "#4a7c59"} />
        </svg>
      </div>

      {/* Rice fields / terraces */}
      <div className="absolute bottom-[20%] left-0 right-0 h-[20%]">
        {[0, 1, 2, 3].map((layer) => (
          <div
            key={layer}
            className="absolute left-0 right-0"
            style={{
              bottom: `${layer * 22}%`,
              height: "25%",
              background: isNight
                ? `linear-gradient(180deg, rgba(20,${40 + layer * 10},20,0.9) 0%, rgba(15,${35 + layer * 10},15,0.95) 100%)`
                : `linear-gradient(180deg, rgba(60,${120 + layer * 15},60,0.9) 0%, rgba(50,${110 + layer * 15},50,0.95) 100%)`,
            }}
          >
            {/* Water reflection in rice field */}
            <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(100,180,220,0.3) 30%, rgba(100,180,220,0.3) 70%, transparent 100%)" }} />
          </div>
        ))}
      </div>

      {/* Traditional houses */}
      <div className="absolute bottom-[22%] left-[10%] z-20">
        <TraditionalHouse scale={1} isNight={isNight} isRainy={isRainy} />
      </div>
      <div className="absolute bottom-[20%] left-[30%] z-20">
        <TraditionalHouse scale={0.8} isNight={isNight} isRainy={isRainy} />
      </div>
      <div className="absolute bottom-[24%] right-[15%] z-20">
        <TraditionalHouse scale={0.9} isNight={isNight} isRainy={isRainy} />
      </div>
      <div className="absolute bottom-[18%] right-[35%] z-20">
        <TraditionalHouse scale={0.7} isNight={isNight} isRainy={isRainy} />
      </div>

      {/* Trees around village */}
      <div className="absolute bottom-[20%] left-[5%] z-10">
        <VillageTree scale={1.1} isNight={isNight} />
      </div>
      <div className="absolute bottom-[18%] right-[5%] z-10">
        <VillageTree scale={1.3} isNight={isNight} />
      </div>
      <div className="absolute bottom-[22%] left-[50%] z-10">
        <VillageTree scale={0.9} isNight={isNight} />
      </div>

      {/* Path */}
      <div className="absolute bottom-[15%] left-0 right-0 h-[8%]">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #C4A574 0%, #B8956A 50%, #A8855A 100%)" }} />
        {/* Path stones */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-2 rounded-full bg-stone-400/40"
            style={{ left: `${5 + i * 5}%`, top: `${30 + Math.random() * 40}%` }}
          />
        ))}
      </div>

      {/* Fence */}
      <div className="absolute bottom-[18%] left-[45%] right-[20%] z-15">
        <svg viewBox="0 0 400 30" className="w-full h-8">
          {[...Array(15)].map((_, i) => (
            <g key={i}>
              <rect x={i * 28} y="5" width="3" height="25" fill={isNight ? "#4a3728" : "#8B6914"} />
              {i < 14 && <rect x={i * 28 + 3} y="12" width="25" height="2" fill={isNight ? "#4a3728" : "#8B6914"} />}
            </g>
          ))}
        </svg>
      </div>

      {/* Smoke from chimney */}
      {!isRainy && (
        <div className="absolute bottom-[42%] left-[14%] z-30">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-white/20"
              animate={{
                y: [0, -30 - i * 10],
                x: [0, Math.sin(i) * 10],
                opacity: [0.4, 0],
                scale: [0.5, 1.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}
        </div>
      )}

      {/* Rain */}
      {isRainy && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          {[...Array(weather === "storm" ? 250 : 120)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-blue-200/30 rounded-full"
              style={{ left: `${Math.random() * 100}%`, height: `${12 + Math.random() * 15}px` }}
              animate={{ top: ["-5%", "105%"], x: [0, weather === "storm" ? -8 : -2] }}
              transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TraditionalHouse({ scale, isNight, isRainy }: { scale: number; isNight: boolean; isRainy: boolean }) {
  const wallColor = isNight ? "#5a4a3a" : "#D4A574";
  const roofColor = isNight ? "#3a2a1a" : "#8B4513";
  const windowGlow = isNight && !isRainy ? "#FFD93D" : "#4a3a2a";

  return (
    <svg width={100 * scale} height={80 * scale} viewBox="0 0 100 80">
      {/* House body */}
      <rect x="15" y="35" width="70" height="40" fill={wallColor} />
      {/* Roof */}
      <path d="M5 35 L50 5 L95 35 Z" fill={roofColor} />
      <path d="M8 33 L50 8 L92 33" fill="none" stroke={isNight ? "#2a1a0a" : "#6B3410"} strokeWidth="1" />
      {/* Door */}
      <rect x="42" y="50" width="16" height="25" rx="8" fill={isNight ? "#3a2a1a" : "#6B3410"} />
      {/* Window */}
      <rect x="22" y="45" width="14" height="14" fill={windowGlow} rx="2" />
      <rect x="22" y="45" width="14" height="14" fill="none" stroke={isNight ? "#3a2a1a" : "#6B3410"} strokeWidth="1" rx="2" />
      <line x1="29" y1="45" x2="29" y2="59" stroke={isNight ? "#3a2a1a" : "#6B3410"} strokeWidth="1" />
      <line x1="22" y1="52" x2="36" y2="52" stroke={isNight ? "#3a2a1a" : "#6B3410"} strokeWidth="1" />
      {/* Window 2 */}
      <rect x="64" y="45" width="14" height="14" fill={windowGlow} rx="2" />
      <rect x="64" y="45" width="14" height="14" fill="none" stroke={isNight ? "#3a2a1a" : "#6B3410"} strokeWidth="1" rx="2" />
      <line x1="71" y1="45" x2="71" y2="59" stroke={isNight ? "#3a2a1a" : "#6B3410"} strokeWidth="1" />
      <line x1="64" y1="52" x2="78" y2="52" stroke={isNight ? "#3a2a1a" : "#6B3410"} strokeWidth="1" />
      {/* Chimney */}
      <rect x="65" y="15" width="8" height="15" fill={isNight ? "#4a3a2a" : "#A0522D"} />
    </svg>
  );
}

function VillageTree({ scale, isNight }: { scale: number; isNight: boolean }) {
  const leafColor = isNight ? "#1a2f1a" : "#2d5a27";

  return (
    <motion.svg
      width={50 * scale}
      height={70 * scale}
      viewBox="0 0 50 70"
      animate={{ rotate: [-1, 1, -1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "bottom center" }}
    >
      <rect x="22" y="45" width="6" height="25" fill="#5D4037" />
      <circle cx="25" cy="30" r="18" fill={leafColor} />
      <circle cx="15" cy="38" r="12" fill={leafColor} />
      <circle cx="35" cy="38" r="12" fill={leafColor} />
      <circle cx="25" cy="18" r="14" fill={leafColor} />
    </motion.svg>
  );
}
