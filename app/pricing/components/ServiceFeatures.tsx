"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function ServiceFeatures() {
  const features = [
    "Free Hosting Included",
    "Affordable Pricing Plans",
    "Free Subdomains Available",
    "Low-Cost SEO Options",
    "SSL Certificate Included",
    "Domain Redirects",
    "Transparent Pricing",
    "Quick Turnaround Time",
  ]

  return (
    <section className="w-full py-12 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">All Plans Include</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-[700px]">
              Our web development services are designed to provide maximum value at competitive prices
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-950 p-4 rounded-lg"
              >
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
