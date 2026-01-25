import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center gap-8 rounded-xl bg-white p-10 text-center shadow-sm dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Uwrite
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400">
          A focused writing workspace with roles, structure, and learning trace.
        </p>

        <div className="flex w-full flex-col gap-4">
          {/* Placeholder login link (we’ll wire auth UI next) */}
          <Link
            href="/login"
            className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Sign in
          </Link>

          {/* Educator route (role protected) */}
          <Link
            href="/educator"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Go to Educator Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
