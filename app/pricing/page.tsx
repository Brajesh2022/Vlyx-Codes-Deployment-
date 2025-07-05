"use client"

import { useState, useEffect } from "react"
import Hero from "./components/Hero"
import ServiceFeatures from "./components/ServiceFeatures"
import PricingTable from "./components/PricingTable"
import PricingCalculator from "./components/PricingCalculator"
import DomainExplanation from "./components/DomainExplanation"
import PaymentTerms from "./components/PaymentTerms"
import Footer from "./components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { DarkModeToggle } from "./components/DarkModeToggle"
import LoadingSkeleton from "./components/LoadingSkeleton"

// SEO metadata for pricing page
const pricingMetadata = {
  title: "Pricing - Vlyx Codes | Affordable Web Development Services by Brajesh & Aadish",
  description:
    "Get transparent pricing for professional web development services by Vlyx Codes. Starting from ₹3,000 for custom websites. Founded by Brajesh & Aadish. Free hosting, SSL, and SEO included. Calculate your custom package now!",
  keywords:
    "web development pricing, affordable website cost, custom website pricing, Vlyx Codes pricing, web development packages, website development cost India, professional web design pricing, responsive website cost, SEO optimization pricing, AI integration cost, Luna AI pricing, hosting included pricing, SSL certificate included, transparent web development pricing, no hidden costs, budget-friendly web development, startup website pricing, small business website cost, enterprise web development pricing, freelance web developer rates, competitive web development pricing, value for money web services, cost-effective web solutions, premium web development packages, basic website pricing, standard website cost, premium website pricing, custom domain pricing, redirect domain cost, website maintenance pricing, technical support cost",
}

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Add SEO meta tags dynamically
    document.title = pricingMetadata.title

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement("meta")
      metaDescription.setAttribute("name", "description")
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute("content", pricingMetadata.description)

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta")
      metaKeywords.setAttribute("name", "keywords")
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute("content", pricingMetadata.keywords)

    // Add structured data for pricing
    const pricingStructuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Web Development Services",
      provider: {
        "@type": "Organization",
        name: "Vlyx Codes",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Basic Website Package",
          description: "1-Page Website with free hosting, SSL certificate, and basic SEO",
          price: "3000",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Standard Website Package",
          description: "Multi-Page Website with free hosting, SSL certificate, and advanced SEO",
          price: "5000",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Premium Website Package",
          description: "Multi-Page Website with custom domain, free hosting, SSL certificate, and advanced SEO",
          price: "5200",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      ],
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(pricingStructuredData)
    document.head.appendChild(script)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
      // Cleanup script
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      {/* Hidden SEO Content for Pricing Page */}
      <div className="sr-only" aria-hidden="true">
        <h1>Vlyx Codes Pricing - Affordable Web Development Services</h1>
        <h2>Transparent Pricing for Professional Web Development by Brajesh and Aadish</h2>
        <p>
          Get the best value for professional web development services with Vlyx Codes. Our transparent pricing starts
          from just ₹3,000 for a complete website package including free hosting, SSL certificate, and SEO optimization.
          Founded by expert developers Brajesh and Aadish, we offer three main packages to suit every budget and
          requirement.
        </p>
        <div>
          <span>
            Pricing Packages: Basic Website Package ₹3000 includes 1-page website free hosting SSL certificate mobile
            responsive basic SEO setup free blogspot domain, Standard Website Package ₹5000 includes multi-page website
            free hosting SSL certificate mobile responsive advanced SEO setup free blogspot domain contact form, Premium
            Website Package ₹5200 plus custom domain cost includes multi-page website free hosting SSL certificate
            mobile responsive advanced SEO setup custom domain contact form. Additional services include redirect
            domains ₹50 each, SEO optimization ₹200, custom AI integration, Luna AI assistant integration, dashboard
            development, e-commerce solutions, performance optimization, speed optimization, mobile optimization,
            cross-browser compatibility, accessibility compliance, security implementation, backup services, migration
            services, maintenance services, technical support, consultation services, strategy planning, digital
            transformation, online presence development, brand development, user experience design, user interface
            design, custom development, API integration, third-party integration, payment gateway integration, analytics
            implementation, social media integration, email marketing integration, newsletter management, customer
            relationship management, lead management, sales funnel development, conversion tracking, A/B testing, heat
            mapping, customer feedback systems, review management, testimonial collection, case study development,
            success story showcases, ROI tracking, performance metrics, KPI monitoring, business intelligence, reporting
            dashboards, data visualization, custom reporting, automated reporting, real-time analytics, historical data
            analysis, trend analysis, pattern recognition, predictive analytics, machine learning integration,
            artificial intelligence implementation, chatbot development, virtual assistant creation, voice interface
            development, natural language processing, computer vision integration, image recognition, video processing,
            audio processing, multimedia integration, rich media content, interactive media, animation implementation,
            motion graphics, visual effects, user interface animation, micro-interactions, gesture recognition, touch
            interface optimization, mobile app development, hybrid app development, cross-platform development, native
            app development, progressive web app development, responsive web design, mobile-first design, desktop
            optimization, tablet optimization, multi-device compatibility, cross-browser testing, performance testing,
            security testing, usability testing, accessibility testing, compatibility testing, load testing, stress
            testing, penetration testing, vulnerability assessment, security audit, code review, quality assurance, bug
            testing, debugging, troubleshooting, issue resolution, problem solving, technical support, maintenance
            services, update services, upgrade services, migration services, backup services, recovery services,
            disaster recovery, business continuity, risk management, change management, project management, resource
            management, time management, budget management, cost optimization, value engineering, return on investment,
            profit maximization, revenue generation, business growth, market expansion, customer acquisition, customer
            retention, customer satisfaction, user engagement, brand development, brand recognition, brand awareness,
            market positioning, competitive advantage, differentiation strategy, unique value proposition, market
            leadership, industry expertise, domain knowledge, technical expertise, professional experience, proven track
            record, success stories, client testimonials, customer reviews, industry recognition, awards achievement,
            certification compliance, quality standards, best practices, industry standards, regulatory compliance,
            legal compliance, privacy protection, data security, information security, cybersecurity, network security,
            application security, database security, cloud security, infrastructure security, platform security, system
            security, operational security, physical security, personnel security, administrative security, technical
            security, procedural security, policy compliance, governance framework, risk assessment, threat analysis,
            vulnerability management, incident response, security monitoring, compliance monitoring, audit trail,
            documentation management, knowledge management, training programs, skill development, capacity building,
            team development, leadership development, innovation culture, continuous improvement, process optimization,
            workflow automation, task automation, efficiency enhancement, productivity improvement, performance
            optimization, quality enhancement, service excellence, customer excellence, operational excellence,
            strategic excellence, tactical excellence, execution excellence, delivery excellence, results achievement,
            goal accomplishment, objective fulfillment, target achievement, milestone completion, success realization,
            vision implementation, mission execution, strategy deployment, plan implementation, project completion, task
            completion, deliverable creation, solution development, product development, service development, innovation
            development, technology development, skill enhancement, knowledge expansion, experience accumulation,
            expertise development, competency building, capability enhancement, capacity expansion, resource
            optimization, asset utilization, investment maximization, return optimization, profit enhancement, revenue
            increase, cost reduction, efficiency improvement, productivity boost, performance enhancement, quality
            improvement, service enhancement, customer satisfaction, user experience, brand value, market value,
            business value, stakeholder value, shareholder value, community value, social value, environmental value,
            sustainable development, responsible business, ethical practices, corporate responsibility, social
            responsibility, environmental responsibility
          </span>
        </div>
        <ul>
          <li>Basic Website Package - ₹3,000 / $42</li>
          <li>Standard Website Package - ₹5,000 / $72</li>
          <li>Premium Website Package - ₹5,200 + domain cost</li>
          <li>Free hosting included all packages</li>
          <li>SSL certificate included</li>
          <li>SEO optimization available</li>
          <li>Mobile responsive design</li>
          <li>Custom domain options</li>
          <li>Redirect domains ₹50 each</li>
          <li>AI integration services</li>
          <li>Luna AI assistant integration</li>
          <li>Dashboard development</li>
          <li>E-commerce solutions</li>
          <li>Performance optimization</li>
          <li>Technical support included</li>
        </ul>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <main className="min-h-screen flex flex-col">
          <DarkModeToggle />
          <Hero />
          <ServiceFeatures />
          <PricingTable />
          <PricingCalculator />
          <DomainExplanation />
          <PaymentTerms />
          <Footer />
          <Toaster />
        </main>
      )}
    </>
  )
}
