'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-background">
      <div className="section-shell py-3">
        <ol className="flex min-h-8 items-center text-xs font-semibold uppercase tracking-[0.08em]">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-2 size-3.5 text-muted-foreground" aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href} className="flex min-h-8 items-center text-primary hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-muted-foreground">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
