import React from 'react';
import { Page } from '@/schemas/page';
import { resolveComponent } from './registry';
import ErrorBoundary from './ErrorBoundary';

interface PageRendererProps {
  page: Page;
}

// エラー表示用コンポーネント
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="error-container">
    <h3>コンポーネントの読み込みに失敗しました</h3>
    <p>{error.message}</p>
  </div>
);

export default function PageRenderer({ page }: PageRendererProps) {
  // content プロパティを使用して単一のコンテンツセクションを表示
  if (!page.sections && page.content) {
    return (
      <main className="page-content container mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content }} />
      </main>
    );
  }

  // sections がない場合は何も表示しない、またはデフォルトコンテンツを表示
  if (!page.sections || page.sections.length === 0) {
    return (
      <main className="page-content">
        <div className="empty-page">
          <p>コンテンツがありません</p>
        </div>
      </main>
    );
  }

  // sections がある場合、各セクションに対応するコンポーネントをレンダリング
  return (
    <main className="page-content">
      {page.sections.map((section) => {
        const Component = resolveComponent(section.type);

        if (!Component) {
          return (
            <div key={section.id || Math.random().toString()} className="unsupported-component">
              <p>サポートされていないコンポーネントタイプ: {section.type}</p>
            </div>
          );
        }

        return (
          <ErrorBoundary key={section.id || Math.random().toString()} fallback={<ErrorFallback error={new Error('An error occurred')} />}>
            <Component {...section.content} />
          </ErrorBoundary>
        );
      })}
    </main>
  );
}