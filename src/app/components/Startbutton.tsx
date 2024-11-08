"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function FlashyButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className="relative overflow-hidden px-6 py-3 rounded-full text-white font-bold text-lg"
      style={{
        background: "linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)",
        backgroundSize: "400% 400%",
      }}
      animate={{
        backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
      }}
      transition={{
        duration: 5,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <span className="relative z-10">Start</span>
      <motion.div
        className="absolute inset-0 bg-white opacity-20"
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </motion.button>
  )
}