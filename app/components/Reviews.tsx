"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const reviews = [
  {
    name: "Bipin K. Y.",
    role: "Director of D.P.S Keoti",
    image: "https://i.postimg.cc/G2Fpmw3y/Firefly-20250127001509-2.jpg",
    review:
      "Our collaboration with their team for our school website with student dashboard features was excellent. They demonstrated professionalism and expertise throughout. The resulting website is modern, user-friendly, and perfectly tailored to our needs. I highly recommend their team for web development services.",
    rating: 4.3,
  },
  {
    name: "Sunil",
    role: "Coaching institute's Director",
    image: "https://i.postimg.cc/d1qx4MZ2/Whats-App-Image-2024-03-29-at-10-25-11-PM.jpg",
    review:
      "Ekagra Academy enlisted the services of their to create our coaching center's website, and the experience has been remarkable. Their team delivered an outstanding website that perfectly suits our needs, all at a very reasonable cost. The platform they developed makes it effortless for us to manage and update course information, ensuring smooth operations. I highly recommend their team for their professionalism and top-notch service.",
    rating: 4.6,
  },
  {
    name: "B. Kumar",
    role: "TVSP-ebook's Owner",
    image: "https://i.postimg.cc/CKC2GM5M/IMG-20231129-105806-150x150.jpg",
    review:
      "We approached their Team to develop an e-book selling website, and we couldn't be happier with the outcome. Not only did they deliver a high-quality website, but they also did it at an incredibly reasonable cost. The platform they created allows us to add products easily, making management a breeze. We're thrilled with the results and highly recommend their team for their exceptional service.\"",
    rating: 4.2,
  },
]

const RatingStars = ({ rating }: { rating: number }) => {
  // Convert rating to the nearest half star
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <div className="flex">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative w-5 h-5">
          <Star className="w-5 h-5 text-yellow-400 absolute top-0 left-0 fill-current clip-path-half" />
          <Star className="w-5 h-5 text-gray-300 absolute top-0 left-0" />
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Client Reviews" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold dark:text-white">{review.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.role}</p>
                </div>
              </div>
              <div className="mb-4">
                <RatingStars rating={review.rating} />
              </div>
              <div className="relative">
                <Quote className="w-8 h-8 text-gray-200 dark:text-gray-700 absolute -top-4 -left-2" />
                <p className="text-gray-700 dark:text-gray-300 relative z-10 pl-6">{review.review}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>

      <style jsx>{`
        .clip-path-half {
          clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        }
      `}</style>
    </section>
  )
}
