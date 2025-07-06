import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CreditCard, AlertTriangle } from "lucide-react"

export default function PaymentTerms() {
  return (
    <section className="w-full py-12 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardTitle className="text-center text-2xl font-bold text-blue-700 dark:text-blue-300">
              Payment Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
                <Shield className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Security Deposit</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A ₹1000 / $15 security deposit is required before starting the project.{" "}
                  <span className="text-sm">(non-refundable for INR, refundable for USD)</span>
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
                <CreditCard className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Payment Schedule</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The remaining payment is taken after completion of the project to your satisfaction.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
                <AlertTriangle className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Cancellation Policy</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If you're unsatisfied, we'll work to improve the project, but the security deposit remains
                  non-refundable for INR payments.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Additional Information</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-2">
                <li>Additional redirect domains can be added for ₹50 / $1 per domain.</li>
                <li>
                  Custom domains (e.g., .com, .in, .org) cost around ₹700-₹900 / $8-$10 annually and are paid directly
                  to the domain registrar.
                </li>
                <li>All prices are exclusive of any applicable taxes based on your country.</li>
                <li>Hosting and SSL certificates are included in all plans at no extra cost.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
