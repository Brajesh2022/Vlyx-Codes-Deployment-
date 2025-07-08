// Netlify Function for Luna AI
// This allows AI functionality in static deployments

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { message, messages } = JSON.parse(event.body)
    
    // Get API key from environment variables (secure)
    const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY
    
    if (!GOOGLE_AI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'AI service not configured',
          fallback: getStaticResponse(message)
        })
      }
    }

    // Luna's enhanced instructions
    const LUNA_INSTRUCTIONS = `
    You are Luna, the AI assistant for Vlyx Codes, created by Brajesh.
    
    ABOUT VLYX CODES:
    - Founded by Brajesh (Lead Developer) and Co-founded by Aadish
    - Services: Custom websites, AI integration, SEO, dashboards, hosting solutions
    - Pricing: Basic ₹3,000, Standard ₹5,000, Premium ₹5,200+
    - Contact: vlyxcodes@gmail.com, +91 82710 81338
    - Recent projects: Luna AI, DPS Keoti Dashboard, Braj URL Shortener
    
    Be helpful, professional, and promote Vlyx Codes services when relevant.
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
            text: `${LUNA_INSTRUCTIONS}\n\nUser message: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 1000,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        response: aiResponse || getStaticResponse(message),
        mode: 'ai'
      })
    }

  } catch (error) {
    console.error('Luna AI Error:', error)
    
    const { message } = JSON.parse(event.body)
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        response: getStaticResponse(message),
        mode: 'fallback'
      })
    }
  }
}

// Static fallback responses
function getStaticResponse(message) {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return `🎯 **Vlyx Codes Pricing:**

**Basic Plan: ₹3,000 ($42)**
- 1-Page Website + Free Hosting & SSL

**Standard Plan: ₹5,000 ($72)**  
- Multi-Page Website + Advanced SEO

**Premium Plan: ₹5,200+ ($75+)**
- Custom Domain + All Features

Contact: vlyxcodes@gmail.com | +91 82710 81338`
  }
  
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
    return `🚀 **Vlyx Codes Services:**

✅ Custom Website Development
✅ AI Integration & Chatbots
✅ SEO & Performance Optimization  
✅ Dashboard Development
✅ Innovative Hosting Solutions

Ready to build something amazing? Contact us!`
  }
  
  return `Hi! I'm Luna from Vlyx Codes! 🤖✨

I can help with:
💼 Services & Pricing
📞 Contact Information  
🤖 AI Integration Options
🚀 Project Examples

What would you like to know?`
}