import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Sun, Moon, CloudRain, Cloud, CloudLightning, CloudFog, Snowflake, Mountain, TreePine, Home, Waves } from "lucide-react";
import { useWeather, useRealTime } from "../hooks/useWeather";
import type { WeatherCondition } from "../hooks/useWeather";
import { useMoonPhase } from "../hooks/useMoonPhase";
import Sky from "./Sky";
import Stars from "./Stars";
import SunMoon from "./SunMoon";
import Clouds from "./Clouds";
import Birds from "./Birds";
import Mountains from "./Mountains";
import Trees from "./Trees";
import Water from "./Water";
import Foreground from "./Foreground";
import Rain from "./Rain";
import Fog from "./Fog";
import BeachScene from "./BeachScene";
import VillageScene from "./VillageScene";
import ForestScene from "./ForestScene";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
}

type SceneType = "mountain" | "beach" | "village" | "forest";

const weatherIcons: Record<WeatherCondition, React.ReactNode> = {
  clear: <Sun className="w-3.5 h-3.5" />,
  cloudy: <Cloud className="w-3.5 h-3.5" />,
  rain: <CloudRain className="w-3.5 h-3.5" />,
  storm: <CloudLightning className="w-3.5 h-3.5" />,
  fog: <CloudFog className="w-3.5 h-3.5" />,
  snow: <Snowflake className="w-3.5 h-3.5" />,
};

const weatherLabels: Record<WeatherCondition, string> = {
  clear: "Cerah",
  cloudy: "Berawan",
  rain: "Hujan",
  storm: "Badai",
  fog: "Kabut",
  snow: "Salju",
};

const sceneConfig: Record<SceneType, { label: string; icon: React.ReactNode }> = {
  mountain: { label: "Gunung", icon: <Mountain className="w-3.5 h-3.5" /> },
  beach: { label: "Pantai", icon: <Waves className="w-3.5 h-3.5" /> },
  village: { label: "Pedesaan", icon: <Home className="w-3.5 h-3.5" /> },
  forest: { label: "Hutan", icon: <TreePine className="w-3.5 h-3.5" /> },
};

