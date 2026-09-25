export default function Home() {
  return (
    <main>
      <section className="min-h-[80vh] flex items-center px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-6">
            <span className="text-accent font-bold tracking-widest text-sm uppercase">Workout Library</span>
            <h1 className="text-6xl md:text-8xl font-display uppercase leading-tight">
              Train with intent.<br />Log every set.
            </h1>
            <p className="text-slate-400 text-lg max-w-md">
              Build your perfect routine from our curated library of exercises. 
              Track your progress and stay consistent.
            </p>
            <a 
              href="#library" 
              className="mt-4 bg-accent text-slate-950 font-bold px-8 py-4 rounded-full hover:bg-accent/90 transition-colors inline-block"
            >
              BROWSE WORKOUTS
            </a>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
              alt="Gym workout" 
              className="w-full h-[600px] object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      <section id="library" className="min-h-screen px-8 py-24 bg-slate-900/50">
        {/* Library section will be added here in step 5 */}
      </section>
    </main>
  );
}
