import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="mt-4 text-xl">
        Page not found. The frontend UI has been cleared.
      </p>
      <Link href="/" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Return to Home
      </Link>
    </div>
  );
}
