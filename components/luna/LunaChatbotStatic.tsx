"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Maximize2, Minimize2, ImageIcon } from "lucide-react"
import { nanoid } from "nanoid"
import { useTheme } from "next-themes"
import NextImage from "next/image"
import ReactMarkdown from "react-markdown"

type Message = {
  id: string
  role: "system" | "user" | "assistant"
  content: string
}

// Configuration object for different deployment approaches
const AI_CONFIG = {
  // Approach 1: Direct Google AI API calls (for demo/development)
  GOOGLE_AI_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "",
  
  // Approach 2: Serverless function endpoints
  NETLIFY_FUNCTION_URL: "/.netlify/functions/luna-ai",
  VERCEL_EDGE_FUNCTION_URL: "/api/edge/luna",
  
  // Approach 3: External proxy service
  PROXY_SERVICE_URL: "https://api.allorigins.win/raw?url=",
  
  // Approach 4: Custom backend service
  CUSTOM_API_URL: process.env.NEXT_PUBLIC_CUSTOM_AI_API_URL || "",
}

export default function LunaChatbotStatic({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      role: "assistant",
      content: "Hi! I'm Luna, the AI assistant for Vlyx Codes! 🤖✨ How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [aiMode, setAiMode] = useState<'static' | 'google-direct' | 'serverless' | 'proxy'>('static')

  const { theme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Detect the best AI approach available
  useEffect(() => {
    if (AI_CONFIG.GOOGLE_AI_API_KEY) {
      setAiMode('google-direct')
    } else if (AI_CONFIG.CUSTOM_API_URL) {
      setAiMode('serverless')
    } else {
      setAiMode('static')
    }
  }, [])

  // Approach 1: Direct Google AI API calls (client-side)
  const callGoogleAIDirect = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AI_CONFIG.GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Luna, the AI assistant for Vlyx Codes. Be helpful, friendly, and professional. Respond to: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 1000,
          }
        })
      })

      const data = await response.json()
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request."
    } catch (error) {
      console.error('Google AI Direct Error:', error)
      throw error
    }
  }

  // Approach 2: Serverless Functions (Netlify/Vercel)
  const callServerlessFunction = async (userMessage: string): Promise<string> => {
    try {
      // Try Netlify function first, then Vercel
      const endpoints = [AI_CONFIG.NETLIFY_FUNCTION_URL, AI_CONFIG.VERCEL_EDGE_FUNCTION_URL]
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: userMessage,
              messages: messages.slice(-5) // Send last 5 messages for context
            })
          })

          if (response.ok) {
            const data = await response.json()
            return data.response || data.message || "AI response received"
          }
        } catch (err) {
          console.log(`Failed to call ${endpoint}:`, err)
          continue
        }
      }
      
      throw new Error('All serverless endpoints failed')
    } catch (error) {
      console.error('Serverless Function Error:', error)
      throw error
    }
  }

  // Approach 3: Custom API/Backend service
  const callCustomAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(AI_CONFIG.CUSTOM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: messages.slice(-3)
        })
      })

      const data = await response.json()
      return data.response || "Custom AI response received"
    } catch (error) {
      console.error('Custom API Error:', error)
      throw error
    }
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

**Currently in Static Mode** - For full AI capabilities with real-time responses, we can:
- Set up serverless functions 
- Implement direct AI API integration
- Create custom AI backends
- Build advanced conversational AI

**AI Services We Offer:**
✨ Custom AI Chatbots
✨ Content Generation Systems  
✨ AI-powered Dashboards
✨ Intelligent Form Processing
✨ Automated Customer Support

Want full AI integration? Let's talk! 🚀`
    }
    
    return `Hi! I'm Luna from Vlyx Codes! 🤖✨

I can help you with:
💼 **Services & Pricing Information**
📞 **Contact Details**  
🤖 **AI Integration Options**
🚀 **Project Examples**

**For real-time AI conversations**, we can upgrade this to:
- Direct AI API integration
- Serverless functions
- Custom AI backends

What would you like to know about Vlyx Codes?`
  }

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

      // Try different AI approaches based on availability
      switch (aiMode) {
        case 'google-direct':
          aiResponse = await callGoogleAIDirect(input)
          break
        case 'serverless':
          aiResponse = await callServerlessFunction(input)
          break
        case 'proxy':
          aiResponse = await callCustomAPI(input)
          break
        default:
          // Static fallback
          await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate AI thinking
          aiResponse = getStaticResponse(input)
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
      
      // Fallback to static response on any error
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: `Sorry, I'm having trouble connecting to my AI brain right now! 😅

But I can still help you with information about Vlyx Codes:

**Quick Info:**
🌐 Custom Website Development  
🤖 AI Integration Services
📱 Mobile-Responsive Design
💰 Starting from ₹3,000

**Contact:** vlyxcodes@gmail.com

For full AI capabilities, we can set up:
- Real-time AI responses
- Advanced conversational AI  
- Custom AI integrations

What else would you like to know?`,
        },
      ])
    } finally {
      setIsLoading(false)
      setSelectedImage(null)
      setImagePreview(null)
    }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
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
            height: isFullScreen ? "100vh" : "600px",
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
          {/* Header */}
          <div
            className="flex-shrink-0 p-4 flex items-center justify-between relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme === "dark" ? "#4a3aff" : "#6a5aff"} 0%, ${
                theme === "dark" ? "#9333ea" : "#a855f7"
              } 100%)`,
            }}
          >
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  Luna AI ✨ {aiMode !== 'static' && <span className="text-xs">({aiMode})</span>}
                </h3>
                <p className="text-white text-opacity-80 text-xs">
                  {aiMode === 'static' ? 'Static Mode' : 'AI Mode'} - Vlyx Codes Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 relative z-10">
              <button
                onClick={toggleFullScreen}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
              >
                {isFullScreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : theme === "dark"
                        ? "bg-gray-800 text-white border border-purple-500/20"
                        : "bg-white text-gray-800 border border-blue-200"
                  } shadow-md`}
                >
                  <div className="flex items-start gap-2">
                    {message.role !== "user" && <Bot className="w-5 h-5 mt-1 flex-shrink-0 text-purple-400" />}
                    <div className="markdown-content">
                      {message.role === "assistant" ? (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
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
                <div className="max-w-[80%] rounded-2xl p-4 bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                          className="w-2 h-2 rounded-full bg-purple-500"
                        />
                      ))}
                    </div>
                    <span className="text-sm">Luna is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-end space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ImageIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </button>

              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Luna something magical... ✨"
                  className="w-full p-3 pr-14 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white resize-none"
                  rows={1}
                  style={{ minHeight: "44px", maxHeight: "120px" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || (!input.trim() && !selectedImage)}
                  className={`absolute right-2 bottom-2 w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                    isLoading || (!input.trim() && !selectedImage)
                      ? "text-gray-400 cursor-not-allowed bg-gray-200 dark:bg-gray-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}