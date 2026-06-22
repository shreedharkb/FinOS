import Header from "@frontend/components/layout/Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-12">{children}</main>

      {/* Fixed ambient background glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
