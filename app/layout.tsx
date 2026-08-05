import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import BookingOverlay from '@/components/BookingOverlay'
import EmergencyButton from '@/components/EmergencyButton'
import { ThemeProvider } from '@/components/theme-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Team Inspire Care - Multispeciality Hospital',
  description: 'Team Inspire Care Multispeciality Hospital - Caring with Compassion. Book appointments with top doctors. OPD, ICU, General, Surgical, Gynac, Ortho, Paediatric, Respiratory departments available.',
  generator: 'v0.app',
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
      <body className="font-sans antialiased bg-background text-foreground">
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