export default function Scene() {
  const { timeOfDay, timeLabel, hour, minute } = useRealTime();
  const weather = useWeather();
  const [isPlaying, setIsPlaying] = useState(false);
  const [manualTime, setManualTime] = useState<number | null>(null);
  const [activeScene, setActiveScene] = useState<SceneType>("mountain");
  const [showControls, setShowControls] = useState(false);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const shootingStarIdRef = useRef(0);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const effectiveTimeOfDay = manualTime !== null ? manualTime : timeOfDay;
  const effectiveWeather = weather.condition;
  const moonPhase = useMoonPhase();

  // Auto-hide controls
  const showControlsTemp = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 5000);
  };

  useEffect(() => {
    const handleMouseMove = () => showControlsTemp();
    const handleClick = () => showControlsTemp();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    showControlsTemp();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Shooting stars
  useEffect(() => {
    if (effectiveTimeOfDay <= 0.75 || effectiveWeather === "rain" || effectiveWeather === "storm") {
      setShootingStars([]);
      return;
    }
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newStar: ShootingStar = {
          id: shootingStarIdRef.current++,
          x: Math.random() * 80 + 5,
          y: Math.random() * 25 + 5,
        };
        setShootingStars((prev) => [...prev.slice(-2), newStar]);
        setTimeout(() => {
          setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
        }, 2000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [effectiveTimeOfDay, effectiveWeather]);

  // Auto-play demo
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setManualTime((prev) => {
        if (prev === null) return 0.001;
        const next = prev + 0.0005;
        return next >= 1 ? 0 : next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getTimeIcon = () => {
    if (effectiveTimeOfDay < 0.65) return <Sun className="w-4 h-4" />;
    return <Moon className="w-4 h-4" />;
  };

  const formatTime = () => {
    if (manualTime !== null) {
      const h = Math.floor(manualTime * 24);
      const m = Math.floor((manualTime * 24 * 60) % 60);
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    }
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  const getRainIntensity = (): "light" | "moderate" | "heavy" | "storm" => {
    if (effectiveWeather === "storm") return "storm";
    if (effectiveWeather === "rain") return "moderate";
    return "light";
  };

  const renderScene = () => {
    switch (activeScene) {
      case "beach":
        return <BeachScene timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />;
      case "village":
        return <VillageScene timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />;
      case "forest":
        return <ForestScene timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />;
      default:
        return (
          <>
            <Sky timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <Stars timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <SunMoon timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} moonPhase={moonPhase} />
            <Clouds timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <Birds timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <Mountains timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <Trees timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <Water timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <Foreground timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
            <Fog timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />
          </>
        );
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseMove={showControlsTemp}
    >
      {/* Scene layers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScene}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* Rain overlay */}
      {activeScene === "mountain" && (effectiveWeather === "rain" || effectiveWeather === "storm") && (
        <Rain intensity={getRainIntensity()} />
      )}

      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute z-10"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{ opacity: 0, x: 150, y: 80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div
              className="w-1 h-1 rounded-full bg-white"
              style={{ boxShadow: "0 0 10px 2px rgba(255,255,255,0.9), 0 0 20px 4px rgba(255,255,255,0.4)" }}
            />
            <motion.div
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-white to-transparent"
              style={{ width: "60px", transformOrigin: "left center" }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Top-right: Minimal Clock & Weather */}
      <motion.div
        className="absolute top-4 right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-3">
          {/* Time */}
          <div className="flex items-center gap-1.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={effectiveTimeOfDay < 0.65 ? "sun" : "moon"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-white/70"
              >
                {getTimeIcon()}
              </motion.div>
            </AnimatePresence>
            <span className="text-white/80 font-semibold text-sm tabular-nums">{formatTime()}</span>
            <span className="text-white/40 text-xs">{timeLabel}</span>
          </div>

          <div className="w-px h-4 bg-white/15" />

          {/* Weather */}
          {weather.isLoading ? (
            <div className="w-3 h-3 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          ) : weather.error ? null : (
            <div className="flex items-center gap-2">
              <span className="text-white/60">{weatherIcons[effectiveWeather]}</span>
              <span className="text-white/60 text-xs">{weatherLabels[effectiveWeather]}</span>
              <span className="text-white/40 text-xs">{weather.temperature}°C</span>
              <span className="text-white/30 text-xs hidden sm:inline">{weather.location}</span>
            </div>
          )}

          <div className="w-px h-4 bg-white/15" />

          {/* Moon Phase */}
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 32 32" className="text-white/50">
              <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.3" />
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
            <span className="text-white/40 text-xs">{moonPhase.phase}</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Controls Panel - Auto hide */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-50 pb-4 pt-8"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => {
              if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
              setShowControls(true);
            }}
          >
            <div className="flex flex-col items-center gap-3">
              {/* Scene selector - 4 items horizontal */}
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-xl px-2 py-1.5">
                {(Object.keys(sceneConfig) as SceneType[]).map((scene) => (
                  <button
                    key={scene}
                    onClick={() => setActiveScene(scene)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeScene === scene
                        ? "bg-white/25 text-white"
                        : "text-white/50 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {sceneConfig[scene].icon}
                    {sceneConfig[scene].label}
                  </button>
                ))}
              </div>

              {/* Time presets - 3x2 grid */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    if (!isPlaying) setManualTime(null);
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white/80"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => {
                    setManualTime(null);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    manualTime === null && !isPlaying
                      ? "bg-white/25 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Real-time
                </button>

                <div className="w-px h-5 bg-white/15" />

                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "Fajar", value: 0.08 },
                    { label: "Pagi", value: 0.25 },
                    { label: "Siang", value: 0.45 },
                    { label: "Sore", value: 0.6 },
                    { label: "Senja", value: 0.72 },
                    { label: "Malam", value: 0.9 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setManualTime(preset.value);
                        setIsPlaying(false);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all min-w-[60px] text-center ${
                        manualTime !== null && Math.abs(manualTime - preset.value) < 0.02
                          ? "bg-white/25 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thin progress bar at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400/60 via-orange-400/60 to-purple-500/60"
          style={{ width: `${effectiveTimeOfDay * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
