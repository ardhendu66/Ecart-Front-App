import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { envVariables } from './config/config';

export { default } from 'next-auth/middleware';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith(`/api/`)) {
        if (!req.headers.get("referer")?.includes(envVariables.domainUrl as string)) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)'],
}