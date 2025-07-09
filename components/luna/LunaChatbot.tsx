"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, ImageIcon, Bot, User, Maximize2, Minimize2 } from "lucide-react"
import { useTheme } from "next-themes"
import NextImage from "next/image"
import { nanoid } from "nanoid"
import ReactMarkdown from "react-markdown"

type Message = {
  id: string
  role: "system" | "user" | "assistant"
  content: string
}

export default function LunaChatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      role: "assistant",
      content: getInitialMessage(),
    },
  ])

  // Get initial message with AI status
  function getInitialMessage(): string {
    const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY !== 'your_google_ai_api_key_here'
    
    if (hasApiKey) {
      return `🤖✨ **Luna AI - Real AI Mode Activated!**

Hi! I'm Luna, your AI assistant for Vlyx Codes, powered by Google's Gemini AI! 

🔥 **AI Status**: ✅ Connected & Ready
🚀 **Mode**: Real AI Conversations

Ask me anything about Vlyx Codes or let's have a real conversation! I can help with:
• Web development questions
• Vlyx Codes services & pricing
• AI integration projects
• Technical discussions
• General conversation

What would you like to know? 🌟`
    } else {
      return `🤖✨ **Luna AI - Smart Mode**

Hi! I'm Luna, your AI assistant for Vlyx Codes!

📋 **Current Mode**: Smart Static Responses
🔧 **Status**: Ready (Local development)

I can help you with:
• Vlyx Codes services & pricing
• Contact information
• Project examples
• AI integration options

**💡 Want Real AI?** Add your Google AI API key to \`.env.local\`:
\`\`\`
NEXT_PUBLIC_GOOGLE_AI_API_KEY=your_api_key_here
\`\`\`

What can I help you with today? 🚀`
    }
  }
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { theme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto full-screen when user sends a message
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].role === "user") {
      setIsFullScreen(true)
    }
  }, [messages])

  // Handle mobile full-screen mode and viewport adjustments
  useEffect(() => {
    if (isFullScreen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"

      // Handle mobile viewport
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      if (isMobile) {
        // Set viewport height to window height to account for mobile browsers
        document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`)

        // Hide address bar on mobile
        window.scrollTo(0, 1)

        // Listen for viewport changes
        const handleResize = () => {
          document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`)
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("orientationchange", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
          window.removeEventListener("orientationchange", handleResize)
        }
      }
    } else {
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }
  }, [isFullScreen])

  const handleSendMessage = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return

    const userMessage: Message = {
      id: nanoid(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      let aiResponse = ""
      let aiMode = "static"

      // Debug logging for development
      console.log("🔍 Luna AI Debug:", {
        hasApiKey: !!process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY,
        apiKeyValue: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY?.substring(0, 10) + '...',
        environment: process.env.NODE_ENV
      })

      // Try different AI approaches in order of preference
      // 1. Try serverless functions first (for deployed environments)
      if (await tryServerlessFunction(input)) {
        console.log("✅ Using serverless function")
        aiResponse = await callServerlessFunction(input)
        aiMode = "serverless"
      }
      // 2. Try direct API if key is available (for local development)
      else if (process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY !== 'your_google_ai_api_key_here') {
        console.log("✅ Using direct Google AI API")
        aiResponse = await callGoogleAIDirect(input)
        aiMode = "google-direct"
      }
      // 3. Fall back to static responses
      else {
        console.log("📋 Using static responses (no API key configured)")
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate AI thinking
        aiResponse = getStaticResponse(input)
        aiMode = "static"
      }

      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: aiResponse,
        },
      ])
    } catch (error) {
      console.error("AI Error:", error)
      
      // Always fall back to static response on any error
      setMessages((prev) => [
        ...prev,
                  {
            id: nanoid(),
            role: "assistant",
            content: getStaticResponse(input),
          },
        ])
      } finally {
        setIsLoading(false)
        setSelectedImage(null)
        setImagePreview(null)
      }
    }

    // Try serverless function availability
    const tryServerlessFunction = async (message: string): Promise<boolean> => {
      try {
        const endpoints = ["/.netlify/functions/luna-ai", "/api/edge/luna"]
        for (const endpoint of endpoints) {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "test" })
          })
          if (response.ok) return true
        }
        return false
      } catch {
        return false
      }
    }

    // Call serverless functions
    const callServerlessFunction = async (userMessage: string): Promise<string> => {
      const endpoints = ["/.netlify/functions/luna-ai", "/api/edge/luna"]
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: userMessage,
              messages: messages.slice(-5)
            })
          })

          if (response.ok) {
            const data = await response.json()
            return data.response || getStaticResponse(userMessage)
          }
        } catch (err) {
          console.log(`Failed to call ${endpoint}:`, err)
          continue
        }
      }
      
      throw new Error('All serverless endpoints failed')
    }

    // Direct Google AI API calls (client-side)
    const callGoogleAIDirect = async (userMessage: string): Promise<string> => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
      
      console.log("🚀 Calling Google AI API...")
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Luna, the AI assistant for Vlyx Codes, created by Brajesh. 

