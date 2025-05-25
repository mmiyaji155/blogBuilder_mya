import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dynamic Component Site',
  description: 'microCMSとNext.jsで構築された動的コンポーネント構成サイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}