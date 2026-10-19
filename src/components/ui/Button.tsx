import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: boolean;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon = false,
  external = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 tracking-wider uppercase text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dk-yellow select-none disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-4 py-2.5 text-[11px] gap-1.5",
    md: "px-6 py-3.5 text-xs gap-2",
    lg: "px-8 py-4 text-xs gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-dk-yellow hover:text-black font-semibold",
    secondary:
      "bg-transparent text-white border border-neutral-700 hover:border-dk-yellow hover:text-dk-yellow",
    accent:
      "bg-dk-yellow text-black hover:bg-white hover:text-black font-semibold",
    ghost:
      "bg-transparent text-white hover:text-dk-yellow underline-offset-8 hover:underline p-0 border-none",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    "group",
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
