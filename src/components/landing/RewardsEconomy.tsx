import { RefreshCw, Leaf, ShoppingBag, ArrowRight } from "lucide-react"

export function RewardsEconomy() {
   return (
      <section className="py-24 bg-card border-y border-border">
         <div className="max-w-6xl mx-auto px-6 md:px-10">

            <div className="flex flex-col lg:flex-row items-center gap-16">

               <div className="flex-1 w-full order-2 lg:order-1">
                  <div className="bg-background rounded-[3rem] p-12 border border-border flex items-center justify-center relative min-h-[400px]">

                     {/* Circular Diagram */}
                     <div className="relative w-64 h-64">
                        <div className="absolute inset-0 border border-border rounded-full" />

                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-muted border border-neutral-200 dark:border-white/10 p-3 rounded-2xl shadow-xl animate-bounce [animation-duration:3s]">
                           <Leaf className="text-primary" size={24} strokeWidth={1.5} />
                        </div>

                        <div className="absolute bottom-6 -right-4 bg-white dark:bg-muted border border-neutral-200 dark:border-white/10 p-3 rounded-2xl shadow-xl animate-bounce [animation-duration:4s]">
                           <RefreshCw className="text-primary" size={24} strokeWidth={1.5} />
                        </div>

                        <div className="absolute bottom-6 -left-4 bg-white dark:bg-muted border border-neutral-200 dark:border-white/10 p-3 rounded-2xl shadow-xl animate-bounce [animation-duration:3.5s]">
                           <ShoppingBag className="text-primary" size={24} strokeWidth={1.5} />
                        </div>

                        {/* Central Credits Coin */}
                        <div className="absolute inset-0 m-auto w-32 h-32 flex items-center justify-center z-10">
                           <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                           <div className="relative w-full h-full bg-primary text-primary-foreground dark:text-black rounded-full flex flex-col items-center justify-center font-bold shadow-2xl border-4 border-white/20 dark:border-primary/30 backdrop-blur-md">
                              <span className="text-[10px] uppercase tracking-tighter opacity-80 mb-1">Urja</span>
                              <span className="text-xl leading-none">Credits</span>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               <div className="flex-1 order-1 lg:order-2">
                  <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">Urja Economy</p>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-6">
                     Waste isn't trash. <br /> It's a currency.
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                     Every item you dispose of correctly at an UrjaLoop bin generates digital value. Our blockchain-verified economy ensures that your contribution to a cleaner India translates into real-world purchasing power.
                  </p>

                  <ul className="space-y-4 text-foreground font-medium">
                     <li className="flex items-center gap-3">
                        <ArrowRight size={16} className="text-primary" /> Pay for groceries at local partner stores
                     </li>
                     <li className="flex items-center gap-3">
                        <ArrowRight size={16} className="text-primary" /> Offset your municipal property taxes
                     </li>
                     <li className="flex items-center gap-3">
                        <ArrowRight size={16} className="text-primary" /> Fund sustainable farming with agri-credits
                     </li>
                  </ul>
               </div>

            </div>

         </div>
      </section>
   )
}
