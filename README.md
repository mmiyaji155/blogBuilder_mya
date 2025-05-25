# microCMS + Next.js 動的コンポーネント構成システム

このプロジェクトは、microCMSから取得したコンテンツデータに基づいて、適切なコンポーネントを動的に組み合わせてページを構築するフロントエンドシステムです。Next.jsとTypeScriptを使用し、コードの保守性、拡張性、パフォーマンスを考慮した設計を実現しています。

## 機能

- コンテンツタイプに応じた動的コンポーネント選択・表示
- Zodによるスキーマ駆動型開発
- コンポーネントレジストリによる一元管理
- エラーバウンダリによるコンポーネント単位での障害分離
- プレビュー機能対応
- SEO最適化
- 開発者向けコンポーネントカタログ

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **言語**: TypeScript
- **CMS**: microCMS
- **スタイリング**: Tailwind CSS
- **バリデーション**: Zod
- **テスト**: Jest, React Testing Library

## 始め方

1. リポジトリをクローン:
```bash
git clone <repository-url>
cd microcms-dynamic-site
```

2. 依存パッケージをインストール:
```bash
npm install
```

3. 環境変数を設定:
`.env.local`ファイルを作成し、以下の変数を設定:
```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_PREVIEW_SECRET=your-preview-secret
```

4. 開発サーバーを起動:
```bash
npm run dev
```

## プロジェクト構造

```
src/
├── app/                  # Next.js App Router
│   ├── [slug]/           # 動的ルーティング
│   │   └── page.tsx      # 動的ページコンポーネント
│   ├── api/              # APIルートハンドラ
│   │   └── preview/      # プレビュー機能
│   │       └── route.ts  # プレビューAPIルート
│   └── page.tsx          # ホームページ
├── components/           # UIコンポーネント
│   ├── common/           # 共通コンポーネント
│   ├── sections/         # セクションコンポーネント
│   ├── registry.ts       # コンポーネントレジストリ
│   └── PageRenderer.tsx  # ページレンダリングコンポーネント
├── lib/                  # ユーティリティ関数
│   ├── api/              # API関連
│   │   └── client.ts     # microCMS APIクライアント
│   │   └── pages.ts      # ページデータ取得関数
│   └── utils/            # ユーティリティ関数
├── schemas/              # Zodスキーマ定義
│   ├── sections/         # セクション別スキーマ
│   └── page.ts           # ページスキーマ
└── types/                # 型定義
```

## セクションタイプの追加方法

新しいセクションタイプを追加するには、以下の手順に従ってください：

1. `src/schemas/sections/index.ts`にスキーマを追加
2. `src/components/sections/`に新しいコンポーネントを作成
3. `src/components/registry.ts`のcomponentMapに追加

## コンポーネントカタログの利用

開発環境で`/component-catalog`にアクセスすると、利用可能なすべてのコンポーネントとそのサンプルデータを確認できます。

## テスト

テストを実行するには：

```bash
npm test
```

## マイクロCMSの設定

マイクロCMSでは以下のAPIスキーマを設定してください：

### pagesスキーマ（APIエンドポイント: pages）

- `title`: テキストフィールド（ページタイトル）
- `slug`: テキストフィールド（URLスラッグ）
- `sections`: リピートフィールド（セクション一覧）
  - `type`: セレクトフィールド（hero, textBlock, gallery等）
  - `content`: オブジェクトフィールド（各セクションタイプに応じたフィールド）
- `seo`: オブジェクトフィールド
  - `title`: テキストフィールド
  - `description`: テキストエリア
  - `ogImage`: 画像フィールド

## ライセンス

[MIT License](LICENSE)