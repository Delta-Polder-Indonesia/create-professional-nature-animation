import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";
import type { MoonPhaseData } from "../hooks/useMoonPhase";

interface SunMoonProps {
  timeOfDay: number;
  weather: WeatherCondition;
  moonPhase: MoonPhaseData;
}

export default function SunMoon({ timeOfDay, weather, moonPhase }: SunMoonProps) {
  const isCloudy = weather === "cloudy" || weather === "rain" || weather === "storm" || weather === "fog";
  const isRainy = weather === "rain" || weather === "storm";

  // Sun: realistic arc - rises from left (east), peaks at noon, sets at right (west)
  // timeOfDay 0 = midnight, 0.25 = sunrise, 0.5 = noon, 0.75 = sunset, 1 = midnight
  const sunVisible = timeOfDay > 0.2 && timeOfDay < 0.8;
  const sunProgress = (timeOfDay - 0.2) / 0.6; // 0 at sunrise, 1 at sunset
  const sunX = sunVisible ? sunProgress * 100 : -20;
  const sunY = sunVisible
    ? 70 - Math.sin(sunProgress * Math.PI) * 65 // arc from horizon up to zenith
    : 100;

  // Moon: opposite of sun, with real phase
  const moonVisible = timeOfDay < 0.25 || timeOfDay > 0.75;
  let moonProgress: number;
  if (timeOfDay > 0.75) {
    moonProgress = (timeOfDay - 0.75) / 0.5; // evening to midnight
  } else {
    moonProgress = (timeOfDay + 0.25) / 0.5; // midnight to sunrise
  }
  const moonX = moonVisible ? moonProgress * 100 : -20;
  const moonY = moonVisible
    ? 70 - Math.sin(moonProgress * Math.PI) * 65
    : 100;

  const sunOpacity = sunVisible
    ? 1 - Math.max(0, Math.abs(timeOfDay - 0.5) - 0.25) / 0.1
    : 0;
  const moonOpacity = moonVisible ? 1 : 0;

  return (
    <>
      {/* Sun */}
      <motion.div
        className="absolute z-10"
        animate={{
          left: `${sunX}%`,
          top: `${sunY}%`,
          opacity: isCloudy && !isRainy ? sunOpacity * 0.5 : sunOpacity,
        }}
        transition={{ duration: 0.5, ease: "linear" }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* Sun glow layers */}
        <motion.div
          className="absolute -inset-20 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,200,50,0.12) 0%, rgba(255,150,0,0.04) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-12 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,200,50,0.2) 0%, rgba(255,150,0,0.06) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Sun body */}
        <motion.div
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #FFF9C4 0%, #FFEB3B 30%, #FFC107 60%, #FF8F00 100%)",
            boxShadow: "0 0 50px rgba(255, 200, 50, 0.5), 0 0 100px rgba(255, 150, 0, 0.25), inset 0 0 20px rgba(255, 255, 200, 0.3)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Sun rays */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 bg-yellow-200/40 rounded-full"
              style={{
                height: "150%",
                left: "50%",
                top: "-25%",
                transformOrigin: "center",
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
              }}
              animate={{ opacity: [0.25, 0.6, 0.25], scaleY: [0.9, 1.15, 0.9] }}
              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Moon */}
      <motion.div
        className="absolute z-10"
        animate={{
          left: `${moonX}%`,
          top: `${moonY}%`,
          opacity: isCloudy && !isRainy ? moonOpacity * 0.4 : moonOpacity,
        }}
        transition={{ duration: 0.5, ease: "linear" }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* Moon glow */}
        <motion.div
          className="absolute -inset-10 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(200,200,220,0.12) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Moon body with phase */}
        <div
          className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden"
          style={{
            background: "#1a1a2e",
            boxShadow: "0 0 30px rgba(200, 200, 220, 0.3), 0 0 60px rgba(150, 150, 180, 0.15)",
          }}
        >
          {/* Base moon (always visible lit part) */}
          <div className="absolute inset-0 rounded-full" style={{
            background: "radial-gradient(circle at 35% 35%, #F5F5F5 0%, #E0E0E0 50%, #BDBDBD 100%)"
          }} />
          
          {/* Moon craters */}
          <div className="absolute w-3 h-3 rounded-full bg-gray-400/40 top-2 left-3" />
          <div className="absolute w-2 h-2 rounded-full bg-gray-400/30 top-5 left-6" />
          <div className="absolute w-3.5 h-3.5 rounded-full bg-gray-400/35 top-6 left-2" />
          <div className="absolute w-2 h-2 rounded-full bg-gray-400/25 top-3 left-7" />

          {/* Phase shadow overlay */}
          <MoonPhaseShadow phaseValue={moonPhase.phaseValue} />
        </div>

        {/* Moon phase label */}
        {moonOpacity > 0.5 && (
          <motion.div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-white/40 text-[10px] font-medium">
              {moonPhase.phase}
            </span>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

function MoonPhaseShadow({ phaseValue }: { phaseValue: number }) {
  // phaseValue: 0 = new moon, 0.5 = full moon, 1 = new moon
  const p = phaseValue % 1;
  
  // Calculate shadow position and shape
  // Waxing: shadow moves from right to left
  // Waning: shadow moves from left to right
  
  let shadowStyle: React.CSSProperties = {};
  
  if (p < 0.02 || p > 0.98) {
    // New moon - almost full shadow
    shadowStyle = { background: "rgba(0,0,0,0.85)" };
  } else if (p >= 0.48 && p <= 0.52) {
    // Full moon - no shadow
    shadowStyle = { display: "none" };
  } else {
    const isWaxing = p < 0.5;
    const progress = isWaxing ? p / 0.5 : (p - 0.5) / 0.5;
    
    if (isWaxing) {
      if (progress < 0.5) {
        // Waxing crescent: shadow on right
        const width = 100 - progress * 2 * 100;
        shadowStyle = {
          background: `linear-gradient(to left, rgba(0,0,0,0.85) ${width}%, transparent ${width}%)`,
        };
      } else {
        // Waxing gibbous: shadow on right, smaller
        const width = (1 - progress) * 2 * 100;
        shadowStyle = {
          background: `linear-gradient(to left, transparent ${width}%, rgba(0,0,0,0.85) ${width}%)`,
        };
      }
    } else {
      if (progress < 0.5) {
        // Waning gibbous: shadow on left
        const width = 100 - progress * 2 * 100;
        shadowStyle = {
          background: `linear-gradient(to right, rgba(0,0,0,0.85) ${width}%, transparent ${width}%)`,
        };
      } else {
        // Waning crescent: shadow on left, smaller
        const width = (1 - progress) * 2 * 100;
        shadowStyle = {
          background: `linear-gradient(to right, transparent ${width}%, rgba(0,0,0,0.85) ${width}%)`,
        };
      }
    }
  }

  return (
    <div 
      className="absolute inset-0 rounded-full"
      style={shadowStyle}
    />
  );
}
