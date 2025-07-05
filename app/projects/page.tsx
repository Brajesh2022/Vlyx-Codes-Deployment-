"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

// Note: Since this is a client component, we'll add SEO through other means
const projectsMetadata = {
  title: "Projects Portfolio - Vlyx Codes | Web Development Showcase by Brajesh & Aadish",
  description:
    "Explore our portfolio of web development projects including Luna AI Assistant, DPS Keoti Dashboard, Braj URL Shortener, and more. See the innovative solutions created by Vlyx Codes founders Brajesh & Aadish.",
  keywords:
    "web development portfolio, Vlyx Codes projects, Luna AI assistant, DPS Keoti dashboard, Braj URL shortener, Vishal Mega Mart project, Ekagra Academy website, custom web applications, AI integration projects, responsive website examples, innovative web solutions, professional web development showcase",
}

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Add SEO meta tags dynamically
    document.title = projectsMetadata.title

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement("meta")
      metaDescription.setAttribute("name", "description")
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute("content", projectsMetadata.description)

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta")
      metaKeywords.setAttribute("name", "keywords")
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute("content", projectsMetadata.keywords)

    // Check if dark mode is enabled
    const isDarkMode = document.documentElement.classList.contains("dark")
    setTheme(isDarkMode ? "dark" : "light")

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 100
      const mouseY = (e.clientY / window.innerHeight) * 100
      document.documentElement.style.setProperty("--mouse-x", `${mouseX}%`)
      document.documentElement.style.setProperty("--mouse-y", `${mouseY}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const projects = [
    {
      id: 1,
      title: "Ekagra Academy – Coaching Website",
      description:
        'Built a responsive WordPress website for Ekagra Academy, Darbhanga, ensuring smooth user experience and SEO optimization. The site is live on Google—search "Ekagra Academy Darbhanga" to view it.',
      image: "https://i.postimg.cc/cHwXy6Bw/Ekagra.jpg",
      link: "https://ekagraacademy.free.nf",
      keywords:
        "coaching website, WordPress development, SEO optimization, responsive design, educational website, Ekagra Academy, Darbhanga coaching center",
    },
    {
      id: 2,
      title: "DPS Keoti – School Website",
      description:
        "Developed a fully responsive website for DPS Keoti using HTML, CSS, and JavaScript for a fast and seamless experience. Features modern design with comprehensive school information and user-friendly navigation.",
      image: "/images/dps-keoti-new.jpeg",
      link: "https://dps-keoti.web.app/",
      keywords:
        "school website, HTML CSS JavaScript, responsive design, educational portal, DPS Keoti, modern web design, fast loading website",
    },
    {
      id: 3,
      title: "Luna AI Assistant",
      description:
        "An intelligent AI assistant built for our Vlyx Codes website. Users can access Luna directly via the floating button at the bottom-right corner of the homepage for instant help and support.",
      image: "/images/luna-ai.jpeg",
      link: "https://luna-by-vlyx.vercel.app/",
      keywords:
        "AI assistant, Luna AI, chatbot development, artificial intelligence, customer support bot, AI integration, intelligent assistant, conversational AI",
    },
    {
      id: 4,
      title: "Braj URL Shortener",
      description:
        "A powerful URL shortening tool that stores links using Firebase as the backend. Features analytics, custom short links, and a clean, modern interface for easy link management.",
      image: "/images/braj-url.jpeg",
      link: "https://braj-url.vercel.app/",
      keywords:
        "URL shortener, Firebase backend, link management, analytics, custom short links, web application, link tracking",
    },
    {
      id: 5,
      title: "Vishal Mega Mart Security Guard Bharti Exam Site",
      description:
        "A viral and fun parody project featuring a fictional recruitment exam. Includes a subjective question-answer section reviewed by Luna AI, creating an engaging and humorous user experience.",
      image: "/images/vishal-mega-mart.jpeg",
      link: "https://vishal-mega-mart-bharti-exam.vercel.app/",
      keywords:
        "viral website, parody project, recruitment exam, interactive website, humor website, engaging user experience, creative web development",
    },
    {
      id: 6,
      title: "DPS Keoti Dashboard",
      description:
        "A separate dashboard project built for DPS Keoti students and staff. Features secure authentication, student management, and comprehensive administrative tools for school operations.",
      image: "/images/dps-dashboard.jpeg",
      link: "https://dps-keoti-dashboard.vercel.app/",
      keywords:
        "student dashboard, school management system, secure authentication, administrative tools, educational software, student portal, staff management",
    },
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 dark:text-blue-400 font-medium">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hidden SEO Content for Projects Page */}
      <div className="sr-only" aria-hidden="true">
        <h1>Vlyx Codes Projects Portfolio - Web Development Showcase</h1>
        <h2>Professional Web Development Projects by Brajesh and Aadish</h2>
        <p>
          Explore our comprehensive portfolio of web development projects showcasing expertise in custom website
          development, AI integration, responsive design, and innovative web solutions. Our projects include Luna AI
          Assistant, DPS Keoti Dashboard, Braj URL Shortener, Vishal Mega Mart recruitment site, Ekagra Academy coaching
          website, and DPS Keoti school website.
        </p>
        <div>
          <span>
            Project Categories: AI Integration Projects, Educational Websites, School Management Systems, URL Shortening
            Applications, Coaching Center Websites, Student Dashboards, Administrative Tools, Viral Web Projects,
            Interactive Websites, Custom Web Applications, Responsive Websites, Modern Web Design, Fast Loading
            Websites, SEO Optimized Websites, Mobile-Friendly Websites, Cross-Browser Compatible Websites, Accessible
            Websites, User-Friendly Interfaces, Professional Web Design, Creative Web Solutions, Innovative Web
            Development, Custom Web Development, Frontend Development, Backend Development, Full-Stack Development,
            Database Integration, API Development, Third-Party Integrations, Payment Gateway Integration, Authentication
            Systems, Security Implementation, Performance Optimization, Speed Optimization, SEO Implementation, Social
            Media Integration, Analytics Integration, Content Management Systems, E-commerce Solutions, Portfolio
            Websites, Business Websites, Corporate Websites, Startup Websites, Small Business Websites, Enterprise
            Solutions, Scalable Web Applications, Progressive Web Apps, Single Page Applications, Multi-Page Websites,
            Static Websites, Dynamic Websites, Interactive Websites, Engaging User Experiences, Conversion Optimization,
            Lead Generation Websites, Marketing Websites, Promotional Websites, Event Websites, News Websites, Blog
            Websites, Magazine Websites, Directory Websites, Listing Websites, Booking Websites, Reservation Systems,
            Appointment Scheduling, Calendar Integration, Email Marketing Integration, Newsletter Management, Customer
            Relationship Management, Lead Management, Sales Funnel Development, Conversion Tracking, Analytics
            Implementation, Performance Monitoring, User Behavior Analysis, A/B Testing, Heat Mapping, Customer Feedback
            Systems, Review Management, Testimonial Collection, Case Study Development, Success Story Showcases, Before
            After Comparisons, ROI Tracking, Performance Metrics, KPI Monitoring, Business Intelligence, Reporting
            Dashboards, Data Visualization, Custom Reporting, Automated Reporting, Real-Time Analytics, Historical Data
            Analysis, Trend Analysis, Pattern Recognition, Predictive Analytics, Machine Learning Integration,
            Artificial Intelligence Implementation, Chatbot Development, Virtual Assistant Creation, Voice Interface
            Development, Natural Language Processing, Computer Vision Integration, Image Recognition, Video Processing,
            Audio Processing, Multimedia Integration, Rich Media Content, Interactive Media, Animation Implementation,
            Motion Graphics, Visual Effects, User Interface Animation, Micro-interactions, Gesture Recognition, Touch
            Interface Optimization, Mobile App Development, Hybrid App Development, Cross-Platform Development, Native
            App Development, Progressive Web App Development, Responsive Web Design, Mobile-First Design, Desktop
            Optimization, Tablet Optimization, Multi-Device Compatibility, Cross-Browser Testing, Performance Testing,
            Security Testing, Usability Testing, Accessibility Testing, Compatibility Testing, Load Testing, Stress
            Testing, Penetration Testing, Vulnerability Assessment, Security Audit, Code Review, Quality Assurance, Bug
            Testing, Debugging, Troubleshooting, Issue Resolution, Problem Solving, Technical Support, Maintenance
            Services, Update Services, Upgrade Services, Migration Services, Backup Services, Recovery Services,
            Disaster Recovery, Business Continuity, Risk Management, Change Management, Project Management, Resource
            Management, Time Management, Budget Management, Cost Optimization, Value Engineering, Return on Investment,
            Profit Maximization, Revenue Generation, Business Growth, Market Expansion, Customer Acquisition, Customer
            Retention, Customer Satisfaction, User Engagement, Brand Development, Brand Recognition, Brand Awareness,
            Market Positioning, Competitive Advantage, Differentiation Strategy, Unique Value Proposition, Market
            Leadership, Industry Expertise, Domain Knowledge, Technical Expertise, Professional Experience, Proven Track
            Record, Success Stories, Client Testimonials, Customer Reviews, Industry Recognition, Awards Achievement,
            Certification Compliance, Quality Standards, Best Practices, Industry Standards, Regulatory Compliance,
            Legal Compliance, Privacy Protection, Data Security, Information Security, Cybersecurity, Network Security,
            Application Security, Database Security, Cloud Security, Infrastructure Security, Platform Security, System
            Security, Operational Security, Physical Security, Personnel Security, Administrative Security, Technical
            Security, Procedural Security, Policy Compliance, Governance Framework, Risk Assessment, Threat Analysis,
            Vulnerability Management, Incident Response, Security Monitoring, Compliance Monitoring, Audit Trail,
            Documentation Management, Knowledge Management, Training Programs, Skill Development, Capacity Building,
            Team Development, Leadership Development, Innovation Culture, Continuous Improvement, Process Optimization,
            Workflow Automation, Task Automation, Efficiency Enhancement, Productivity Improvement, Performance
            Optimization, Quality Enhancement, Service Excellence, Customer Excellence, Operational Excellence,
            Strategic Excellence, Tactical Excellence, Execution Excellence, Delivery Excellence, Results Achievement,
            Goal Accomplishment, Objective Fulfillment, Target Achievement, Milestone Completion, Success Realization,
            Vision Implementation, Mission Execution, Strategy Deployment, Plan Implementation, Project Completion, Task
            Completion, Deliverable Creation, Solution Development, Product Development, Service Development, Innovation
            Development, Technology Development, Skill Enhancement, Knowledge Expansion, Experience Accumulation,
            Expertise Development, Competency Building, Capability Enhancement, Capacity Expansion, Resource
            Optimization, Asset Utilization, Investment Maximization, Return Optimization, Profit Enhancement, Revenue
            Increase, Cost Reduction, Efficiency Improvement, Productivity Boost, Performance Enhancement, Quality
            Improvement, Service Enhancement, Customer Satisfaction, User Experience, Brand Value, Market Value,
            Business Value, Stakeholder Value, Shareholder Value, Community Value, Social Value, Environmental Value,
            Sustainable Development, Responsible Business, Ethical Practices, Corporate Responsibility, Social
            Responsibility, Environmental Responsibility, Community Engagement, Stakeholder Engagement, Customer
            Engagement, Employee Engagement, Partner Engagement, Supplier Engagement, Investor Engagement, Media
            Engagement, Public Engagement, Industry Engagement, Professional Engagement, Academic Engagement, Research
            Engagement, Development Engagement, Innovation Engagement, Technology Engagement, Digital Engagement, Online
            Engagement, Social Media Engagement, Content Engagement, Marketing Engagement, Sales Engagement, Service
            Engagement, Support Engagement, Maintenance Engagement, Operational Engagement, Strategic Engagement,
            Tactical Engagement, Execution Engagement, Delivery Engagement, Results Engagement, Success Engagement,
            Achievement Engagement, Excellence Engagement, Quality Engagement, Value Engagement, Impact Engagement,
            Influence Engagement, Leadership Engagement, Innovation Engagement, Transformation Engagement, Evolution
            Engagement, Revolution Engagement, Disruption Engagement, Change Engagement, Progress Engagement,
            Advancement Engagement, Development Engagement, Growth Engagement, Expansion Engagement, Scaling Engagement,
            Optimization Engagement, Enhancement Engagement, Improvement Engagement, Refinement Engagement, Perfection
            Engagement, Mastery Engagement, Expertise Engagement, Specialization Engagement, Focus Engagement,
            Dedication Engagement, Commitment Engagement, Passion Engagement, Purpose Engagement, Mission Engagement,
            Vision Engagement, Values Engagement, Principles Engagement, Beliefs Engagement, Philosophy Engagement,
            Approach Engagement, Methodology Engagement, Framework Engagement, System Engagement, Process Engagement,
            Procedure Engagement, Protocol Engagement, Standard Engagement, Guideline Engagement, Best Practice
            Engagement, Recommendation Engagement, Suggestion Engagement, Advice Engagement, Tip Engagement, Trick
            Engagement, Solution Engagement, Answer Engagement, Response Engagement, Result Engagement, Outcome
            Engagement, Benefit Engagement, Advantage Engagement, Value Engagement, Worth Engagement, Investment
            Engagement, Return Engagement, Profit Engagement, Revenue Engagement, Income Engagement, Earnings
            Engagement, Savings Engagement, Efficiency Engagement, Productivity Engagement, Performance Engagement,
            Quality Engagement, Excellence Engagement, Superiority Engagement, Leadership Engagement, Dominance
            Engagement, Market Share Engagement, Competitive Advantage Engagement, Differentiation Engagement,
            Positioning Engagement, Branding Engagement, Marketing Engagement, Sales Engagement, Growth Engagement,
            Expansion Engagement, Scaling Engagement, Development Engagement, Innovation Engagement, Transformation
            Engagement, Modernization Engagement, Digitization Engagement
          </span>
        </div>
        <ul>
          <li>Luna AI Assistant - Intelligent chatbot development</li>
          <li>DPS Keoti Dashboard - Student management system</li>
          <li>Braj URL Shortener - Link management application</li>
          <li>Vishal Mega Mart - Viral recruitment website</li>
          <li>Ekagra Academy - Coaching center website</li>
          <li>DPS Keoti Website - School information portal</li>
          <li>Custom web applications development</li>
          <li>AI integration services</li>
          <li>Responsive website design</li>
          <li>Educational website development</li>
          <li>Administrative dashboard creation</li>
          <li>Interactive web experiences</li>
          <li>Modern web design solutions</li>
          <li>Professional web development</li>
          <li>Innovative web solutions</li>
        </ul>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <header
        className="w-full py-16 md:py-24 text-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900"
        id="header"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our{" "}
            <span className="text-blue-600 dark:text-blue-400 relative">
              Projects
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-200 dark:bg-blue-700 transform -skew-x-12"></span>
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our portfolio of web development projects. Each project showcases our commitment to quality,
            innovation, and user experience.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </header>

      <main className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Hidden SEO content for each project */}
                <div className="sr-only" aria-hidden="true">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span>{project.keywords}</span>
                </div>

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - Web development project by Vlyx Codes`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
                  <Link
                    href={project.link}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} project`}
                  >
                    View Project
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Need a Custom Project?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let's discuss your requirements and create something amazing together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Vlyx Codes. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
