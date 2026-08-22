import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const quickLinks = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Doctors', '/doctors'],
  ['Gallery', '/gallery'],
  ['Contact', '/#contact'],
];

const departments = ['General medicine', 'Surgical care', 'Paediatrics', 'Orthopaedics'];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08171c] text-white">
      <div className="section-shell py-14 sm:py-16">
        <div className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1.35fr_0.65fr_0.8fr_1.2fr]">
          <div>
            <p className="text-xl font-bold">Team Inspire Care</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Multispeciality Hospital</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              Compassionate, coordinated healthcare for patients and families across Mira Road and Thane.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white/45">Navigate</h2>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(([label, href]) => <li key={label}><Link href={href} className="inline-flex min-h-9 items-center text-sm text-white/75 hover:text-white hover:underline">{label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white/45">Departments</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              {departments.map((department) => <li key={department} className="min-h-9 py-1.5">{department}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white/45">Contact</h2>
            <div className="mt-5 space-y-5 text-sm">
              <a href="tel:+919167133346" className="group flex items-start gap-3 text-white/75 hover:text-white"><Phone className="mt-0.5 size-4 shrink-0" /><span><span className="block text-xs text-white/45">24/7 emergency</span><span className="mt-0.5 block font-bold">+91 91671 33346</span></span><ArrowUpRight className="ml-auto size-4 opacity-50" /></a>
              <a href="mailto:contact@teaminspirecare.com" className="flex items-start gap-3 text-white/75 hover:text-white"><Mail className="mt-0.5 size-4 shrink-0" /><span className="break-all">contact@teaminspirecare.com</span></a>
              <p className="flex items-start gap-3 text-white/60"><MapPin className="mt-0.5 size-4 shrink-0" />Mira Road (E), Thane 401107</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Team Inspire Care. All rights reserved.</p>
          <p>Care information on this website does not replace medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
