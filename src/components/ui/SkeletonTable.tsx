"use client";

import React from 'react';

export default function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden animate-pulse">
      <div className="bg-surface-container-high h-12 border-b border-outline-variant" />
      <div className="divide-y divide-outline-variant">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="p-4 flex gap-4">
            {Array.from({ length: cols }).map((_, cIdx) => (
              <div
                key={cIdx}
                className="h-5 bg-surface-container-highest rounded flex-1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
