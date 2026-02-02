import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],
  
  // Used when no locale matches
  defaultLocale: 'es',
  
  // Always include locale prefix in URLs
  localePrefix: 'always'
})

export const config = {
  matcher: [
    '/',
    '/(en|es)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ],
}
