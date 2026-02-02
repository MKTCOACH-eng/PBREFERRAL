import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Admin routes that require authentication and admin role
const adminRoutes = ['/admin/dashboard'];

// Owner routes that require authentication
const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First, handle internationalization
  const intlMiddleware = createMiddleware(routing);
  let response = intlMiddleware(request);

  // Check if it's an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.includes(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));

  if (isAdminRoute || isProtectedRoute) {
    // Create a Supabase client
    let supabaseResponse = NextResponse.next({
      request,
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Get locale from pathname (e.g., /es/admin/dashboard -> es)
      const locale = pathname.split('/')[1] || 'es';
      
      // Redirect to login with locale
      const redirectUrl = isAdminRoute 
        ? new URL(`/${locale}/admin/login`, request.url)
        : new URL(`/${locale}/homeowner`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // For admin routes, verify admin role
    if (isAdminRoute) {
      const { data: admin } = await supabase
        .from('admins')
        .select('id, role, team, status')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (!admin) {
        // Not an admin, redirect to homeowner with locale
        const locale = pathname.split('/')[1] || 'es';
        const redirectUrl = new URL(`/${locale}/homeowner`, request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }

    return supabaseResponse;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