ABOUT VLYX CODES:
- Founded by Brajesh (Lead Developer) and Co-founded by Aadish
- Services: Custom websites, AI integration, SEO, dashboards, hosting solutions
- Pricing: Basic ₹3,000, Standard ₹5,000, Premium ₹5,200+
- Contact: vlyxcodes@gmail.com, +91 82710 81338
- Recent projects: Luna AI, DPS Keoti Dashboard, Braj URL Shortener

Be helpful, professional, and promote Vlyx Codes services when relevant.

User message: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 1000,
          }
        })
      })

      console.log("📡 Google AI API Response Status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Google AI API Error:", errorText)
        throw new Error(`Google AI API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ Google AI API Success:", data)
      
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (!aiText) {
        console.warn("⚠️ No AI response text found, using fallback")
        return getStaticResponse(userMessage)
      }
      
      return aiText
    }

    // Static fallback responses
    const getStaticResponse = (userMessage: string): string => {
      const lowerMessage = userMessage.toLowerCase()
      
      if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return `🎯 **Vlyx Codes Pricing:**

**Basic Plan: ₹3,000 ($42)**
- 1-Page Website
- Free Hosting & SSL
- Basic SEO

**Standard Plan: ₹5,000 ($72)**
- Multi-Page Website  
- Free Hosting & SSL
- Advanced SEO

**Premium Plan: ₹5,200+ ($75+)**
- Custom Domain Included
- All Premium Features

**Custom AI Integration & Dashboards available on request!**

Contact: vlyxcodes@gmail.com | +91 82710 81338`
      }
      
      if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
        return `🚀 **Vlyx Codes Services:**

✅ **Custom Website Development**
✅ **AI Integration & Chatbots** 
✅ **Performance Optimization**
✅ **SEO Optimization**
✅ **Dashboard Development**
✅ **URL Shortening Services**
✅ **Innovative Hosting Solutions**

**Recent AI Projects:**
- Luna AI Assistant (me!) 🤖
- DPS Keoti Dashboard
- Braj URL Shortener
- AI-powered exam systems

Ready to build something amazing? Contact us!`
      }
      
      if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
        return `📞 **Contact Vlyx Codes:**

**Email:** vlyxcodes@gmail.com
**Phone:** +91 82710 81338
**Location:** India

**Follow Us:**
🔗 Instagram: @vlyxcodes
🔗 YouTube: @VlyxCodes

**Founders:**
👨‍💻 Brajesh (Founder & Lead Developer)
👨‍💼 Aadish (Co-Founder & Business Development)

We'd love to hear from you! 🚀`
      }
      
      if (lowerMessage.includes('ai') || lowerMessage.includes('luna')) {
        return `🤖 **About Luna AI:**

I'm Luna, the AI assistant created by Brajesh for Vlyx Codes! 

**AI Services We Offer:**
✨ Custom AI Chatbots
✨ Content Generation Systems  
✨ AI-powered Dashboards
✨ Intelligent Form Processing
✨ Automated Customer Support

**For enhanced AI capabilities**, we can set up:
- Serverless AI functions 
- Real-time AI responses
- Custom AI backends
- Advanced conversational AI

Want full AI integration? Let's talk! 🚀`
      }
      
      return `Hi! I'm Luna from Vlyx Codes! 🤖✨

I can help you with:
💼 **Services & Pricing Information**
📞 **Contact Details**  
🤖 **AI Integration Options**
🚀 **Project Examples**

**Available AI Modes:**
- Smart Static Responses (current)
- Serverless AI Functions
- Real-time AI Integration

What would you like to know about Vlyx Codes?`
     }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            width: isFullScreen ? "100vw" : "90vw",
            height: isFullScreen ? "calc(var(--vh, 1vh) * 100)" : "600px",
            top: isFullScreen ? 0 : "auto",
            bottom: isFullScreen ? 0 : "24px",
            left: isFullScreen ? 0 : "auto",
            right: isFullScreen ? 0 : "32px",
            borderRadius: isFullScreen ? "0" : "16px",
          }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`fixed flex flex-col ${isFullScreen ? "" : "sm:w-[450px] max-h-[80vh] shadow-2xl"}`}
          style={{
            zIndex: isFullScreen ? 999999 : 50,
            background: `linear-gradient(135deg, ${
              theme === "dark" ? "rgba(30, 30, 60, 0.98)" : "rgba(255, 255, 255, 0.98)"
            } 0%, ${theme === "dark" ? "rgba(20, 20, 40, 0.98)" : "rgba(240, 240, 255, 0.98)"} 100%)`,
            backdropFilter: "blur(15px)",
            border: isFullScreen
              ? "none"
              : `1px solid ${theme === "dark" ? "rgba(80, 80, 150, 0.3)" : "rgba(200, 200, 255, 0.5)"}`,
          }}
        >
          {/* Enhanced Header with glowing effects */}
          <div
            className="flex-shrink-0 p-4 flex items-center justify-between relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme === "dark" ? "#4a3aff" : "#6a5aff"} 0%, ${
                theme === "dark" ? "#9333ea" : "#a855f7"
              } 100%)`,
              paddingTop: isFullScreen ? "max(1rem, env(safe-area-inset-top))" : "1rem",
            }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 50 - 25, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3 relative z-10">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(255, 255, 255, 0.3)",
                    "0 0 25px rgba(255, 255, 255, 0.5)",
                    "0 0 15px rgba(255, 255, 255, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/50"
              >
                <NextImage src="/images/luna-logo.png" alt="Luna AI" fill className="object-cover" />
                {/* Holographic effect */}
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
              <div>
                <motion.h3
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255,255,255,0.5)",
                      "0 0 10px rgba(255,255,255,0.8)",
                      "0 0 5px rgba(255,255,255,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="font-bold text-white text-lg"
                >
                  Luna AI ✨
                </motion.h3>
                <p className="text-white text-opacity-80 text-xs">Vlyx Codes Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 relative z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullScreen}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
              >
                {isFullScreen ? (
                  <Minimize2 className="w-5 h-5 text-white" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-white" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Messages - with proper flex grow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : theme === "dark"
                        ? "bg-gray-800 text-white border border-purple-500/20"
                        : "bg-white text-gray-800 border border-blue-200"
                  } shadow-md`}
                >
                  <div className="flex items-start gap-2">
                    {message.role !== "user" && (
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Bot className="w-5 h-5 mt-1 flex-shrink-0 text-purple-400" />
                      </motion.div>
                    )}
                    <div className="markdown-content">
                      {message.role === "assistant" ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2">{children}</p>,
                            h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-base font-bold mb-1">{children}</h3>,
                            ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                              >
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md overflow-x-auto my-2 text-sm">
                                {children}
                              </pre>
                            ),
                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 italic my-2">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                    {message.role === "user" && <User className="w-5 h-5 mt-1 flex-shrink-0 text-blue-200" />}
                  </div>
                </motion.div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                  } shadow-md`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [0.5, 1, 0.5] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                        className="w-2 h-2 rounded-full bg-purple-500"
                      />
                      <motion.div
                        animate={{ scale: [0.5, 1, 0.5] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-blue-500"
                      />
                      <motion.div
                        animate={{ scale: [0.5, 1, 0.5] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-indigo-500"
                      />
                    </div>
                    <span className="text-sm">Luna is thinking...</span>
                  </div>
                </motion.div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="flex-shrink-0 px-4 pb-2">
              <div className="relative inline-block">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-purple-500">
                  <NextImage
                    src={imagePreview || "/placeholder.svg"}
                    alt="Selected image"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Input - Fixed positioning with proper safe areas */}
          <div
            className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-inherit"
            style={{
              paddingTop: "1rem",
              paddingBottom: isFullScreen ? "max(1rem, env(safe-area-inset-bottom))" : "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <div className="flex items-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                style={{ marginBottom: "6px" }} // Align with textarea bottom
              >
                <ImageIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </motion.button>

              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Luna something magical... ✨"
                  className="w-full p-3 pr-14 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white resize-none"
                  rows={1}
                  style={{
                    minHeight: "44px",
                    maxHeight: "120px",
                    lineHeight: "1.5",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={isLoading || (!input.trim() && !selectedImage)}
                  className={`absolute flex-shrink-0 flex items-center justify-center rounded-full transition-all ${
                    isLoading || (!input.trim() && !selectedImage)
                      ? "text-gray-400 cursor-not-allowed bg-gray-200 dark:bg-gray-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                  }`}
                  style={{
                    width: "36px",
                    height: "36px",
                    right: "8px",
                    bottom: "8px", // Fixed position from bottom
                    position: "absolute",
                  }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
