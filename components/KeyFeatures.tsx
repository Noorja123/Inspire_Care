import { Clock3, Siren, Stethoscope, TestTube2 } from 'lucide-react';

const features = [
  { icon: Stethoscope, title: 'Specialist-led', description: 'Experienced clinicians across key disciplines.' },
  { icon: Clock3, title: 'Open 24 × 7', description: 'Continuous emergency and inpatient support.' },
  { icon: TestTube2, title: 'Connected diagnostics', description: 'Testing and treatment planned together.' },
  { icon: Siren, title: 'Emergency ready', description: 'Rapid response for urgent clinical needs.' },
];

export default function KeyFeatures() {
  return (
    <section aria-label="Hospital highlights" className="border-b border-border bg-card">
      <div className="section-shell grid md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <article key={feature.title} className={`flex gap-4 py-7 md:px-6 ${index > 0 ? 'border-t border-border md:border-t-0' : ''} ${index % 2 ? 'md:border-l' : ''} ${index > 1 ? 'lg:border-l' : ''}`}>
            <feature.icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="font-sans text-sm font-bold text-foreground">{feature.title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
