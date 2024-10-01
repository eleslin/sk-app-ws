import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="min-h-screen flex flex-col gap-8 items-center justify-center sm:items-start">
        <Link href="/routines">Enter</Link>
      </main>
    </div>
  );
}
