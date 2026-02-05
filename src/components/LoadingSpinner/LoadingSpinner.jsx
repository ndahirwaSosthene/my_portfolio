const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/30 rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-bold text-xs">N</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
