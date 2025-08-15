import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TuHomologación.es - Homologación de Títulos en España',
  description: 'Te guiamos en todo el proceso legal para que tu título extranjero tenga validez en España. Servicios de homologación, convalidación y equivalencia.',
  keywords: 'homologación de títulos, convalidación de estudios, equivalencia de títulos en España, homologar diploma, títulos extranjeros',
  authors: [{ name: 'TuHomologación' }],
  creator: 'TuHomologación',
  publisher: 'TuHomologación',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tuhomologacion.es'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'pt': '/pt',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tuhomologacion.es',
    title: 'TuHomologación.es - Homologación de Títulos en España',
    description: 'Te guiamos en todo el proceso legal para que tu título extranjero tenga validez en España.',
    siteName: 'TuHomologación.es',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TuHomologación.es - Homologación de Títulos en España',
    description: 'Te guiamos en todo el proceso legal para que tu título extranjero tenga validez en España.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
