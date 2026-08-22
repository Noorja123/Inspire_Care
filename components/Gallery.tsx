'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface GalleryItem {
  id: string;
  title?: string | null;
  description?: string | null;
  image_url: string;
  video_url?: string | null;
  category?: string | null;
  display_order?: number;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error('[v0] Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedId]);

  const selected = items.find((item) => item.id === selectedId);

  return (
    <section className="border-b border-border bg-card py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-12">
          <p className="section-kicker">Inside the hospital</p>
          <h2 className="section-title">
            Hospital Gallery
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            A closer look at the spaces, equipment and teams that support your care.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-blue-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Gallery coming soon</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid border-l border-t border-border md:grid-cols-3">
              {items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className="group relative overflow-hidden border-b border-r border-border bg-muted text-left"
                  aria-label={`Open ${item.title || 'hospital gallery image'}`}
                >
                  <div className="relative h-64 bg-gray-200 dark:bg-slate-800">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title || 'Hospital Gallery Image'}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[12%] transition-[filter] duration-200 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-5 pt-16 text-left">
                    <div>
                      {item.title && <p className="text-lg font-bold text-white">{item.title}</p>}
                      {item.category && (
                        <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-[0.14em] text-white/75">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-10">
              <Link href="/gallery">
                <Button size="lg">
                  View All Gallery
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Lightbox Modal */}
            {selected && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                onClick={() => setSelectedId(null)}
                role="dialog"
                aria-modal="true"
                aria-label={selected.title || 'Gallery image'}
              >
                <div
                  className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-border bg-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button (Expanded Touch Target >= 44x44px) */}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center bg-black/70 text-white transition-colors hover:bg-black"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Content */}
                  <div className="flex flex-col flex-1 overflow-auto">
                    {/* Image */}
                    {selected.image_url && (
                      <div className="relative w-full h-96">
                        <img
                          src={selected.image_url}
                          alt={selected.title || 'Hospital Gallery Image'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="p-6 space-y-3">
                      {selected.title && (
                        <h3 className="text-2xl font-bold text-foreground">
                          {selected.title}
                        </h3>
                      )}
                      {selected.category && (
                        <p className="inline-block border-l-2 border-primary pl-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                          {selected.category}
                        </p>
                      )}
                      {selected.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {selected.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
