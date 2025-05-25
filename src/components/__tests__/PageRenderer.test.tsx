// filepath: c:\Users\mmiya\Desktop\system_dev\blogBuilder_microCms_mya\src\components\__tests__\PageRenderer.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PageRenderer from '../PageRenderer';
import * as registry from '../registry';
import { Page } from '@/schemas/page';

// モック
jest.mock('../registry', () => ({
  resolveComponent: jest.fn(),
}));

// サンプルページデータ
const mockPage: Page = {
  id: 'page1',
  title: 'テストページ',
  slug: {
    slug: 'test-page',
    fieldId: 'slug1'
  },
  sections: [
    {
      id: 'section1',
      type: 'hero',
      content: {
        title: 'ヒーロータイトル',
      },
    },
    {
      id: 'section2',
      type: 'textBlock',
      content: {
        body: 'テキスト内容',
        alignment: 'left',
      },
    },
  ],
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

// モックコンポーネント - propsの形式を修正
const MockHero = ({ title }: { title: string }) => (
  <div data-testid="hero-component">{title}</div>
);

const MockTextBlock = ({ body }: { body: string }) => (
  <div data-testid="text-component">{body}</div>
);

describe('PageRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('正しくセクションをレンダリングする', () => {
    // モックの設定
    const resolveComponentMock = registry.resolveComponent as jest.Mock;
    resolveComponentMock.mockImplementation((type: string) => {
      if (type === 'hero') return MockHero;
      if (type === 'textBlock') return MockTextBlock;
      return null;
    });
    
    // コンポーネントのレンダリング
    render(<PageRenderer page={mockPage} />);
    
    // アサーション
    expect(screen.getByTestId('hero-component')).toHaveTextContent('ヒーロータイトル');
    expect(screen.getByTestId('text-component')).toHaveTextContent('テキスト内容');
    expect(resolveComponentMock).toHaveBeenCalledTimes(2);
  });
  
  test('未知のセクションタイプを処理する', () => {
    // モックの設定
    const resolveComponentMock = registry.resolveComponent as jest.Mock;
    resolveComponentMock.mockReturnValue(null);
    
    // 未知のセクションタイプを含むページ
    const pageWithUnknownSection: Page = {
      ...mockPage,
      sections: [
        {
          id: 'unknown1',
          // TypeScriptエラーを回避するための型アサーション
          type: 'unknown' as any, 
          content: {} as any,
        },
      ],
    };
    
    // コンポーネントのレンダリング
    render(<PageRenderer page={pageWithUnknownSection} />);
    
    // アサーション - 不明なコンポーネントタイプのメッセージが表示されることを確認
    expect(screen.getByText(/サポートされていないコンポーネントタイプ: unknown/)).toBeInTheDocument();
  });
});