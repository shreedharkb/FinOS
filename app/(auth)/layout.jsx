export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid-bg flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
