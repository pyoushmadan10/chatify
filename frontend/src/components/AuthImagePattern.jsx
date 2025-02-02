"use client"

import { useEffect, useState } from "react"

const AuthImagePattern = ({ title = "Welcome Back!", subtitle = "Sign in to continue your journey" }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Create a flowing animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 9)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const gradientColors = ["from-purple-500 to-pink-500", "from-blue-500 to-teal-500", "from-orange-500 to-red-500"]

  const [gradientIndex, setGradientIndex] = useState(0)

  // Change gradient every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradientColors.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen bg-black pt-28 p-12 relative overflow-hidden">
      {/* Animated background gradient
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColors[gradientIndex]} opacity-10 transition-all duration-1000`}
      />

      Floating circles decoration
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute  aspect-square rounded-2xl bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite linear`,
            }}
          />
        ))}
      </div> */}

      <div className="relative max-w-md text-center z-10">
        {/* Main grid pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8 pt-32">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`relative aspect-square rounded-2xl backdrop-blur-sm transition-all duration-500 
                ${i === activeIndex ? "scale-110 bg-white/20" : "bg-white/10"}
                ${i % 2 === 0 ? "animate-pulse" : ""}
              `}
            >
              <div
                className={`
                absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0
                ${i === activeIndex ? "opacity-100" : ""}
                ${gradientColors[gradientIndex]}
              `}
              />
            </div>
          ))}
        </div>

        {/* Text content with glow effect */}
        <div className="relative space-y-6 text-white pb-8">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            {title}
            <div className="absolute -inset-x-20 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">{subtitle}</p>
        </div>
      </div>

      {/* Add some CSS animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AuthImagePattern

// const AuthImagePattern = ({ title, subtitle }) => {
//     return (
//       <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//         <div className="max-w-md text-center">
//           <div className="grid grid-cols-3 gap-3 mb-8">
//             {[...Array(9)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`aspect-square rounded-2xl bg-primary/10 ${
//                   i % 2 === 0 ? "animate-pulse" : ""
//                 }`}
//               />
//             ))}
//           </div>
//           <h2 className="text-2xl font-bold mb-4">{title}</h2>
//           <p className="text-base-content/60">{subtitle}</p>
//         </div>
//       </div>
//     );
//   };
  
//   export default AuthImagePattern;