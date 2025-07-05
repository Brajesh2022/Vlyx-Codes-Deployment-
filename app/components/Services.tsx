"use client"

import { motion } from "framer-motion"
import { Code, Layout, Globe, Zap, Search, PenToolIcon as Tool } from "lucide-react"
import Image from "next/image"

export default function Services() {
  const services = [
    {
      icon: <Layout className="w-12 h-12 text-blue-500" />,
      title: "Custom Website Development",
      description:
        "Beautiful, responsive websites built with HTML, CSS, and JavaScript, focusing on modern design and user experience.",
    },
    {
      icon: <Globe className="w-12 h-12 text-green-500" />,
      title: "Innovative Hosting Solutions",
      description:
        "Creative and cost-effective hosting solutions using Blogger platform, perfect for static websites and small businesses.",
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      title: "Performance Optimization",
      description:
        "Converting slow WordPress sites into faster, more efficient static websites while maintaining all functionality.",
    },
    {
      icon: <Search className="w-12 h-12 text-yellow-500" />,
      title: "SEO Optimization",
      description:
        "Improving website visibility in search engines with proper meta tags, semantic HTML, and performance optimization.",
    },
    {
      icon: <Code className="w-12 h-12 text-red-500" />,
      title: "Custom JavaScript Solutions",
      description:
        "Interactive features and functionality using vanilla JavaScript, enhancing user engagement without heavy frameworks.",
    },
    {
      icon: <Tool className="w-12 h-12 text-indigo-500" />,
      title: "Website Maintenance",
      description: "Regular updates, content management, and technical support to keep your website running smoothly.",
    },
  ]

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-2xl font-semibold ml-4 dark:text-white">{service.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-64 h-64 -mt-32 -ml-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}
