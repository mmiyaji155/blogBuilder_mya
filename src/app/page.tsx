import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllPageSlugs } from '@/lib/api/pages';

export const metadata: Metadata = {
  title: 'ホーム | Dynamic Component Site',
  description: 'microCMSとNext.jsで構築された動的コンポーネント構成サイト',
};

export default async function Home() {
  const slugs = await fetchAllPageSlugs();
  
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Dynamic Component Site</h1>
      
      <div className="prose prose-lg max-w-none mb-12">
        <p>
          このサイトはmicroCMSとNext.jsで構築された動的コンポーネント構成システムです。
          コンテンツに応じて適切なコンポーネントが動的に組み合わされ、柔軟なページ構成を実現しています。
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">ページ一覧</h2>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link 
              href={`/${slug}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}