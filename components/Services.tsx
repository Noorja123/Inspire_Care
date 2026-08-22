'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  is_active?: boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);

      try {
        const result = await supabase
          .from("services")
          .select("*")
          .order("name");

        console.log("SUPABASE RESULT:", result);

        if (result.error) {
          alert(
            JSON.stringify(
              {
                message: result.error.message,
                details: result.error.details,
                hint: result.error.hint,
                code: result.error.code,
              },
              null,
              2
            )
          );

          throw result.error;
        }

        setServices(result.data ?? []);
      } catch (err) {
        console.log("RAW ERROR:", err);

        if (err instanceof Error) {
          console.log("MESSAGE:", err.message);
          console.log("STACK:", err.stack);
        }

        console.log("STRINGIFIED:", JSON.stringify(err, null, 2));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="border-b border-border bg-background py-20 sm:py-24">
      <div className="section-shell">
        {/* Section Header */}
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Departments</p>
            <h2 className="section-title">
            Comprehensive Medical Services
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
            From preventive care to advanced treatment, each department is connected to diagnostics, inpatient support and specialist referrals.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-blue-400" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services available at the moment</p>
          </div>
        ) : (
          <>
            <div className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col justify-between overflow-hidden border-b border-r border-border bg-card transition-colors duration-200 hover:bg-muted/45"
                >
                  <div>
                    {/* Image */}
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.name}
                        loading="lazy"
                        className="h-48 w-full object-cover grayscale-[15%] transition-[filter] duration-200 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center bg-primary">
                        <Shield className="size-11 text-primary-foreground/45" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-3 p-6">
                      <h3 className="font-sans text-xl font-semibold leading-snug text-foreground">
                        {service.name}
                      </h3>

                      {service.category && (
                        <span className="inline-block border-l-2 border-secondary pl-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {service.category}
                        </span>
                      )}

                      {service.description && (
                        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex border-t border-border pt-4">
                      <Link href="/services" className="flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">
                        Explore service <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-10">
              <Link href="/services">
                <Button size="lg">
                  View All Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
