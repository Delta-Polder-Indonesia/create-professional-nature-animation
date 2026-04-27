import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface ForestSceneProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

export default function ForestScene({ timeOfDay, weather }: ForestSceneProps) {
  const isRainy = weather === "rain" || weather === "storm";
  const isCloudy = weather === "cloudy" || weather === "fog";
  const isNight = timeOfDay > 0.75;

  const skyColors = () => {
    if (isRainy) return "from-slate-800 via-slate-700 to-slate-600";
    if (isCloudy) return "from-emerald-800/60 via-teal-700/50 to-sky-300/60";
    if (timeOfDay < 0.2) return "from-amber-200/80 via-orange-100/60 to-emerald-100/40";
    if (timeOfDay < 0.7) return "from-sky-300 via-cyan-200 to-emerald-100";
    if (timeOfDay < 0.85) return "from-amber-700/80 via-orange-500/60 to-emerald-800/40";
    return "from-slate-950 via-emerald-950 to-slate-900";
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b ${skyColors()} transition-all duration-[2000ms]`} />

      {/* Sun rays through trees */}
      {!isNight && !isRainy && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 w-1 bg-gradient-to-b from-yellow-200/20 to-transparent"
              style={{
                left: `${10 + i * 12}%`,
                height: "60%",
                transform: `rotate(${-15 + i * 3}deg)`,
                transformOrigin: "top center",
              }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
      )}

      {/* Stars */}
      {isNight && !isRainy && (
        <div className="absolute inset-0">
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%` }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
      )}

      {/* Moon */}
      <motion.div
        className="absolute z-10"
        animate={{
          left: `${((timeOfDay + 0.5) % 1) * 80 + 10}%`,
          top: `${5 + Math.sin(((timeOfDay + 0.5) % 1) * Math.PI) * -10}%`,
          opacity: isNight ? 1 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <div className="w-12 h-12 rounded-full bg-gray-100 shadow-[0_0_30px_10px_rgba(255,255,255,0.15)]">
          <div className="absolute w-2 h-2 rounded-full bg-gray-300/50 top-2 left-3" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-gray-300/40 top-5 left-6" />
          <div className="absolute w-3 h-3 rounded-full bg-gray-300/45 top-5 left-2" />
        </div>
      </motion.div>

      {/* Fog/mist at ground level */}
      {(isCloudy || timeOfDay < 0.2) && (
        <div className="absolute bottom-0 left-0 right-0 h-[30%] z-20">
          {[0, 1, 2].map((layer) => (
            <motion.div
              key={layer}
              className="absolute w-[200%] h-full"
              style={{ bottom: `${layer * 5}%`, opacity: 0.15 - layer * 0.03 }}
              animate={{ x: layer % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
              transition={{ duration: 25 + layer * 10, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
                <path d={`M0,50 Q360,${20 + layer * 15} 720,50 Q1080,${80 - layer * 15} 1440,50 L1440,100 L0,100 Z`} fill="white" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Background trees (silhouettes) */}
      <div className="absolute bottom-[25%] left-0 right-0 h-[40%] z-10">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full h-full">
          {[...Array(25)].map((_, i) => {
            const x = i * 60 + Math.random() * 30;
            const h = 120 + Math.random() * 100;
            return (
              <g key={i}>
                <rect x={x + 8} y={300 - h * 0.3} width="6" height={h * 0.3} fill={isNight ? "#0d1f0d" : "#1a3a1a"} />
                <polygon
                  points={`${x},${300 - h * 0.3} ${x + 11},${300 - h} ${x + 22},${300 - h * 0.3}`}
                  fill={isNight ? "#0d1f0d" : "#1a3a1a"}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mid-ground trees */}
      <div className="absolute bottom-[15%] left-0 right-0 h-[35%] z-15">
        <svg viewBox="0 0 1440 250" preserveAspectRatio="none" className="w-full h-full">
          {[...Array(15)].map((_, i) => {
            const x = i * 100 + Math.random() * 40;
            const h = 100 + Math.random() * 80;
            return (
              <g key={i}>
                <rect x={x + 12} y={250 - h * 0.25} width="8" height={h * 0.25} fill={isNight ? "#142814" : "#2a4a2a"} />
                <ellipse cx={x + 16} cy={250 - h * 0.6} rx="25" ry="45" fill={isNight ? "#142814" : "#2a4a2a"} />
                <ellipse cx={x + 8} cy={250 - h * 0.5} rx="18" ry="35" fill={isNight ? "#142814" : "#2a4a2a"} />
                <ellipse cx={x + 24} cy={250 - h * 0.5} rx="18" ry="35" fill={isNight ? "#142814" : "#2a4a2a"} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Foreground big trees */}
      <div className="absolute bottom-[5%] left-[-5%] z-20">
        <BigTree scale={1.3} isNight={isNight} />
      </div>
      <div className="absolute bottom-[3%] right-[-3%] z-20">
        <BigTree scale={1.5} isNight={isNight} />
      </div>
      <div className="absolute bottom-[8%] left-[20%] z-20">
        <BigTree scale={1} isNight={isNight} />
      </div>
      <div className="absolute bottom-[6%] right-[25%] z-20">
        <BigTree scale={0.9} isNight={isNight} />
      </div>

      {/* Forest floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[12%] z-10">
        <div className="absolute inset-0" style={{ background: isNight ? "#0d1f0d" : "#2d4a1d" }} />
        {/* Grass */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute bottom-full w-full h-6">
          <motion.path
            d="M0,60 L0,30 Q20,10 40,30 Q60,5 80,30 Q100,15 120,30 Q140,8 160,30 Q180,12 200,30 Q220,6 240,30 Q260,14 280,30 Q300,7 320,30 Q340,11 360,30 Q380,5 400,30 Q420,13 440,30 Q460,9 480,30 Q500,6 520,30 Q540,15 560,30 Q580,8 600,30 Q620,12 640,30 Q660,5 680,30 Q700,14 720,30 Q740,7 760,30 Q780,11 800,30 Q820,6 840,30 Q860,13 880,30 Q900,9 920,30 Q940,5 960,30 Q980,15 1000,30 Q1020,8 1040,30 Q1060,12 1080,30 Q1100,6 1120,30 Q1140,14 1160,30 Q1180,7 1200,30 Q1220,11 1240,30 Q1260,5 1280,30 Q1300,13 1320,30 Q1340,9 1360,30 Q1380,6 1400,30 Q1420,15 1440,30 L1440,60 Z"
            fill={isNight ? "#0d1f0d" : "#2d4a1d"}
            animate={{ d: [
              "M0,60 L0,30 Q20,10 40,30 Q60,5 80,30 Q100,15 120,30 Q140,8 160,30 Q180,12 200,30 Q220,6 240,30 Q260,14 280,30 Q300,7 320,30 Q340,11 360,30 Q380,5 400,30 Q420,13 440,30 Q460,9 480,30 Q500,6 520,30 Q540,15 560,30 Q580,8 600,30 Q620,12 640,30 Q660,5 680,30 Q700,14 720,30 Q740,7 760,30 Q780,11 800,30 Q820,6 840,30 Q860,13 880,30 Q900,9 920,30 Q940,5 960,30 Q980,15 1000,30 Q1020,8 1040,30 Q1060,12 1080,30 Q1100,6 1120,30 Q1140,14 1160,30 Q1180,7 1200,30 Q1220,11 1240,30 Q1260,5 1280,30 Q1300,13 1320,30 Q1340,9 1360,30 Q1380,6 1400,30 Q1420,15 1440,30 L1440,60 Z",
              "M0,60 L0,30 Q20,5 40,30 Q60,10 80,30 Q100,8 120,30 Q140,12 160,30 Q180,6 200,30 Q220,14 240,30 Q260,7 280,30 Q300,11 320,30 Q340,5 360,30 Q380,13 400,30 Q420,9 440,30 Q460,6 480,30 Q500,15 520,30 Q540,8 560,30 Q580,12 600,30 Q620,5 640,30 Q660,14 680,30 Q700,7 720,30 Q740,11 760,30 Q780,6 800,30 Q820,13 840,30 Q860,9 880,30 Q900,5 920,30 Q940,15 960,30 Q980,8 1000,30 Q1020,12 1040,30 Q1060,6 1080,30 Q1100,14 1120,30 Q1140,7 1160,30 Q1180,11 1200,30 Q1220,5 1240,30 Q1260,13 1280,30 Q1300,9 1320,30 Q1340,6 1360,30 Q1380,15 1400,30 Q1420,8 1440,30 L1440,60 Z",
              "M0,60 L0,30 Q20,10 40,30 Q60,5 80,30 Q100,15 120,30 Q140,8 160,30 Q180,12 200,30 Q220,6 240,30 Q260,14 280,30 Q300,7 320,30 Q340,11 360,30 Q380,5 400,30 Q420,13 440,30 Q460,9 480,30 Q500,6 520,30 Q540,15 560,30 Q580,8 600,30 Q620,12 640,30 Q660,5 680,30 Q700,14 720,30 Q740,7 760,30 Q780,11 800,30 Q820,6 840,30 Q860,13 880,30 Q900,9 920,30 Q940,5 960,30 Q980,15 1000,30 Q1020,8 1040,30 Q1060,12 1080,30 Q1100,6 1120,30 Q1140,14 1160,30 Q1180,7 1200,30 Q1220,11 1240,30 Q1260,5 1280,30 Q1300,13 1320,30 Q1340,9 1360,30 Q1380,6 1400,30 Q1420,15 1440,30 L1440,60 Z",
            ]}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        {/* Mushrooms */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute bottom-2" style={{ left: `${5 + i * 12}%` }}>
            <svg width="12" height="14" viewBox="0 0 12 14">
              <rect x="4" y="6" width="4" height="8" fill="#F5DEB3" />
              <path d="M0 6 Q6 -2 12 6 Z" fill={i % 2 === 0 ? "#DC143C" : "#FF6347"} />
              {i % 3 === 0 && <circle cx="3" cy="3" r="1" fill="white" opacity="0.7" />}
              {i % 3 === 0 && <circle cx="8" cy="4" r="0.8" fill="white" opacity="0.7" />}
            </svg>
          </div>
        ))}
      </div>

      {/* Butterflies / Fireflies */}
      {!isRainy && (
        <div className="absolute inset-0 z-25 pointer-events-none">
          {[...Array(isNight ? 20 : 8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${30 + Math.random() * 50}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
                opacity: isNight ? [0, 1, 0] : [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            >
              {isNight ? (
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_6px_2px_rgba(255,255,0,0.6)]" />
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <ellipse cx="3" cy="6" rx="3" ry="5" fill="#FF6B9D" opacity="0.7" />
                  <ellipse cx="9" cy="6" rx="3" ry="5" fill="#FF6B9D" opacity="0.7" />
                  <rect x="5" y="4" width="2" height="4" fill="#333" rx="1" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Rain */}
      {isRainy && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          {[...Array(weather === "storm" ? 350 : 180)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${10 + Math.random() * 15}px`,
                background: "linear-gradient(180deg, transparent 0%, rgba(180,200,220,0.5) 100%)",
              }}
              animate={{ top: ["-5%", "105%"], x: [0, weather === "storm" ? -12 : -4] }}
              transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      )}

      {/* Lightning for storm */}
      {weather === "storm" && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 bg-white/5 z-50"
              animate={{ opacity: [0, 0, 0.8, 0, 0, 0.4, 0, 0] }}
              transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, delay: i * 5 + Math.random() * 5 }}
            />
          ))}
        </>
      )}
    </div>
  );
}

function BigTree({ scale, isNight }: { scale: number; isNight: boolean }) {
  const trunkColor = isNight ? "#1a0f0a" : "#4a3728";
  const leafColor = isNight ? "#0a1a0a" : "#1a3a1a";
  const leafHighlight = isNight ? "#0d1f0d" : "#2a5a2a";

  return (
    <motion.svg
      width={100 * scale}
      height={180 * scale}
      viewBox="0 0 100 180"
      animate={{ rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "bottom center" }}
    >
      {/* Main trunk */}
      <path d="M45 180 Q40 120 42 80 Q44 40 48 10 L52 10 Q54 40 56 80 Q58 120 55 180 Z" fill={trunkColor} />
      {/* Trunk texture */}
      <path d="M46 160 Q48 140 47 120" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
      <path d="M50 100 Q52 80 51 60" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
      <path d="M48 50 Q50 35 49 20" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />

      {/* Branches */}
      <path d="M48 70 Q30 55 20 45" stroke={trunkColor} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M50 60 Q70 45 80 35" stroke={trunkColor} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M49 40 Q35 25 25 15" stroke={trunkColor} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M51 35 Q65 20 75 10" stroke={trunkColor} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Leaves clusters */}
      <g fill={leafColor}>
        <ellipse cx="20" cy="40" rx="18" ry="22" />
        <ellipse cx="80" cy="30" rx="20" ry="25" />
        <ellipse cx="25" cy="10" rx="15" ry="18" />
        <ellipse cx="75" cy="5" rx="16" ry="20" />
        <ellipse cx="50" cy="5" rx="22" ry="18" />
        <ellipse cx="50" cy="-10" rx="18" ry="15" />
        <ellipse cx="10" cy="25" rx="14" ry="18" />
        <ellipse cx="90" cy="20" rx="15" ry="20" />
      </g>
      <g fill={leafHighlight} opacity="0.5">
        <ellipse cx="22" cy="38" rx="12" ry="15" />
        <ellipse cx="78" cy="28" rx="14" ry="18" />
        <ellipse cx="48" cy="3" rx="16" ry="12" />
      </g>
    </motion.svg>
  );
}
