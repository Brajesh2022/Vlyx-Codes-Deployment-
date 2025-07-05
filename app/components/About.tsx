"use client"

import { motion } from "framer-motion"
import { Code, Globe, Zap, Layout } from "lucide-react"
import Image from "next/image"

export default function About() {
  const skills = [
    { icon: <Code className="w-8 h-8 text-blue-500" />, title: "Clean Code", description: "HTML, CSS, JavaScript" },
    { icon: <Layout className="w-8 h-8 text-green-500" />, title: "Web Design", description: "Responsive, Modern UI" },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Innovative Solutions",
      description: "Creative Hosting",
    },
    { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: "Performance", description: "Speed Optimization" },
  ]

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Founded by Brajesh and co-founded by Aadish, Vlyx Codes is a web development company specializing in
              creating fast, efficient, and innovative websites. With expertise in HTML, CSS, JavaScript, and
              cutting-edge AI integration, we build solutions that prioritize performance and user experience.
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Our approach includes creative solutions like utilizing Blogger for hosting static websites, AI-powered
              assistants, and innovative alternatives to traditional systems while maintaining excellent performance and
              functionality.
            </p>
          </motion.div>
          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {skill.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}
