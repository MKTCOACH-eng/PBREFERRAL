import Image from 'next/image';

export default function PuebloBonitoLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/Pueblo_Bonito_Beyond_Hospitality_RGB.png"
        alt="Pueblo Bonito - Beyond Hospitality"
        width={400}
        height={140}
        className="w-auto h-28 sm:h-32 lg:h-36"
        priority
      />
    </div>
  );
}
