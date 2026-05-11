import { LayoutDashboard } from "lucide-react"

export function AppExperience() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">Mobile Platform</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
            Your pocket gateway <br className="hidden md:block" />
            to a cleaner India.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Track your impact, manage your Urja Credits, and find the nearest Smart Bin with a seamless, AI-integrated mobile experience designed for everyone.
          </p>
        </div>

        {/* Abstract Mobile Mockups Wrapper */}
        <div className="relative w-full max-w-4xl mx-auto h-[500px] bg-card rounded-[3rem] border border-border shadow-sm flex items-end justify-center overflow-hidden">
           
           {/* Mockup 1 (Left) */}
           <div className="absolute left-[10%] bottom-0 w-64 h-[400px] bg-background border border-border rounded-t-3xl shadow-xl translate-y-12 rotate-[-5deg] p-4 flex flex-col gap-4">
              <div className="w-full h-8 bg-muted rounded-full" />
              <div className="w-full h-32 bg-primary/10 rounded-2xl" />
              <div className="w-full h-16 bg-muted rounded-2xl" />
              <div className="w-full h-16 bg-muted rounded-2xl" />
           </div>

           {/* Mockup 2 (Center - Main) */}
           <div className="relative z-10 w-72 h-[450px] bg-card border border-border rounded-t-3xl shadow-2xl p-4 flex flex-col gap-4">
              {/* Fake Status Bar */}
              <div className="w-full flex justify-between items-center px-2 mb-2">
                <span className="text-[10px] font-bold">9:41</span>
                <div className="w-12 h-3 bg-foreground rounded-full" />
              </div>
              <div className="w-16 h-16 bg-accent rounded-full mx-auto my-4 flex items-center justify-center">
                <LayoutDashboard className="text-primary" size={24} />
              </div>
              <div className="w-3/4 h-6 bg-muted rounded-full mx-auto mb-6" />
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-20 bg-primary/5 rounded-2xl border border-primary/10" />
                <div className="h-20 bg-primary/5 rounded-2xl border border-primary/10" />
              </div>
              <div className="w-full flex-1 bg-muted rounded-2xl" />
           </div>

           {/* Mockup 3 (Right) */}
           <div className="absolute right-[10%] bottom-0 w-64 h-[400px] bg-background border border-border rounded-t-3xl shadow-xl translate-y-12 rotate-[5deg] p-4 flex flex-col gap-4">
              <div className="w-full flex-1 bg-muted rounded-2xl" />
              <div className="w-full h-24 bg-primary text-primary-foreground rounded-2xl p-4 flex flex-col justify-end">
                 <div className="w-20 h-4 bg-white/20 rounded-full" />
              </div>
           </div>

        </div>

      </div>
    </section>
  )
}
