"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24">
      <div className="page-container text-center">
        <h1 className="text-6xl font-serif font-bold text-espresso mb-2">Something went wrong.</h1>
        <p className="text-espresso/60 text-lg mb-8">Please try refreshing the page.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-gold font-medium hover:underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
