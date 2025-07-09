// Vercel Edge Function for Luna AI
// This runs on Vercel's Edge Runtime for fast global responses

export default async function handler(request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const { message, messages } = await request.json()
    
    // Get API key from environment variables (secure)
    const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY
    
    if (!GOOGLE_AI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'AI service not configured',
        response: getStaticResponse(message),
        mode: 'fallback'
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // Luna's instructions
    const LUNA_INSTRUCTIONS = `
    You are Luna, the AI assistant for Vlyx Codes, created by Brajesh.
    
    COMPANY INFO:
    - Vlyx Codes: Web development company
    - Founder: Brajesh (Lead Developer) 
    - Co-Founder: Aadish (Business Development)
    - Services: Custom websites, AI integration, SEO, dashboards
    - Pricing: Basic ₹3,000, Standard ₹5,000, Premium ₹5,200+
    - Contact: vlyxcodes@gmail.com, +91 82710 81338
    - Social: @vlyxcodes (Instagram), @VlyxCodes (YouTube)
    
    Be helpful, friendly, professional. Promote services when relevant.
    `

    // Call Google AI API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${LUNA_INSTRUCTIONS}\n\nUser: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 800,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    return new Response(JSON.stringify({
      response: aiResponse || getStaticResponse(message),
      mode: 'ai'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    })

  } catch (error) {
    console.error('Luna AI Error:', error)
    
    // Fallback response
    const { message } = await request.json().catch(() => ({ message: '' }))
    
    return new Response(JSON.stringify({
      response: getStaticResponse(message),
      mode: 'fallback'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// Static responses
function getStaticResponse(message) {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return `💰 **Vlyx Codes Pricing:**

**Basic**: ₹3,000 ($42) - Single page + hosting
**Standard**: ₹5,000 ($72) - Multi-page + SEO  
**Premium**: ₹5,200+ ($75+) - Custom domain

Contact: vlyxcodes@gmail.com`
  }
  
  if (lowerMessage.includes('contact')) {
    return `📞 **Contact Vlyx Codes:**

Email: vlyxcodes@gmail.com
Phone: +91 82710 81338
Instagram: @vlyxcodes
YouTube: @VlyxCodes

Founders: Brajesh & Aadish`
  }
  
  return `🤖 Hi! I'm Luna from Vlyx Codes!

Ask me about:
• Services & Pricing
• AI Integration
• Custom Websites
• Contact Info

How can I help you today?`
}

export const config = {
  runtime: 'edge',
}