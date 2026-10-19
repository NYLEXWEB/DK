"use client";

import React from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, children }: AdminHeaderProps) {
  return (
    <header className="p-6 sm:p-8 border-b border-neutral-900 bg-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </header>
  );
}
