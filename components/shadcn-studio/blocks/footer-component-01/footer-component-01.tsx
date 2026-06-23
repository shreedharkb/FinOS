import { Activity } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-8 md:py-10 bg-background flex flex-col items-center justify-center border-t border-border/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-t-full" />
      
      <div className='flex flex-col items-center justify-center text-center gap-4 max-w-4xl px-6 relative z-10'>
        
        {/* Logo and Name */}
        <a href='/' className="group">
          <div className='flex flex-col items-center space-y-2'>
            <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] bg-[#120F17] transition-all">
              <Activity className="h-5 w-5 text-cyan-400" />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-[0.2em] text-foreground uppercase">FinOS</span>
          </div>
        </a>

        {/* Tagline */}
        <p className="font-serif text-muted-foreground italic text-base md:text-lg tracking-wide mt-1">
          Algorithmic Precision · Modern Finance
        </p>

        {/* Pill Links */}
        <div className='flex flex-wrap items-center justify-center gap-4 mt-2'>
          <a href='#' className='px-6 py-2 rounded-full border border-border/60 bg-[#120F17] text-xs md:text-sm tracking-wider uppercase text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all'>
            Trading
          </a>
          <a href='#' className='px-6 py-2 rounded-full border border-border/60 bg-[#120F17] text-xs md:text-sm tracking-wider uppercase text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all'>
            Analytics
          </a>
          <a href='#' className='px-6 py-2 rounded-full border border-border/60 bg-[#120F17] text-xs md:text-sm tracking-wider uppercase text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all'>
            Tax Harvesting
          </a>
        </div>

        {/* Separator with Diamond */}
        <div className="flex items-center w-full max-w-[280px] mt-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border/80 to-transparent"></div>
          <div className="mx-4 text-cyan-500/80 text-[8px] drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">✦</div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border/80 to-transparent"></div>
        </div>

        {/* Copyright & Creator */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className='text-xs md:text-sm text-muted-foreground/60 tracking-wider'>
            {`© ${new Date().getFullYear()} FinOS Technologies · All Rights Reserved`}
          </p>
          <p className='text-xs md:text-sm text-muted-foreground/50 tracking-wider font-light'>
            Created by <span className="text-cyan-400/80 font-medium tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">Shreedhar K B</span>
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
