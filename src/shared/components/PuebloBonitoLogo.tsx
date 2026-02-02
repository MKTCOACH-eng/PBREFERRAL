import Image from 'next/image';

export default function PuebloBonitoLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/Pueblo_Bonito_Beyond_Hospitality_RGB.png"
        alt="Pueblo Bonito - Beyond Hospitality"
        width={280}
        height={100}
        className="w-auto h-20 sm:h-24"
        priority
      />
    </div>
  );
}
