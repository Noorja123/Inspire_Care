'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91-253-2333333', '+91-253-2334444'],
      color: 'text-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@teaminspirecare.com', 'appointments@teaminspirecare.com'],
      color: 'text-green-600',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Team Inspire Care Hospital', 'Opposite Ram Mandir, Belgaum Road', 'Belagavi, Karnataka - 590001'],
      color: 'text-pink-600',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['24/7 Emergency Services', 'OPD: 9:00 AM - 8:00 PM', 'Holidays: Available'],
      color: 'text-amber-600',
    },
  ];

  return (
    <>
      <Navigation />
      <main>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />

        {/* Hero Section */}
        <section className="surface-grid border-b border-border bg-background py-16 sm:py-20">
          <div className="section-shell">
            <p className="section-kicker">Contact</p>
            <h1 className="max-w-5xl text-5xl leading-[0.95] text-foreground sm:text-7xl">Get in Touch</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              We&apos;re here to help. Reach out to us with any questions or concerns.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="border border-border bg-card p-6">
                    <Icon className={`${info.color} w-10 h-10 mb-4`} />
                    <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <div className="border border-border bg-card p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                    <p className="text-green-700 font-semibold mb-2">Thank you!</p>
                    <p className="text-green-600">Your message has been received. We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+91-XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Appointment Inquiry</option>
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="complaint">Complaint</option>
                        <option value="billing">Billing Question</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Map & Emergency */}
              <div className="space-y-8">
                {/* Map Placeholder */}
                <div className="overflow-hidden border border-border bg-card p-4">
                  <iframe
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.0548291637667!2d75.34627!3d15.85163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb0e6b1c8e8e8e1%3A0x1e8e8e1c8e8e1e!2sBelagavi%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
                  ></iframe>
                </div>

                {/* Emergency Card */}
                <div className="border border-destructive/35 bg-destructive/10 p-6">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Medical Emergency?</h3>
                  <p className="text-red-600 mb-4">
                    Call our emergency hotline immediately. Our 24/7 ambulance service is always ready.
                  </p>
                  <a
                    href="tel:+9125233333"
                    className="block bg-red-600 text-white text-center py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
                  >
                    <Phone className="mr-2 inline size-5" aria-hidden="true" /> +91-253-2333333
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What is the best time to call for appointments?',
                  a: 'You can call anytime during our OPD hours (9 AM - 8 PM) on weekdays. For emergencies, call 24/7.',
                },
                {
                  q: 'How quickly can I get an appointment?',
                  a: 'Most appointments can be scheduled within 2-3 days. Emergency cases are handled immediately.',
                },
                {
                  q: 'Do you provide home pickup for lab tests?',
                  a: 'Yes, we provide free home sample collection for lab tests. Call us for scheduling.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept cash, cards, UPI, and insurance. Please ask our billing team for details.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="bg-gray-50 p-4 rounded-lg group cursor-pointer">
                  <summary className="font-semibold flex items-center justify-between">
                    {faq.q}
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-muted-foreground mt-3">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
