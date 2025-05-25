import { z } from 'zod';

// 基本セクションスキーマ
export const baseSectionSchema = z.object({
  id: z.string(),
  type: z.string(),
});

// Heroセクションスキーマ
export const heroSchema = baseSectionSchema.extend({
  type: z.literal('hero'),
  content: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    backgroundImage: z.string().optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
  })
});

// テキストブロックセクションスキーマ
export const textBlockSchema = baseSectionSchema.extend({
  type: z.literal('textBlock'),
  content: z.object({
    heading: z.string().optional(),
    body: z.string(),
    alignment: z.enum(['left', 'center', 'right']).default('left'),
  })
});

// ギャラリーセクションスキーマ
export const gallerySchema = baseSectionSchema.extend({
  type: z.literal('gallery'),
  content: z.object({
    heading: z.string().optional(),
    images: z.array(z.object({
      url: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    })),
    layout: z.enum(['grid', 'carousel', 'masonry']).default('grid'),
  })
});

// セクション型のユニオン
export const sectionSchema = z.discriminatedUnion('type', [
  heroSchema,
  textBlockSchema,
  gallerySchema,
  // 必要に応じて他のセクションスキーマを追加
]);

// 型エクスポート
export type HeroSection = z.infer<typeof heroSchema>;
export type TextBlockSection = z.infer<typeof textBlockSchema>;
export type GallerySection = z.infer<typeof gallerySchema>;
export type Section = z.infer<typeof sectionSchema>;