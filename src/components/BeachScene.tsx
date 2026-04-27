import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface BeachSceneProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

export default function BeachScene({ timeOfDay, weather }: BeachSceneProps) {
  const isRainy = weather === "rain" || weather === "storm";
  const isCloudy = weather === "cloudy" || weather === "fog";

  const skyColors = () => {
    if (isRainy) return "from-slate-700 via-slate-600 to-slate-500";
    if (isCloudy) return "from-slate-400 via-slate-300 to-blue-200";
    if (timeOfDay < 0.2) return "from-orange-400 via-pink-300 to-blue-300";
    if (timeOfDay < 0.7) return "from-blue-400 via-cyan-300 to-blue-100";
    if (timeOfDay < 0.85) return "from-purple-600 via-pink-500 to-orange-400";
    return "from-slate-900 via-slate-800 to-indigo-900";
  };

  const sunColor = timeOfDay < 0.7 ? "bg-yellow-400" : timeOfDay < 0.85 ? "bg-orange-500" : "bg-yellow-100";
  const sunGlow = timeOfDay < 0.7 ? "shadow-yellow-400/50" : timeOfDay < 0.85 ? "shadow-orange-500/50" : "shadow-yellow-100/20";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b ${skyColors()} transition-all duration-[2000ms]`} />

      {/* Sun / Moon */}
      <motion.div
        className="absolute z-10"
        animate={{
          left: `${timeOfDay * 90 + 5}%`,
          top: `${15 + Math.sin(timeOfDay * Math.PI) * -20}%`,
          opacity: timeOfDay > 0.8 ? 0 : 1,
        }}
        transition={{ duration: 1 }}
      >
        <div className={`w-24 h-24 rounded-full ${sunColor} shadow-[0_0_80px_20px] ${sunGlow} ${isCloudy ? 'opacity-60' : ''}`} />
      </motion.div>

      {/* Moon */}
      <motion.div
        className="absolute z-10"
        animate={{
          left: `${((timeOfDay + 0.5) % 1) * 90 + 5}%`,
          top: `${15 + Math.sin(((timeOfDay + 0.5) % 1) * Math.PI) * -20}%`,
          opacity: timeOfDay > 0.7 ? 1 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-gray-100 shadow-[0_0_40px_10px_rgba(255,255,255,0.2)]">
          <div className="absolute w-3 h-3 rounded-full bg-gray-300/50 top-3 left-4" />
          <div className="absolute w-2 h-2 rounded-full bg-gray-300/40 top-6 left-8" />
          <div className="absolute w-4 h-4 rounded-full bg-gray-300/45 top-7 left-3" />
        </div>
      </motion.div>

      {/* Stars */}
      {timeOfDay > 0.75 && !isRainy && (
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      <div className="absolute inset-0">
        {[...Array(isCloudy ? 10 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${5 + Math.random() * 25}%`,
              width: `${120 + Math.random() * 200}px`,
              height: "60px",
              opacity: isCloudy ? 0.8 : 0.5,
            }}
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 30 + Math.random() * 30, repeat: Infinity, delay: i * 5 }}
          >
            <svg viewBox="0 0 200 60" fill={isRainy ? "#64748b" : "#ffffff"} opacity="0.8">
              <ellipse cx="50" cy="35" rx="40" ry="25" />
              <ellipse cx="100" cy="25" rx="50" ry="30" />
              <ellipse cx="150" cy="35" rx="40" ry="25" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Birds */}
      {!isRainy && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: `${10 + Math.random() * 20}%` }}
              animate={{ left: ["-10%", "110%"], top: [`${10 + i * 3}%`, `${8 + i * 3}%`, `${12 + i * 3}%`, `${10 + i * 3}%`] }}
              transition={{ duration: 20 + Math.random() * 15, repeat: Infinity, delay: i * 8 }}
            >
              <svg width="24" height="12" viewBox="0 0 40 20" fill="none" stroke={timeOfDay > 0.75 ? "#666" : "#333"} strokeWidth="1.5" strokeLinecap="round">
                <motion.path d="M2 10 Q10 2 20 10 Q30 2 38 10" animate={{ d: ["M2 10 Q10 2 20 10 Q30 2 38 10", "M2 10 Q10 18 20 10 Q30 18 38 10", "M2 10 Q10 2 20 10 Q30 2 38 10"] }} transition={{ duration: 0.4, repeat: Infinity }} />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Ocean */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%]">
        {/* Horizon */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

        {/* Ocean layers */}
        {[0, 1, 2, 3].map((layer) => (
          <motion.div
            key={layer}
            className="absolute w-[200%]"
            style={{
              bottom: `${layer * 8}%`,
              height: `${35 - layer * 5}%`,
              background: isRainy
                ? `linear-gradient(180deg, rgba(30,50,70,${0.4 + layer * 0.15}) 0%, rgba(20,40,60,${0.5 + layer * 0.15}) 100%)`
                : `linear-gradient(180deg, rgba(0,150,200,${0.3 + layer * 0.15}) 0%, rgba(0,100,180,${0.4 + layer * 0.15}) 100%)`,
            }}
            animate={{ x: layer % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: 5 + layer * 2, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
              <path
                d={`M0,50 Q180,${30 + layer * 10} 360,50 Q540,${70 - layer * 5} 720,50 Q900,${30 + layer * 10} 1080,50 Q1260,${70 - layer * 5} 1440,50 L1440,100 L0,100 Z`}
                fill={isRainy ? `rgba(30,50,70,${0.3 + layer * 0.1})` : `rgba(100,200,255,${0.2 + layer * 0.1})`}
              />
            </svg>
          </motion.div>
        ))}

        {/* Sparkles on water */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Sand beach */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%]">
        <div
          className="absolute inset-0"
          style={{
            background: isRainy
              ? "linear-gradient(180deg, #8B7355 0%, #7A6545 50%, #6B5535 100%)"
              : "linear-gradient(180deg, #E8D4A2 0%, #D4C08A 50%, #C4B07A 100%)",
          }}
        />
        {/* Sand texture dots */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-black/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Palm trees */}
      <div className="absolute bottom-[12%] left-[5%] z-20">
        <PalmTree scale={1.2} timeOfDay={timeOfDay} />
      </div>
      <div className="absolute bottom-[10%] right-[8%] z-20">
        <PalmTree scale={0.9} timeOfDay={timeOfDay} />
      </div>
      <div className="absolute bottom-[11%] left-[20%] z-20">
        <PalmTree scale={0.7} timeOfDay={timeOfDay} />
      </div>

      {/* Beach umbrella */}
      {!isRainy && (
        <div className="absolute bottom-[13%] left-[35%] z-20">
          <svg width="60" height="70" viewBox="0 0 60 70">
            <rect x="28" y="30" width="4" height="40" fill="#8B4513" />
            <path d="M5 30 Q30 5 55 30 Z" fill="#FF6B6B" />
            <path d="M5 30 Q18 18 30 30" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
            <path d="M30 30 Q42 18 55 30" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      )}

      {/* Rain */}
      {isRainy && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {[...Array(weather === "storm" ? 300 : 150)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-blue-200/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${15 + Math.random() * 20}px`,
              }}
              animate={{ top: ["-5%", "105%"], x: [0, weather === "storm" ? -10 : -3] }}
              transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PalmTree({ scale, timeOfDay }: { scale: number; timeOfDay: number }) {
  const leafColor = timeOfDay > 0.75 ? "#1a2f1a" : "#2d5a27";
  const trunkColor = timeOfDay > 0.75 ? "#3d2817" : "#8B6914";

  return (
    <motion.svg
      width={80 * scale}
      height={120 * scale}
      viewBox="0 0 80 120"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "bottom center" }}
    >
      {/* Trunk */}
      <path d="M38 120 Q35 80 40 40 Q42 20 40 10 L44 10 Q46 20 44 40 Q49 80 46 120 Z" fill={trunkColor} />
      {/* Trunk lines */}
      <path d="M39 110 Q40 100 41 90" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" fill="none" />
      <path d="M40 80 Q41 70 42 60" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" fill="none" />
      <path d="M41 50 Q42 40 43 30" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" fill="none" />

      {/* Leaves */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.path
          key={i}
          d={`M42 15 Q${42 + Math.cos((angle * Math.PI) / 180) * 35} ${15 + Math.sin((angle * Math.PI) / 180) * 15} ${42 + Math.cos((angle * Math.PI) / 180) * 50} ${15 + Math.sin((angle * Math.PI) / 180) * 25}`}
          fill="none"
          stroke={leafColor}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ d: [
            `M42 15 Q${42 + Math.cos((angle * Math.PI) / 180) * 35} ${15 + Math.sin((angle * Math.PI) / 180) * 15} ${42 + Math.cos((angle * Math.PI) / 180) * 50} ${15 + Math.sin((angle * Math.PI) / 180) * 25}`,
            `M42 15 Q${42 + Math.cos((angle * Math.PI) / 180) * 30} ${15 + Math.sin((angle * Math.PI) / 180) * 20} ${42 + Math.cos((angle * Math.PI) / 180) * 45} ${15 + Math.sin((angle * Math.PI) / 180) * 30}`,
            `M42 15 Q${42 + Math.cos((angle * Math.PI) / 180) * 35} ${15 + Math.sin((angle * Math.PI) / 180) * 15} ${42 + Math.cos((angle * Math.PI) / 180) * 50} ${15 + Math.sin((angle * Math.PI) / 180) * 25}`,
          ]}}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      {/* Coconuts */}
      <circle cx="38" cy="18" r="3" fill="#5D4037" />
      <circle cx="44" cy="20" r="3" fill="#5D4037" />
      <circle cx="41" cy="22" r="2.5" fill="#5D4037" />
    </motion.svg>
  );
}
