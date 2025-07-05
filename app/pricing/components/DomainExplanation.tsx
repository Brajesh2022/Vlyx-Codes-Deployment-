import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DomainExplanation() {
  return (
    <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardTitle className="text-center text-2xl font-bold text-blue-700 dark:text-blue-300">
              Understanding Domains
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Main Domain</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The main domain is the <strong>primary web address</strong> for your website. It's what users will type
                into their browser to access your site directly.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">Examples:</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-2">
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">yourwebsite.com</code> (Premium
                  custom domain)
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">yourwebsite.in</code> (Premium custom
                  domain)
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">yourwebsite.xyz</code> (Premium
                  custom domain)
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">yourwebsite.blogspot.com</code> (Base
                  Plan domain)
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">yourwebsite.netlify.app</code>{" "}
                  (Netlify Plan domain)
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">yourwebsite.web.app</code> (Web.app
                  Plan domain)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Redirect Domains</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Redirect domains are additional web addresses that automatically forward visitors to your main domain.
                They can be useful for:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1 ml-2">
                <li>Capturing typos or alternate spellings of your domain</li>
                <li>Preserving traffic from old domains if you've rebranded</li>
                <li>Creating memorable shortcuts to specific pages on your site</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                For just ₹50 per redirect domain, you can add multiple entry points to your website, improving
                accessibility and potentially capturing more traffic.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
