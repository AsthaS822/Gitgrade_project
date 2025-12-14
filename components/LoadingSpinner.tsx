export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-5 h-5">
        <div className="absolute top-0 left-0 w-full h-full border-2 border-white/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

