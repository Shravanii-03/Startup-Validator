import React from "react";
import { motion } from "motion/react";

interface PaperAirplaneProps {
  className?: string;
  size?: number;
  color?: string;
  floatDelay?: number;
  rotation?: number;
  showSparkles?: boolean;
}

export const PaperAirplane: React.FC<PaperAirplaneProps> = ({
  className = "",
  size = 28,
  color = "#D7FF3C",
  floatDelay = 0,
  rotation = 12,
  showSparkles = false,
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center relative ${className}`}
      initial={{ y: 0, rotate: rotation }}
      animate={{
        y: [-4, 6, -4],
        rotate: [rotation - 2, rotation + 3, rotation - 2],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
    >
      {showSparkles && (
        <span className="absolute -top-2 -right-2 text-[#F4B8E8] text-xs animate-pulse">
          ✨
        </span>
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <path
          d="M22 2L11 13"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 2L15 22L11 13L2 9L22 2Z"
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export const DottedTrail: React.FC<{
  pathD?: string;
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({
  pathD = "M 10 50 Q 150 10, 300 50 T 600 50",
  width = 600,
  height = 100,
  className = "",
  color = "#D7FF3C",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      <path
        d={pathD}
        stroke={color}
        strokeWidth="1.8"
        strokeDasharray="5 5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const CurvedDottedConnector: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`w-full overflow-hidden leading-none relative pointer-events-none ${className}`}>
      <svg
        className="w-full h-16 text-[#111111]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
          fill="currentColor"
        />
        <path
          d="M0,20 Q300,100 600,20 T1200,30"
          stroke="#D7FF3C"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeOpacity="0.4"
          fill="none"
        />
      </svg>
    </div>
  );
};
