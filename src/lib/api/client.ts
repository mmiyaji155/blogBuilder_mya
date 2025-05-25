import { createClient } from 'microcms-js-sdk';

// microCMS APIクライアントの初期化
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is not defined');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is not defined');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// プレビュー用APIキーを含むクライアント
export function createPreviewClient(draftKey: string) {
  return createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
    apiKey: process.env.MICROCMS_API_KEY!,
    customFetch: (input, init) => {
      // draftKeyをクエリパラメータに追加
      if (typeof input === 'string') {
        const url = new URL(input);
        url.searchParams.set('draftKey', draftKey);
        return fetch(url.toString(), init);
      }
      return fetch(input, init);
    },
  });
}