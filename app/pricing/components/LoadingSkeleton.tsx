import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-12 w-3/4 max-w-md dark:bg-gray-700" />
            <Skeleton className="h-6 w-full max-w-lg dark:bg-gray-700" />
            <Skeleton className="h-10 w-40 mt-4 rounded-full dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Features skeleton */}
      <div className="w-full py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Skeleton className="h-8 w-64 dark:bg-gray-700" />
            <Skeleton className="h-6 w-full max-w-lg dark:bg-gray-700" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
              {[...Array(8)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-16 w-full rounded-lg dark:bg-gray-700 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing table skeleton */}
      <div className="w-full py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-8">
            <Skeleton className="h-8 w-64 dark:bg-gray-700" />
            <Skeleton className="h-6 w-full max-w-lg dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-[450px] w-full rounded-lg dark:bg-gray-700 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Calculator skeleton */}
      <div className="w-full py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-8">
            <Skeleton className="h-8 w-64 dark:bg-gray-700" />
            <Skeleton className="h-6 w-full max-w-lg dark:bg-gray-700" />
          </div>
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-16 w-full rounded-t-lg dark:bg-gray-700" />
            <div className="space-y-4 p-6">
              <div className="flex justify-between">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full dark:bg-gray-700" />
                ))}
              </div>
              <Skeleton className="h-[400px] w-full rounded-lg dark:bg-gray-700" />
              <div className="flex justify-between">
                <Skeleton className="h-10 w-24 rounded-md dark:bg-gray-700" />
                <Skeleton className="h-10 w-24 rounded-md dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="w-full py-8 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Skeleton className="h-10 w-48 dark:bg-gray-700" />
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Skeleton className="h-8 w-8 rounded-full dark:bg-gray-700" />
              <Skeleton className="h-8 w-8 rounded-full dark:bg-gray-700" />
              <Skeleton className="h-8 w-8 rounded-full dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
