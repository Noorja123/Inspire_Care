import type { Metadata } from 'next'
import { Newsreader, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import BookingOverlay from '@/components/BookingOverlay'
import EmergencyButton from '@/components/EmergencyButton'
import { ThemeProvider } from '@/components/theme-provider'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Team Inspire Care - Multispeciality Hospital',
  description: 'Team Inspire Care Multispeciality Hospital - Caring with Compassion. Book appointments with top doctors. OPD, ICU, General, Surgical, Gynac, Ortho, Paediatric, Respiratory departments available.',
  openGraph: {
    title: 'Team Inspire Care - Multispeciality Hospital',
    description: 'Professional healthcare services with appointment booking system',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${sourceSans.variable} ${newsreader.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <BookingOverlay />
          <EmergencyButton />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
