import { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  sectionType?: string;
}

// フォールバックコンポーネント
function DefaultFallback({ sectionType }: { sectionType?: string }) {
  return (
    <div className="p-4 border border-red-300 bg-red-50 rounded-md">
      <p className="text-red-700">
        {sectionType 
          ? `「${sectionType}」セクションの表示中にエラーが発生しました。`
          : 'コンテンツの表示中にエラーが発生しました。'}
      </p>
    </div>
  );
}

export default function ErrorBoundary({
  children,
  fallback,
  sectionType,
}: ErrorBoundaryProps) {  // エラーログ記録関数
  const logError = (error: Error, info: React.ErrorInfo) => {
    console.error('セクションエラー:', { error, componentStack: info.componentStack, sectionType });
    // 本番環境ではエラー監視サービスに送信
  };
    return (
    <ReactErrorBoundary
      FallbackComponent={({ error }: FallbackProps) => (
        fallback || <DefaultFallback sectionType={sectionType} />
      )}
      onError={logError}
    >
      {children}
    </ReactErrorBoundary>
  );
}