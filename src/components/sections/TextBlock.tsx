import { TextBlockSection } from '@/schemas/sections';
import parse from 'html-react-parser';

type TextBlockProps = TextBlockSection['content'];

export default function TextBlock({
  heading,
  body,
  alignment = 'left',
}: TextBlockProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-${alignment}`}>
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {heading}
            </h2>
          )}
          
          <div className="prose prose-lg max-w-none">
            {parse(body)}
          </div>
        </div>
      </div>
    </section>
  );
}