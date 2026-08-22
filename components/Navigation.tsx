'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock3, Menu, Moon, Phone, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Doctors', href: '/doctors' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };
  const openBooking = () => window.dispatchEvent(new CustomEvent('openBooking'));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="hidden border-b border-primary/20 bg-primary text-primary-foreground md:block">
        <div className="section-shell flex h-9 items-center justify-between text-xs font-semibold tracking-wide">
          <p className="flex items-center gap-2"><Clock3 className="size-3.5" aria-hidden="true" /> OPD hours: 9:00 AM–8:00 PM</p>
          <a href="tel:+919167133346" className="flex min-h-9 items-center gap-2 hover:underline">
            <Phone className="size-3.5" aria-hidden="true" /> 24/7 emergency: +91 91671 33346
          </a>
        </div>
      </div>

      <nav aria-label="Primary navigation" className="bg-card">
        <div className="section-shell flex h-[74px] items-center justify-between gap-6">
          <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="Team Inspire Care home">
            <Image src="/hospital-logo.png" alt="" width={56} height={40} priority className="h-10 w-14 object-contain" />
            <div className="hidden leading-none sm:block">
              <span className="block text-[17px] font-bold tracking-[-0.02em] text-foreground">Team Inspire Care</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Multispeciality Hospital</span>
            </div>
          </Link>

          <div className="hidden items-center self-stretch lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`relative flex min-h-11 items-center px-4 text-sm font-semibold transition-colors duration-200 ${
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                {isActive(item.href) && <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary" />}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {resolvedTheme === 'dark' ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
              </button>
            )}
            <Button size="sm" onClick={openBooking} className="hidden md:inline-flex">Book appointment</Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button type="button" className="flex size-11 items-center justify-center border border-border lg:hidden" aria-label="Open navigation menu">
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(88vw,360px)] border-l border-border bg-card p-0">
                <SheetHeader className="border-b border-border px-6 py-5 text-left">
                  <SheetTitle className="font-sans text-base font-bold">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex min-h-12 items-center border-b border-border px-2 text-base font-semibold ${isActive(item.href) ? 'text-primary' : 'text-foreground'}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="mt-6 w-full" onClick={() => { openBooking(); setIsOpen(false); }}>Book appointment</Button>
                  <a href="tel:+919167133346" className="mt-3 flex min-h-12 items-center justify-center gap-2 border border-destructive text-sm font-bold text-destructive">
                    <Phone className="size-4" /> Emergency call
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
