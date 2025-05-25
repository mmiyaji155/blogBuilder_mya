import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import PageRenderer from '@/components/PageRenderer';
import { fetchPageBySlug, fetchAllPageSlugs } from '@/lib/api/pages';

// 静的パス生成
export async function generateStaticParams() {
  const slugs = await fetchAllPageSlugs();
  return slugs.map(slug => ({ slug }));
}

// 動的メタデータ生成
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const cookieStore = cookies();
  const previewCookie = cookieStore.get('microcms-preview');
  
  const page = await fetchPageBySlug(
    params.slug,
    previewCookie?.value
  );
  
  if (!page) {
    return {
      title: 'ページが見つかりません',
    };
  }
  
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    openGraph: page.seo?.ogImage ? {
      images: [{ url: page.seo.ogImage }],
    } : undefined,
  };
}

// ページコンポーネント
export default async function Page({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const cookieStore = cookies();
  const previewCookie = cookieStore.get('microcms-preview');
  
  const page = await fetchPageBySlug(
    params.slug,
    previewCookie?.value
  );
  
  if (!page) {
    notFound();
  }
  
  return (
    <>
      {previewCookie && (
        <div className="bg-amber-50 border-b border-amber-200 p-2 text-center text-amber-800">
          プレビューモードで表示中です
        </div>
      )}
      
      <header className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">{page.title}</h1>
        </div>
      </header>
      
      <PageRenderer page={page} />
    </>
  );
}