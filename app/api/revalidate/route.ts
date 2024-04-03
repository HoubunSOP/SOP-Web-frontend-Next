import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// 手动更新页面
export async function GET(request: NextRequest) {
  // 保险起见，这里可以设置一个安全校验，防止接口被非法调用
  //这里的process.env.NEXT_PUBLIC_UPDATE_SSG名字要与你设置在项目中的环境变量名字相同

  //if (request.query.secret !== process.env.NEXT_PUBLIC_UPDATE_SSG) {
  //  return NextResponse.json(
  //    { data: error, message: 'Invalid token' },
  //    {
  //      status: 401,
  //    }
  //  );
  //}
  const path = request.nextUrl.searchParams.get('path') || '/post/[id]';

  // 这里可以匹配fetch请求中指定的collection变量
  const collection = request.nextUrl.searchParams.get('collection') || 'collection';

  // 触发更新
  revalidatePath(path);
  revalidateTag(collection);

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    cache: 'no-store',
  });
}
