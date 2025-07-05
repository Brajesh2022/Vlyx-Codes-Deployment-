"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { validateCouponCode } from "@/utils/coupon"
import PhoneInput from "react-phone-number-input/input" // Import for phone number input

// --- USD Prices ---
const PAYPAL_FEE_PERCENTAGE = 0.044
const PAYPAL_FIXED_FEE = 0.3

const calculatePriceWithFees = (basePrice: number) => {
  const priceWithFees = (basePrice + PAYPAL_FIXED_FEE) / (1 - PAYPAL_FEE_PERCENTAGE)
  return priceWithFees
}

// Round to two decimal places
const roundToTwoDecimalPlaces = (price: number) => {
  return Number.parseFloat(price.toFixed(2))
}

const usdBaseCharges = {
  "single-page": calculatePriceWithFees(39),
  "multi-page": calculatePriceWithFees(69),
}

const usdCustomDomainBaseCharges = {
  "single-page": calculatePriceWithFees(39 + 3),
  "multi-page": calculatePriceWithFees(69 + 3),
}

const usdRedirectDomains = [
  { value: ".web.app", label: ".web.app (+$7)", price: 7 },
  { value: ".netlify.app", label: ".netlify.app (+$3)", price: 3 },
  { value: ".blogspot.com", label: ".blogspot.com (Free)", price: 0 },
]

// --- INR Prices ---
const inrBaseCharges = {
  "single-page": 3000,
  "multi-page": 5000,
}

const inrCustomDomainBaseCharges = {
  "single-page": 3200,
  "multi-page": 5200,
}

const inrRedirectDomains = [
  { value: ".web.app", label: ".web.app (+₹75)", price: 75 },
  { value: ".netlify.app", label: ".netlify.app (+₹60)", price: 60 },
  { value: ".blogspot.com", label: ".blogspot.com (Free with SEO, +₹45 without)", price: 45 },
]

