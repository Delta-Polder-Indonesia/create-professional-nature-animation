import { motion } from "framer-motion";
import { useMemo } from "react";

interface RainProps {
  intensity: "light" | "moderate" | "heavy" | "storm";
}

interface RainDrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  length: number;
  opacity: number;
}

export default function Rain({ intensity }: RainProps) {
  const drops = useMemo<RainDrop[]>(() => {
    const count =
      intensity === "light" ? 100 : intensity === "moderate" ? 200 : intensity === "heavy" ? 350 : 500;
    const result: RainDrop[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: intensity === "storm" ? 0.25 + Math.random() * 0.25 : 0.4 + Math.random() * 0.4,
        length: intensity === "storm" ? 30 + Math.random() * 25 : 18 + Math.random() * 18,
        opacity: intensity === "light" ? 0.3 + Math.random() * 0.3 : 0.5 + Math.random() * 0.4,
      });
    }
    return result;
  }, [intensity]);

  const windOffset = intensity === "storm" ? -15 : intensity === "heavy" ? -8 : -3;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute rounded-full"
          style={{
            left: `${drop.x}%`,
            width: intensity === "storm" ? "2px" : "1.5px",
            height: `${drop.length}px`,
            background: "linear-gradient(180deg, transparent 0%, rgba(180, 200, 220, 0.9) 30%, rgba(180, 200, 220, 0.5) 100%)",
            opacity: drop.opacity,
            borderRadius: "9999px",
          }}
          initial={{ top: "-8%", x: 0 }}
          animate={{
            top: ["-8%", "108%"],
            x: [0, windOffset, windOffset * 1.5],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Rain splash on ground */}
      {intensity !== "light" &&
        [...Array(40)].map((_, i) => (
          <motion.div
            key={`splash-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scaleX: [0, 1.5, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          >
            <div className="w-3 h-0.5 rounded-full bg-blue-200/40" />
          </motion.div>
        ))}

      {/* Lightning for storm */}
      {intensity === "storm" && <Lightning />}

      {/* Dark overlay for rain */}
      <motion.div
        className="absolute inset-0 bg-black/10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Lightning() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`lightning-${i}`}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(200,220,255,0.05) 50%, transparent 100%)",
          }}
          animate={{
            opacity: [0, 0, 0.9, 0, 0, 0.5, 0, 0, 0, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 4 + Math.random() * 8,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Lightning bolt SVG */}
      <LightningBolt />
    </>
  );
}

function LightningBolt() {
  return (
    <motion.svg
      className="absolute top-[5%] left-[40%] w-20 h-40 opacity-0"
      viewBox="0 0 40 80"
      fill="none"
      animate={{
        opacity: [0, 0, 0, 0.9, 0, 0, 0, 0.7, 0, 0],
        x: [0, -2, 2, -1, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay: 3,
        ease: "easeOut",
      }}
    >
      <path
        d="M25 0 L10 35 L22 35 L8 80 L30 40 L18 40 L25 0 Z"
        fill="rgba(255,255,255,0.9)"
        stroke="rgba(200,220,255,0.5)"
        strokeWidth="0.5"
      />
    </motion.svg>
  );
}
