"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

export default function PricingTable() {
  const scrollToPricingCalculator = () => {
    const pricingCalculator = document.getElementById("pricing-calculator")
    if (pricingCalculator) {
      pricingCalculator.scrollIntoView({ behavior: "smooth" })
    }
  }

  const plans = [
    {
      name: "Basic",
      description: "Perfect for simple personal websites",
      price: {
        INR: "₹3,000",
        USD: "$42",
      },
      features: [
        "1-Page Website",
        "Free Hosting",
        "SSL Certificate",
        "Mobile Responsive",
        "Basic SEO Setup",
        "Free .blogspot.com Domain",
      ],
      highlight: false,
    },
    {
      name: "Standard",
      description: "Ideal for small businesses",
      price: {
        INR: "₹5,000",
        USD: "$72",
      },
      features: [
        "Multi-Page Website",
        "Free Hosting",
        "SSL Certificate",
        "Mobile Responsive",
        "Advanced SEO Setup",
        "Free .blogspot.com Domain",
        "Contact Form",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      description: "For established businesses",
      price: {
        INR: "₹5,200+Custom domain cost",
        USD: "$75+Custom domain cost",
      },
      features: [
        "Multi-Page Website",
        "Free Hosting",
        "SSL Certificate",
        "Mobile Responsive",
        "Advanced SEO Setup",
        "Custom Domain (.com/.in)",
        "Contact Form",
      ],
      highlight: false,
    },
  ]

  return (
    <section className="w-full py-12 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter text-blue-700 dark:text-blue-300">Pricing Plans</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-[700px]">
            Choose from our pre-designed packages or customize your own
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`h-full flex flex-col hover:shadow-xl transition-shadow duration-300 ${plan.highlight ? "border-blue-500 shadow-lg" : ""}`}
              >
                {plan.highlight && (
                  <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">Most Popular</div>
                )}
                <CardHeader className={plan.highlight ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                  <CardTitle className={plan.highlight ? "text-blue-700 dark:text-blue-300" : ""}>
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">{plan.price.INR}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">/ {plan.price.USD}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={scrollToPricingCalculator}
                    className={plan.highlight ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  >
                    Customize This Plan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need something specific? Use our calculator to create a custom plan.
          </p>
          <Button
            onClick={scrollToPricingCalculator}
            variant="outline"
            className="mx-auto border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            Build Custom Plan
          </Button>
        </div>
      </div>
    </section>
  )
}
