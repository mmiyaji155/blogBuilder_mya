import { getAvailableComponentTypes } from '@/components/registry';
import dynamic from 'next/dynamic';

// 環境変数によるアクセス制限
const isDevEnvironment = process.env.NODE_ENV === 'development';

// サンプルデータ
const sampleData: Record<string, any> = {
  hero: {
    title: 'ヒーローセクションの例',
    subtitle: 'コンポーネントカタログでプレビューできます',
    backgroundImage: 'https://placehold.co/1200x600',
    ctaText: 'ボタンの例',
    ctaLink: '#',
  },
  textBlock: {
    heading: 'テキストブロックの例',
    body: '<p>これはリッチテキストの例です。<strong>太字</strong>や<em>イタリック</em>などの書式も表示できます。</p><p>複数の段落にも対応しています。</p>',
    alignment: 'left',
  },
  gallery: {
    heading: 'ギャラリーの例',
    images: [
      { url: 'https://placehold.co/600x400', alt: '画像1', caption: 'キャプション1' },
      { url: 'https://placehold.co/600x400', alt: '画像2', caption: 'キャプション2' },
      { url: 'https://placehold.co/600x400', alt: '画像3', caption: 'キャプション3' },
    ],
    layout: 'grid',
  },
};

// カタログコンポーネント
export default function ComponentCatalog() {
  if (!isDevEnvironment) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">アクセス制限</h1>
        <p>このページは開発環境でのみ利用できます。</p>
      </div>
    );
  }
  
  const componentTypes = getAvailableComponentTypes();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">コンポーネントカタログ</h1>
      
      <div className="space-y-12">
        {componentTypes.map((type) => {
          // 動的にコンポーネントをインポート
          const DynamicComponent = dynamic(() => 
            import(`@/components/sections/${type.charAt(0).toUpperCase() + type.slice(1)}`)
          );
          
          return (
            <div key={type} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h2 className="text-xl font-semibold">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </h2>
              </div>
              
              <div className="p-4">
                {sampleData[type] ? (
                  <DynamicComponent {...sampleData[type]} />
                ) : (
                  <div className="p-4 bg-yellow-50 text-yellow-800 rounded">
                    サンプルデータがありません
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 border-t">
                <details>
                  <summary className="cursor-pointer font-medium">
                    サンプルデータ
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-800 text-gray-200 rounded overflow-auto">
                    {JSON.stringify(sampleData[type] || {}, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}