"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import LunaChatbot from "./LunaChatbot"

export default function LunaButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isWaving, setIsWaving] = useState(false)

  useEffect(() => {
    // Delay the appearance of the button for a better UX
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    // Periodically trigger the waving animation
    const waveInterval = setInterval(() => {
      setIsWaving(true)
      setTimeout(() => setIsWaving(false), 3000)
    }, 20000)

    return () => {
      clearTimeout(timer)
      clearInterval(waveInterval)
    }
  }, [])

  // Initial wave animation after button appears
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsWaving(true)
        setTimeout(() => setIsWaving(false), 3000)
      }, 1000)
    }
  }, [isVisible])

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={toggleChatbot}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-20 h-20 rounded-full shadow-lg overflow-visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Outer orbital rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 w-20 h-20"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1 opacity-60" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 translate-y-1 opacity-60" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 w-20 h-20"
              >
                <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full transform -translate-y-1/2 -translate-x-1 opacity-70" />
                <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-pink-400 rounded-full transform -translate-y-1/2 translate-x-1 opacity-70" />
              </motion.div>

              {/* Multiple glowing layers */}
              <div className="absolute inset-2 rounded-full">
                {/* Outer glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 blur-md"
                />

                {/* Middle glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 blur-sm"
                />

                {/* Inner glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 blur-xs"
                />
              </div>

              {/* Main button background */}
              <div
                className="absolute inset-2 rounded-full overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${
                    isHovered ? "#6366f1" : "#4f46e5"
                  } 0%, ${isHovered ? "#8b5cf6" : "#7c3aed"} 50%, ${isHovered ? "#06b6d4" : "#0891b2"} 100%)`,
                  backgroundSize: isHovered ? "200% 200%" : "100% 100%",
                  animation: isHovered ? "gradientShift 2s ease infinite" : "none",
                }}
              >
                {/* Animated particles inside button */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        x: [0, Math.random() * 40 - 20, 0],
                        y: [0, Math.random() * 40 - 20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Pulsing ring effects */}
              <AnimatePresence>
                {(isHovered || isWaving) && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.4, scale: 1.4 }}
                      exit={{ opacity: 0, scale: 1.6 }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                      className="absolute inset-0 rounded-full border-2 border-white"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.3, scale: 1.6 }}
                      exit={{ opacity: 0, scale: 1.8 }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.3 }}
                      className="absolute inset-0 rounded-full border border-cyan-300"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.2, scale: 1.8 }}
                      exit={{ opacity: 0, scale: 2.0 }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.6 }}
                      className="absolute inset-0 rounded-full border border-purple-300"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Luna logo with enhanced effects */}
              <div className="absolute inset-0 flex items-center justify-center overflow-visible z-10">
                <motion.div
                  animate={isWaving ? { rotate: [0, 15, -5, 15, 0], scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Logo glow effect */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(99, 102, 241, 0.5)",
                        "0 0 30px rgba(139, 92, 246, 0.7)",
                        "0 0 20px rgba(99, 102, 241, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-inner relative"
                  >
                    <Image src="/images/luna-logo.png" alt="Luna AI Assistant" fill className="object-cover" />

                    {/* Holographic overlay */}
                    <motion.div
                      animate={{
                        background: [
                          "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                          "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.2) 60%, transparent 80%)",
                          "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-0"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Speech bubble for "Hi" animation */}
              <AnimatePresence>
                {isWaving && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-12 right-0 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border-2 border-purple-300"
                  >
                    <motion.p
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    >
                      Hi! 👋
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Enhanced label that appears on hover */}
            <AnimatePresence>
              {isHovered && !isWaving && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-6 right-24 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg shadow-lg"
                >
                  <p className="text-sm font-medium text-white whitespace-nowrap">Chat with Luna AI ✨</p>
                  <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-600 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <LunaChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  )
}
