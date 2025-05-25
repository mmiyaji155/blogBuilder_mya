import { client, createPreviewClient } from './client';
import { pageSchema, Page } from '@/schemas/page';

// スラッグによるページデータ取得
export async function fetchPageBySlug(
  slug: string, 
  draftKey?: string
): Promise<Page | null> {
  try {
    const apiClient = draftKey ? createPreviewClient(draftKey) : client;
    
    const response = await apiClient.get({
      endpoint: 'pages',
      queries: { filters: `slug.slug[equals]${slug}` }  // ネストされたフィールドへのアクセス
    });
    
    // データがない場合
    if (!response.contents.length) return null;
    
    const pageData = response.contents[0];
    console.log('API Response:', JSON.stringify(pageData, null, 2));
    
    // contentフィールドをsectionsに変換（オプション）
    // const transformedData = {
    //   ...pageData,
    //   sections: pageData.sections || []
    // };
    
    // スキーマによるバリデーション
    const validationResult = pageSchema.safeParse(pageData);
    
    if (!validationResult.success) {
      console.error('Page validation failed:', validationResult.error);
      return null;
    }
    
    return validationResult.data;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// すべてのページのスラッグ取得
export async function fetchAllPageSlugs(): Promise<string[]> {
  try {
    const response = await client.get({
      endpoint: 'pages',
      queries: { fields: 'slug', limit: 100 }
    });
    
    // 修正: ネストされた構造に対応
    return response.contents.map((content: any) => {
      // slugがオブジェクトとして返される場合
      if (content.slug && typeof content.slug === 'object' && content.slug.slug) {
        return content.slug.slug;
      }
      // 直接文字列として返される場合（念のため）
      else if (content.slug && typeof content.slug === 'string') {
        return content.slug;
      }
      return '';  // どちらも該当しない場合
    }).filter((slug: string) => slug !== '');  // 空の値を除外
  } catch (error) {
    console.error('Error fetching page slugs:', error);
    return [];
  }
}