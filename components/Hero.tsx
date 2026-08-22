'use client';

import Link from 'next/link';
import { Activity, ArrowRight, Bone, HeartPulse, Microscope, Phone, ShieldCheck, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

const departments = [
  { name: 'General medicine', icon: Stethoscope },
  { name: 'Surgical care', icon: Microscope },
  { name: 'Orthopaedics', icon: Bone },
  { name: 'Paediatrics', icon: HeartPulse },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-border bg-background">
      <div className="surface-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="section-shell relative py-14 sm:py-18 lg:py-24">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="section-kicker">Mira Road East · Thane</p>
            <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,6.8rem)] leading-[0.88] text-foreground">
              Care, coordinated <span className="italic text-primary">around you.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Specialist consultations, diagnostics, surgery and round-the-clock emergency support—connected by one hospital team.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}>
                Book an appointment <ArrowRight className="size-4" />
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/doctors">Find a specialist</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-3">
              <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-secondary" /> Compassion-led care</p>
              <p className="flex items-center gap-2"><Activity className="size-4 text-secondary" /> Modern diagnostics</p>
              <p className="flex items-center gap-2"><Phone className="size-4 text-destructive" /> 24/7 emergency</p>
            </div>
          </div>

          <aside className="self-end border border-primary/30 bg-primary text-primary-foreground" aria-label="Hospital departments and emergency contact">
            <div className="flex items-start justify-between border-b border-white/20 p-6 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Care directory</p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white">Start with the right team</h2>
              </div>
              <div className="grid size-10 place-items-center border border-white/30 text-2xl font-light" aria-hidden="true">+</div>
            </div>
            <div className="grid sm:grid-cols-2">
              {departments.map((department) => (
                <Link key={department.name} href="/services" className="group flex min-h-28 flex-col justify-between border-b border-white/20 p-5 transition-colors hover:bg-white/10 odd:sm:border-r">
                  <department.icon className="size-5 text-white/70" aria-hidden="true" />
                  <span className="flex items-end justify-between gap-3 font-semibold text-white">
                    {department.name}<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
            <a href="tel:+919167133346" className="flex min-h-20 items-center justify-between gap-4 bg-destructive px-6 py-4 text-white transition-colors hover:bg-destructive/90 sm:px-8">
              <span><span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/75">Medical emergency</span><span className="mt-1 block text-lg font-bold">+91 91671 33346</span></span>
              <Phone className="size-5" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