export default function PricingCalculator() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [currency, setCurrency] = useState<"INR" | "USD">("INR") // Currency selection
  const [websiteType, setWebsiteType] = useState("single-page")
  const [mainDomain, setMainDomain] = useState(".blogspot.com")
  const [redirects, setRedirects] = useState<string[]>([])
  const [seo, setSeo] = useState(false)
  const [hosting, setHosting] = useState(true)
  const [ssl, setSsl] = useState(true)
  const [totalCost, setTotalCost] = useState(0) // Initialize to 0
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [name, setName] = useState("")
  const [mobileNo, setMobileNo] = useState("") // Store as string, including country code
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [couponError, setCouponError] = useState("")
  const [previousPrice, setPreviousPrice] = useState(0)

  // Individual cost tracking:
  const [basePrice, setBasePrice] = useState(0)
  const [mainDomainCost, setMainDomainCost] = useState(0)
  const [redirectDomainCost, setRedirectDomainCost] = useState(0)
  const [seoCost, setSeoCost] = useState(0)

  // Validation states
  const [nameError, setNameError] = useState("")
  const [mobileNoError, setMobileNoError] = useState("")

  useEffect(() => {
    calculateTotalCost()
  }, [websiteType, mainDomain, redirects, appliedDiscount, seo, currency])

  const calculateTotalCost = () => {
    let cost = 0
    let currentBasePrice = 0
    let currentMainDomainCost = 0
    let currentRedirectDomainCost = 0
    let currentSeoCost = 0

    const baseCharges = currency === "INR" ? inrBaseCharges : usdBaseCharges
    const customDomainBaseCharges = currency === "INR" ? inrCustomDomainBaseCharges : usdCustomDomainBaseCharges
    const redirectDomains = currency === "INR" ? inrRedirectDomains : usdRedirectDomains
    const currencySymbol = currency === "INR" ? "₹" : "$"
    const seoPrice = currency === "INR" ? 200 : calculatePriceWithFees(3)
    const netlifyPrice = currency === "INR" ? 200 : calculatePriceWithFees(3)
    const webAppPrice = currency === "INR" ? 500 : calculatePriceWithFees(7)
    const blogspotPrice = currency === "INR" ? 45 : 0

    if (mainDomain === "Custom Domain") {
      currentBasePrice = customDomainBaseCharges[websiteType]
    } else {
      currentBasePrice = baseCharges[websiteType]
    }
    cost += currentBasePrice

    if (mainDomain === ".netlify.app") {
      currentMainDomainCost = netlifyPrice
    } else if (mainDomain === ".web.app") {
      currentMainDomainCost = webAppPrice
    }
    cost += currentMainDomainCost

    redirects.forEach((redirect) => {
      if (redirect !== mainDomain) {
        const domain = redirectDomains.find((d) => d.value === redirect)
        if (domain) {
          if (redirect === ".blogspot.com") {
            currentRedirectDomainCost += seo ? 0 : blogspotPrice
          } else {
            currentRedirectDomainCost += currency === "INR" ? domain.price : calculatePriceWithFees(domain.price)
          }
        }
      }
    })
    cost += currentRedirectDomainCost

    if (seo) {
      currentSeoCost = seoPrice
      cost += currentSeoCost
    }
    if (currency === "USD") {
      setBasePrice(roundToTwoDecimalPlaces(currentBasePrice))
      setMainDomainCost(roundToTwoDecimalPlaces(currentMainDomainCost))
      setRedirectDomainCost(roundToTwoDecimalPlaces(currentRedirectDomainCost))
      setSeoCost(roundToTwoDecimalPlaces(currentSeoCost))
    } else {
      setBasePrice(currentBasePrice)
      setMainDomainCost(currentMainDomainCost)
      setRedirectDomainCost(currentRedirectDomainCost)
      setSeoCost(currentSeoCost)
    }

    setPreviousPrice(cost)

    if (appliedDiscount > 0) {
      cost = cost * (1 - appliedDiscount / 100)
    }

    setTotalCost(currency === "INR" ? Math.round(cost) : roundToTwoDecimalPlaces(cost))
  }

  const handleCouponSubmit = () => {
    const { isValid, discount } = validateCouponCode(couponCode)

    if (isValid) {
      setAppliedDiscount(discount)
      setCouponError("")
      toast({
        title: "Coupon Applied!",
        description: `${discount}% discount has been applied to your order.`,
      })
    } else {
      setAppliedDiscount(0)
      setCouponError("Invalid coupon code. Please check and try again.")
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is invalid.",
        variant: "destructive",
      })
    }
  }

  const validateName = (name: string) => {
    if (name.trim() === "") {
      return "Name is required"
    }
    if (!/^[a-zA-Z\s\p{L}]+$/u.test(name)) {
      return "Name can only contain letters and spaces"
    }

    return ""
  }
  const validateMobileNumber = (mobileNo: string) => {
    if (!mobileNo) {
      return "Mobile number is required"
    }
    // Basic format check.  libphonenumber-js is recommended for robust validation.
    if (!/^\+[0-9\s\-()]+$/.test(mobileNo)) {
      return "Invalid mobile number format"
    }
    return ""
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setNameError(validateName(newName))
  }

  const handleMobileNoChange = (value: string) => {
    // Change to accept string
    setMobileNo(value)
    setMobileNoError(validateMobileNumber(value)) // Pass the string value
  }

  const handleSubmit = async () => {
    const nameValidationResult = validateName(name)
    const mobileValidationResult = validateMobileNumber(mobileNo)
    setNameError(nameValidationResult)
    setMobileNoError(mobileValidationResult)

    if (!termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "Please accept the terms and conditions before submitting your plan.",
        variant: "destructive",
      })
      return
    }
    if (nameValidationResult || mobileValidationResult) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const validRedirects = redirects.filter((redirect) => redirect !== mainDomain)
    const currencySymbol = currency === "INR" ? "₹" : "$"
    const seoLabel = currency === "INR" ? "Yes (+₹200)" : "Yes (+$3)"

    const billDetails = `
    Bill Details:
    - Currency: ${currency}
    - Website Type: ${websiteType === "single-page" ? "1-Page Website" : "Multi-Page Website"}
    - Main Domain: ${mainDomain}
    - Redirect Domains: ${validRedirects.join(", ") || "None"}
    - SEO: ${seo ? seoLabel : "No"}
    - Hosting: ${hosting ? "Included (Unlimited visitors)" : "Not included"}
    - SSL Certificate: ${ssl ? "Included" : "Not included"}
    ${appliedDiscount > 0 ? `- Applied Discount: ${appliedDiscount}%\n` : ""}
    - Total Cost: ${currencySymbol}${totalCost}${mainDomain === "Custom Domain" ? " + custom domain cost" : ""}

    ${
      mainDomain === "Custom Domain"
        ? `\nNote: Custom domains (e.g., .com, .in, .org, .net) cost around ${currency === "INR" ? "₹700-₹900" : "$8-$10"} annually and are paid separately to the domain registrar.`
        : ""
    }
    ${currency === "INR" ? "\nNote: Clients are responsible for any applicable taxes based on their country." : ""}
  `

    try {
      const formData = new FormData()
      formData.append("entry.886622741", `${name} (${mobileNo})`)
      formData.append("entry.1050067643", billDetails)
      formData.append("fvv", "1")
      formData.append("partialResponse", '[null,null,"-3451579168889574012"]')
      formData.append("pageHistory", "0")
      formData.append("fbzx", "-3451579168889574012")
      formData.append("submissionTimestamp", "-1")

      const response = await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdHd2Go33F9I9V4Y6yubOHPbWdpN_in3onpGkkzgfmVg2F2lQ/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        },
      )

      window.location.href = "https://brajesh-codes.web.app/thanks.html"
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRequiredCheckboxChange = () => {
    toast({
      title: "Cannot uncheck this option",
      description: "Hosting and SSL certificate are included in all plans for your security and convenience.",
      variant: "destructive",
    })
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <section id="pricing-calculator" className="w-full py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter text-blue-700 dark:text-blue-300">Calculate Your Price</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-[700px]">
            Customize your web development package to fit your needs and budget
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg border-t-4 border-t-blue-500 dark:border-t-blue-400 dark:bg-gray-800/90 dark:border-gray-700">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-lg">
            <CardTitle className="text-center text-2xl text-blue-700 dark:text-blue-300">Customize Your Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex justify-between mb-4 overflow-x-auto pb-2 sm:overflow-visible">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center min-w-[60px]">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                      ${
                        i < step
                          ? "bg-green-500 text-white"
                          : i === step
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    {i}
                  </div>
                  <div
                    className={`h-1 w-12 sm:w-16 ${i < 5 ? (i < step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700") : "hidden"}`}
                  ></div>
                </div>
              ))}
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm dark:shadow-blue-900/10"
              >
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                  Step 1: Enter Your Details & Select Currency
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Your Name
                    </Label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full p-3 border rounded-md shadow-sm bg-background text-foreground"
                      placeholder="Enter your name"
                      required
                    />
                    {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-base">
                      Mobile Number (with country code)
                    </Label>
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={mobileNo}
                      onChange={handleMobileNoChange}
                      className="w-full p-3 border rounded-md shadow-sm bg-background text-foreground"
                      placeholder="Enter your mobile number"
                    />
                    {mobileNoError && <p className="text-red-500 text-sm">{mobileNoError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Select Currency</Label>
                    <Select onValueChange={(value) => setCurrency(value as "INR" | "USD")} defaultValue={currency}>
                      <SelectTrigger className="w-full p-3 border rounded-md shadow-sm">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Step 2: Website Type</h3>
                <div className="space-y-2">
                  <Label className="text-base">Website Type</Label>
                  <Select onValueChange={(value) => setWebsiteType(value)} defaultValue={websiteType}>
                    <SelectTrigger className="w-full p-3 border rounded-md shadow-sm">
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-page">1-Page Website</SelectItem>
                      <SelectItem value="multi-page">Multi-Page Website</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Step 3: Choose Main Domain</h3>
                <Select onValueChange={(value) => setMainDomain(value)} defaultValue={mainDomain}>
                  <SelectTrigger className="w-full p-3 border rounded-md shadow-sm">
                    <SelectValue placeholder="Select main domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=".blogspot.com">.blogspot.com (Free)</SelectItem>
                    <SelectItem value=".netlify.app">.netlify.app (+{currency === "INR" ? "₹200" : "$3"})</SelectItem>
                    <SelectItem value=".web.app">.web.app (+{currency === "INR" ? "₹500" : "$7"})</SelectItem>
                    <SelectItem value="Custom Domain">
                      Custom Domain (e.g., .com, .in, .org, .net) - {currency === "INR" ? "₹700-₹900" : "$8-$10"}{" "}
                      annually
                    </SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Step 4: Additional Options</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-lg font-semibold">Add Redirect Domains:</Label>
                    <div className="grid gap-4 mt-2">
                      {(currency === "INR" ? inrRedirectDomains : usdRedirectDomains).map(
                        (domain) =>
                          domain.value !== mainDomain && (
                            <div key={domain.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`redirect-${domain.value}`}
                                checked={redirects.includes(domain.value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setRedirects([...redirects, domain.value])
                                  } else {
                                    setRedirects(redirects.filter((r) => r !== domain.value))
                                  }
                                }}
                              />
                              <Label htmlFor={`redirect-${domain.value}`}>{domain.label}</Label>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="seo" checked={seo} onCheckedChange={(checked) => setSeo(checked as boolean)} />
                    <Label htmlFor="seo">
                      Add SEO (to get your site on Google) (+{currency === "INR" ? "₹200" : "$3"})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hosting" checked={hosting} onCheckedChange={handleRequiredCheckboxChange} />
                    <Label htmlFor="hosting">Hosting (Unlimited visitors) - Included</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ssl" checked={ssl} onCheckedChange={handleRequiredCheckboxChange} />
                    <Label htmlFor="ssl">SSL Certificate (To protect your website) - Included</Label>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Step 5: Review and Submit</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Have a Coupon Code?</Label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value)
                          setCouponError("")
                        }}
                        className="flex-1 p-3 border rounded-md shadow-sm bg-background text-foreground"
                        placeholder="Enter coupon code"
                      />
                      <Button onClick={handleCouponSubmit} variant="outline" type="button">
                        Apply
                      </Button>
                    </div>
                    {couponError && <p className="text-sm text-red-500">{couponError}</p>}
                  </div>

                  <div className="border-t pt-4">
                    <p className="font-semibold text-lg">Price Breakdown:</p>
                    <div className="space-y-2">
                      {/* Base Price */}
                      <div className="flex justify-between items-center">
                        <span>
                          {websiteType === "single-page" ? "1-Page Website Base:" : "Multi-Page Website Base:"}
                        </span>
                        <span>
                          {currency === "INR" ? "₹" : "$"}
                          {basePrice}
                        </span>
                      </div>

                      {/* Main Domain Cost */}
                      {mainDomainCost > 0 && (
                        <div className="flex justify-between items-center">
                          <span>Main Domain ({mainDomain}):</span>
                          <span>
                            +{currency === "INR" ? "₹" : "$"}
                            {mainDomainCost}
                          </span>
                        </div>
                      )}

                      {/* Redirect Domain Cost */}
                      {redirectDomainCost > 0 && (
                        <div className="flex justify-between items-center">
                          <span>Redirect Domains:</span>
                          <span>
                            +{currency === "INR" ? "₹" : "$"}
                            {redirectDomainCost}
                          </span>
                        </div>
                      )}

                      {/* SEO Cost */}
                      {seoCost > 0 && (
                        <div className="flex justify-between items-center">
                          <span>SEO:</span>
                          <span>
                            +{currency === "INR" ? "₹" : "$"}
                            {seoCost}
                          </span>
                        </div>
                      )}

                      {/* Discount (if applied) */}
                      {appliedDiscount > 0 && (
                        <motion.div
                          className="flex justify-between items-center text-green-600"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>Discount ({appliedDiscount}%):</span>
                          <span>
                            -{currency === "INR" ? "₹" : "$"}
                            {roundToTwoDecimalPlaces(previousPrice - totalCost)}
                          </span>
                        </motion.div>
                      )}

                      {/* Total Cost */}
                      <motion.div
                        className="flex justify-between items-center text-2xl font-bold text-blue-600 pt-2 border-t"
                        key={totalCost}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>Final Price:</span>
                        <span>
                          {currency === "INR" ? "₹" : "$"}
                          {totalCost}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Name:</p>
                    <p>{name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Mobile Number:</p>
                    <p>{mobileNo}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Website Type:</p>
                    <p>{websiteType === "single-page" ? "1-Page Website" : "Multi-Page Website"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Main Domain:</p>
                    <p>{mainDomain}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Redirect Domains:</p>
                    <p>{redirects.filter((redirect) => redirect !== mainDomain).join(", ") || "None"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">SEO:</p>
                    <p>{seo ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Hosting:</p>
                    <p>{hosting ? "Included (Unlimited visitors)" : "Not included"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">SSL Certificate:</p>
                    <p>{ssl ? "Included" : "Not included"}</p>
                  </div>
                  {appliedDiscount > 0 && (
                    <div>
                      <p className="font-semibold">Applied Discount:</p>
                      <p className="text-green-600">
                        {appliedDiscount}% (Saved {currency === "INR" ? "₹" : "$"}
                        {roundToTwoDecimalPlaces(previousPrice - totalCost)})
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">Total Cost:</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {currency === "INR" ? "₹" : "$"}
                      {totalCost}
                      {mainDomain === "Custom Domain" ? " + custom domain cost" : ""}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <Label htmlFor="terms">I accept the terms and conditions</Label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By accepting, you agree that {currency === "INR" ? "₹1000" : "$15"} will be paid as a{" "}
                    {currency === "INR" ? "non-refundable" : "refundable"} security deposit before starting the project.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              {step < 5 ? (
                <Button onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!termsAccepted || isSubmitting || nameError !== "" || mobileNoError !== ""}
                  className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white relative"
                >
                  {isSubmitting ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                  ) : (
                    "Submit Plan"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
