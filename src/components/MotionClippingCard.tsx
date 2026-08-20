"use client";

import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

interface MotionClippingCardProps {
  children: ReactNode;
  rotation?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function MotionClippingCard({
  children,
  rotation = 0,
  delay = 0,
  className = "",
  style = {},
}: MotionClippingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
