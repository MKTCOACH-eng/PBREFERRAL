'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-[#1A2332] text-white">
      {/* Main Footer Content */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Resorts Column */}
            <div>
              <h4 className="text-xl font-serif mb-6 text-[#C8A882]">Nuestros Resorts</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium mb-2">Los Cabos</p>
                  <div className="space-y-1 text-sm text-white/70 pl-3">
                    <p>• Pueblo Bonito Sunset Beach</p>
                    <p>• Pueblo Bonito Pacifica</p>
                    <p>• Pueblo Bonito Rosé</p>
                    <p>• Pueblo Bonito Los Cabos</p>
                    <p>• Montecristo Estates</p>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">Mazatlán</p>
                  <div className="space-y-1 text-sm text-white/70 pl-3">
                    <p>• Pueblo Bonito Emerald Bay</p>
                    <p>• Pueblo Bonito Mazatlán</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-xl font-serif mb-6 text-[#C8A882]">{t('contact')}</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-white font-medium mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Los Cabos
                  </p>
                  <div className="space-y-1 text-sm text-white/70 pl-7">
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +52 (624) 142 9898
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Mazatlán
                  </p>
                  <div className="space-y-1 text-sm text-white/70 pl-7">
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +52 (669) 989 8900
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="flex items-center text-sm text-white/70">
                    <svg className="w-4 h-4 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    referrals@pueblobonito.com
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Column */}
            <div>
              <h4 className="text-xl font-serif mb-6 text-[#C8A882]">Síguenos</h4>
              <p className="text-sm text-white/70 mb-6">
                Síguenos en nuestras redes sociales para estar al tanto de ofertas exclusivas, noticias y más.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.facebook.com/PuebloBonitoResort" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C8A882] flex items-center justify-center transition-all duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="https://twitter.com/PuebloBonito" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C8A882] flex items-center justify-center transition-all duration-200">
                  <span className="sr-only">Twitter/X</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/pueblobonito" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C8A882] flex items-center justify-center transition-all duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="https://www.pinterest.com/pueblobonito" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C8A882] flex items-center justify-center transition-all duration-200">
                  <span className="sr-only">Pinterest</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 00-4.037 23.284c-.053-.478-.01-1.052.126-1.573l.99-4.186s-.253-.506-.253-1.253c0-1.174.682-2.05 1.53-2.05.722 0 1.07.542 1.07 1.19 0 .725-.462 1.81-.7 2.814-.2.844.423 1.533 1.254 1.533 1.505 0 2.518-1.93 2.518-4.218 0-1.739-1.17-3.044-3.3-3.044-2.404 0-3.896 1.79-3.896 3.79 0 .69.202 1.176.51 1.554.144.173.165.243.113.442-.038.147-.126.499-.162.64-.052.203-.21.276-.386.201-1.08-.44-1.583-1.623-1.583-2.948 0-2.19 1.846-4.816 5.508-4.816 2.95 0 4.896 2.135 4.896 4.428 0 3.034-1.69 5.3-4.183 5.3-.838 0-1.626-.456-1.896-0.968l-.528 2.087c-.19.733-.563 1.472-.898 2.053A12 12 0 1012 0z" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/user/PuebloBonitoResort" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C8A882] flex items-center justify-center transition-all duration-200">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#0F1419] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <a href="https://www.pueblobonito.com.mx/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A882] transition-colors">
                Política de privacidad
              </a>
              <span className="text-white/30">•</span>
              <a href="https://www.pueblobonito.com.mx/declaracion-de-accesibilidad" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A882] transition-colors">
                Declaración de accesibilidad
              </a>
              <span className="text-white/30">•</span>
              <a href="https://www.pueblobonito.com.mx/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A882] transition-colors">
                Términos y condiciones
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-white/50 text-center">
              © {new Date().getFullYear()} Pueblo Bonito Resorts. Reservados todos los derechos.
            </div>
            
            {/* Main Site Link */}
            <div>
              <a 
                href="https://www.pueblobonito.com.mx/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-[#C8A882] hover:text-[#B89872] transition-colors font-medium"
              >
                Visita el sitio oficial de Pueblo Bonito
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
