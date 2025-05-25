import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/schemas/sections';

type HeroProps = HeroSection['content'];

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
}: HeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center text-center text-white">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {ctaText && ctaLink && (
          <Link 
            href={ctaLink}
            className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-md inline-block hover:bg-blue-50 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}