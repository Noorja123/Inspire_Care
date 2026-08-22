'use client';

import { Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function EmergencyButton() {
  const pathname = usePathname();
  const emergencyNumber = '+919167133346';
  const emergencyNumberFormatted = `tel:${emergencyNumber}`;

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      href={emergencyNumberFormatted}
      className="fixed bottom-4 right-4 z-40 flex min-h-12 items-center gap-2 border border-white/20 bg-destructive px-4 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-destructive/90 md:hidden"
      title="Emergency Call"
      aria-label="Call the 24/7 emergency number"
    >
      <Phone className="w-5 h-5" />
      <span className="hidden sm:inline">Emergency call</span>
    </a>
  );
}
