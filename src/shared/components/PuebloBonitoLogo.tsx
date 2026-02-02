export default function PuebloBonitoLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Sunburst Icon */}
      <div className="relative w-8 h-8 mb-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#C8A882] rounded-full"></div>
        </div>
        {/* Rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-3 bg-[#C8A882] top-0 left-1/2 origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${i * 45}deg)`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Text */}
      <h2 className="text-xl sm:text-2xl font-light tracking-[0.3em] text-[#C8A882] uppercase font-serif">
        Pueblo Bonito
      </h2>
      <p className="text-[10px] tracking-[0.2em] text-[#C8A882] uppercase font-light mt-1">
        Beyond Hospitality
      </p>
    </div>
  );
}
