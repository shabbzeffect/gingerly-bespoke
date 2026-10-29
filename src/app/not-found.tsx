import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "The page you\u2019re looking for could not be found.",
};

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24">
      <div className="page-container text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-espresso mb-2">404</h1>
        <p className="text-espresso/60 text-lg mb-8">The page you&apos;re looking for isn&apos;t here.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-gold font-medium hover:underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
