import { z } from 'zod';
import { sectionSchema } from './sections/index';

// ページスキーマ
export const pageSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.object({
    fieldId: z.string(),
    slug: z.string()
  }),
  // contentフィールドをHTMLとして扱う
  content: z.string().optional(),
  // descriptionフィールドを追加
  description: z.string().optional(),
  // sectionsをオプショナルにする
  sections: z.array(sectionSchema).optional(),
  // thumbnailを追加
  thumbnail: z.object({
    url: z.string(),
    height: z.number(),
    width: z.number(),
  }).optional(),
  // tagsを追加
  tags: z.array(z.any()).optional(),
  // writerを追加
  writer: z.any().nullable().optional(),
  // SEO情報
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
  // 日付関連フィールド
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
}).passthrough(); // 未知のフィールドも許可する

export type Page = z.infer<typeof pageSchema>;