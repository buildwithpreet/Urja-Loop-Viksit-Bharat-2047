import { Quote, Star, UserCheck } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Urban Planner, Smart Cities",
    quote: "UrjaLoop has redefined municipal efficiency. The real-time visibility into bin fill-rates alone has reduced our fuel costs by 42%.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
  },
  {
    name: "Priya Sharma",
    role: "Verified Platinum Citizen",
    quote: "The interface is so clean. Earning Urja Credits for simple waste segregation makes sustainability feel like a reward, not a chore.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    name: "Gurpreet Singh",
    role: "Farmer Hub Lead, Punjab",
    quote: "Turning agri-waste into credits is a game-changer for our village. We no longer see crop stubble as a problem, but as a resource.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gurpreet"
  }
]

export function LandingTestimonials() {
  return (
    <section className="py-32 px-6 md:px-10 bg-muted/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] -translate-y-1/2 rounded-full" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
              <UserCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Citizen Voices</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Trusted by <span className="text-primary italic">125K+</span> Users.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {TESTIMONIALS.map((t, i) => (
             <div key={i} className="flex flex-col p-10 rounded-[2.5rem] bg-card border border-border/50 shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                <Quote size={40} className="text-primary opacity-20 mb-8" />
                <p className="text-lg font-medium leading-relaxed text-foreground/90 mb-10 flex-1 italic">
                   "{t.quote}"
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-border/50">
                   <div className="w-12 h-12 rounded-2xl overflow-hidden bg-muted border-2 border-background shadow-lg">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black uppercase tracking-tight text-foreground">{t.name}</h4>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{t.role}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Rating Summary */}
        <div className="mt-20 flex flex-col items-center gap-6">
           <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
           </div>
           <p className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">
             4.9/5 RATING ACROSS ALL PLATFORMS
           </p>
        </div>
      </div>
    </section>
  )
}
