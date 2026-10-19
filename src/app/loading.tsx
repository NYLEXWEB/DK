import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-12 h-12 border border-neutral-800 border-t-dk-yellow animate-spin" />
      </div>
      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
        DK DANCE COMPANY • LOADING
      </div>
    </div>
  );
}
