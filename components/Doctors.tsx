'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience_years: number;
  qualification: string;
  image_url: string;
  consultation_fee: number;
  bio: string;
  availability?: string;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const parseAvailability = (availabilityStr?: string) => {
    if (!availabilityStr) return [];
    try {
      const availability = JSON.parse(availabilityStr);
      const availableDays: Array<{ day: string; time: string }> = [];
      Object.entries(availability).forEach(([day, schedule]: any) => {
        if (schedule.enabled && schedule.start && schedule.end) {
          availableDays.push({
            day: day.substring(0, 3),
            time: `${schedule.start} - ${schedule.end}`,
          });
        }
      });
      return availableDays;
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setDoctors(data || []);
      } catch (error) {
        console.error('[v0] Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section id="doctors" className="border-b border-border bg-card py-20 sm:py-24">
      <div className="section-shell">
        {/* Section Header */}
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Specialists</p>
            <h2 className="section-title">
            Our Medical Team
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
            Board-certified specialists with extensive experience, committed to delivering exceptional healthcare outcomes.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-blue-400" />
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No doctors available at the moment</p>
          </div>
        ) : (
          <>
            <div className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="group flex flex-col justify-between overflow-hidden border-b border-r border-border bg-card transition-colors duration-200 hover:bg-muted/40"
                >
                  <div>
                    {/* Doctor Image / Avatar */}
                    {doctor.image_url ? (
                      <div className="h-44 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img
                          src={doctor.image_url}
                          alt={doctor.name}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale-[12%] transition-[filter] duration-200 group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div className="h-44 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <div className="flex size-16 items-center justify-center border border-primary/25 bg-primary/10">
                          <span className="text-2xl font-bold text-primary">
                            {doctor.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Doctor Info */}
                    <div className="space-y-3 p-6">
                      <div>
                        <h3 className="font-sans text-lg font-bold leading-tight text-foreground">
                          {doctor.name}
                        </h3>
                        {doctor.specialization && (
                          <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-primary">
                            {doctor.specialization}
                          </p>
                        )}
                      </div>

                      {/* Experience and Qualification */}
                      {doctor.experience_years && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                          {doctor.experience_years}+ years experience
                        </p>
                      )}

                      {/* Availability Schedule */}
                      {doctor.availability && parseAvailability(doctor.availability).length > 0 && (
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Weekly Schedule:</p>
                          <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                            {parseAvailability(doctor.availability).map((schedule, idx) => (
                              <div key={idx} className="text-xs text-slate-600 dark:text-slate-455 flex justify-between gap-2">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{schedule.day}:</span>
                                <span className="text-right text-slate-600 dark:text-slate-400">{schedule.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-10">
              <Link href="/doctors">
                <Button size="lg">
                  View All Specialists
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
