import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

// 動的インポートの設定
const componentMap: Record<string, ComponentType<any>> = {
  hero: dynamic(() => import('./sections/Hero'), {
    loading: () => <div className="loading-placeholder h-96">Loading Hero...</div>,
  }),
  textBlock: dynamic(() => import('./sections/TextBlock'), {
    loading: () => <div className="loading-placeholder h-60">Loading Text Block...</div>,
  }),
  gallery: dynamic(() => import('./sections/Gallery'), {
    loading: () => <div className="loading-placeholder h-80">Loading Gallery...</div>,
  }),
  // 必要に応じて他のコンポーネントを追加
};

// コンポーネント解決関数
export function resolveComponent(type: string): ComponentType<any> | null {
  return componentMap[type] || null;
}

// 利用可能なコンポーネントタイプの取得
export function getAvailableComponentTypes(): string[] {
  return Object.keys(componentMap);
}