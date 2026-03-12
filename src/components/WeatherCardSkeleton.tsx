const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const WeatherCardSkeleton = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden w-full relative">
      <div className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-gray-300 animate-pulse" />
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
          <Skeleton className="h-5 w-28 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} data-testid="advanced-info-skeleton" className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="w-4 h-4" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
