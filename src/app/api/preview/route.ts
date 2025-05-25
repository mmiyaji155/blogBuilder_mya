import { NextRequest, NextResponse } from 'next/server';
import { fetchPageBySlug } from '@/lib/api/pages';

export async function GET(request: NextRequest) {
  // URLからパラメータを取得
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const draftKey = searchParams.get('draftKey');
  const secret = searchParams.get('secret');
  
  // パラメータのバリデーション
  if (!slug) {
    return NextResponse.json(
      { message: 'Slug parameter is required' },
      { status: 400 }
    );
  }
  
  if (!draftKey) {
    return NextResponse.json(
      { message: 'Draft key is required' },
      { status: 400 }
    );
  }
  
  // シークレットのバリデーション
  if (secret !== process.env.MICROCMS_PREVIEW_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }
  
  // ページの存在確認
  const page = await fetchPageBySlug(slug, draftKey);
  
  if (!page) {
    return NextResponse.json(
      { message: 'Page not found' },
      { status: 404 }
    );
  }
  
  // プレビューモードの有効化とリダイレクト
  const response = NextResponse.redirect(new URL(`/${slug}`, request.url));
  response.cookies.set('microcms-preview', draftKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 30, // 30分間有効
  });
  
  return response;
}