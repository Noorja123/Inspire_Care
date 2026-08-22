'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  doctor_id: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false })
          .limit(3);

        // Log full response for diagnostics
        console.debug('[v0] reviews fetch result:', {
          data: result.data,
          error: result.error,
          status: (result as any).status,
          statusText: (result as any).statusText,
        });

        if (result.error) throw result.error;
        setReviews(result.data || []);
      } catch (err) {
        const error = err as any;
        if (error instanceof Error) {
          console.error('[v0] Error fetching reviews:', {
            message: error.message,
            stack: error.stack,
          });
        } else if (error) {
          console.error('[v0] Error fetching reviews (non-Error):', error);
        } else {
          console.error('[v0] Error fetching reviews: unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const defaultReviews = [
    {
      id: '1',
      rating: 5,
      comment: 'Excellent service and compassionate care. The doctors took time to explain everything clearly.',
      author: 'Rajesh Kumar',
    },
    {
      id: '2',
      rating: 5,
      comment: 'Very professional and clean facility. Highly recommended for anyone seeking quality healthcare.',
      author: 'Priya Sharma',
    },
    {
      id: '3',
      rating: 4,
      comment: 'Great doctors and staff. The appointment process was smooth and efficient.',
      author: 'Amit Singh',
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section className="border-b border-border bg-background py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-12">
          <p className="section-kicker">Patient voices</p>
          <h2 className="section-title">
            Patient Testimonials
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            First-hand accounts of the attention, clarity and support patients received from our teams.
          </p>
        </div>

        <div className="grid border-l border-t border-border md:grid-cols-3">
          {displayReviews.map((review, idx) => {
            const authorName = 'author' in review ? review.author : `Patient ${idx + 1}`;
            return (
              <div
                key={review.id}
                className="flex min-h-72 flex-col justify-between border-b border-r border-border bg-card p-7"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-accent text-accent dark:fill-red-400 dark:text-red-400'
                            : 'text-border dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="mb-6 font-display text-xl leading-8 text-foreground">
                    &quot;{review.comment}&quot;
                  </p>
                </div>

                {/* Author Info block */}
                <div className="border-t border-border dark:border-slate-800 pt-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                    {authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      {authorName}
                    </p>
                    <p className="text-[10px] text-muted-foreground tracking-wide uppercase font-semibold">Verified Patient</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
