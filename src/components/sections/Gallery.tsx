import Image from 'next/image';
import { GallerySection } from '@/schemas/sections';

type GalleryProps = GallerySection['content'];

export default function Gallery({
  heading,
  images,
  layout = 'grid',
}: GalleryProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {heading}
          </h2>
        )}
        
        {layout === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div key={index} className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {layout === 'carousel' && (
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            {images.map((image, index) => (
              <div key={index} className="relative snap-center flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  fill
                  className="object-cover"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {layout === 'masonry' && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative mb-4 break-inside-avoid">
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  width={500}
                  height={300}
                  layout="responsive"
                  className="rounded-lg"
                />
                {image.caption && (
                  <div className="bg-black/60 text-white p-3 rounded-b-lg -mt-1 relative">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}