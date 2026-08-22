'use client';

import { useState } from 'react';
import { ArrowUpRight, Loader2, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = 'mt-2 h-12 rounded-md border-input bg-background px-4 text-base focus-visible:border-primary focus-visible:ring-0';

  return (
    <section id="contact" className="bg-primary py-20 text-primary-foreground sm:py-24">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/65 before:h-px before:w-10 before:bg-current">Contact</p>
            <h2 className="section-title text-white">A clear next step for your care.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/70 lg:justify-self-end">
            Ask a question, request help choosing a department, or book directly with our care team.
          </p>
        </div>

        <div className="grid border border-white/20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col border-b border-white/20 lg:border-b-0 lg:border-r">
            <a href="tel:+919167133346" className="group flex min-h-32 items-center justify-between border-b border-white/20 p-6 transition-colors hover:bg-white/10 sm:p-8">
              <span className="flex items-center gap-4"><Phone className="size-5 text-white/60" /><span><span className="block text-xs font-bold uppercase tracking-[0.15em] text-white/55">Call us</span><span className="mt-1 block text-lg font-bold">+91 91671 33346</span></span></span>
              <ArrowUpRight className="size-5 text-white/55 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <a href="mailto:contact@teaminspirecare.com" className="group flex min-h-32 items-center justify-between border-b border-white/20 p-6 transition-colors hover:bg-white/10 sm:p-8">
              <span className="flex min-w-0 items-center gap-4"><Mail className="size-5 shrink-0 text-white/60" /><span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.15em] text-white/55">Email</span><span className="mt-1 block truncate text-lg font-bold">contact@teaminspirecare.com</span></span></span>
              <ArrowUpRight className="size-5 shrink-0 text-white/55 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <a href="https://maps.google.com/?q=Raj+Antila+CHS+Ltd+Poonam+Garden+SK+Stone+Mira+Road+East+Thane" target="_blank" rel="noopener noreferrer" className="group flex min-h-36 items-center justify-between p-6 transition-colors hover:bg-white/10 sm:p-8">
              <span className="flex items-start gap-4"><MapPin className="mt-1 size-5 shrink-0 text-white/60" /><span><span className="block text-xs font-bold uppercase tracking-[0.15em] text-white/55">Visit</span><span className="mt-1 block max-w-sm font-semibold leading-6">1st Floor, Raj Antila CHS Ltd., Poonam Garden, Mira Road (E), Thane 401107</span></span></span>
              <ArrowUpRight className="size-5 shrink-0 text-white/55 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <div className="mt-auto border-t border-white/20 bg-destructive p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Medical emergency</p>
              <p className="mt-2 text-lg font-bold">Call the 24/7 hotline immediately.</p>
            </div>
          </div>

          <div className="bg-card p-6 text-card-foreground sm:p-8 lg:p-10">
            <div className="mb-8">
              <h3 className="font-sans text-2xl font-bold">Send an enquiry</h3>
              <p className="mt-2 text-sm text-muted-foreground">Fields marked with * are required.</p>
            </div>

            {success && (
              <div role="status" aria-live="polite" className="mb-6 border-l-4 border-secondary bg-secondary/10 p-4 text-sm font-semibold text-foreground">
                Message received. Our team will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-bold">Full name *</label>
                  <Input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-bold">Email address *</label>
                  <Input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className={fieldClass} />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-phone" className="text-sm font-bold">Phone number</label>
                  <Input id="contact-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="text-sm font-bold">Subject *</label>
                  <Input id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} required className={fieldClass} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="contact-message" className="text-sm font-bold">How can we help? *</label>
                  <span className="text-xs tabular-nums text-muted-foreground">{formData.message.length} / 1000</span>
                </div>
                <Textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required maxLength={1000} className="mt-2 min-h-36 rounded-md border-input bg-background p-4 text-base focus-visible:border-primary focus-visible:ring-0" />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? <><Loader2 className="size-4 animate-spin" /> Sending enquiry</> : <><Send className="size-4" /> Send enquiry</>}
              </Button>
            </form>

            <p className="mt-6 flex items-start gap-2 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-secondary" /> Do not include highly sensitive medical details. Our team will collect necessary information securely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
