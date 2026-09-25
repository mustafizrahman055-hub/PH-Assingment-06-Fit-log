import Library from "@/components/Library";
import { Workout } from "@/types";

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <section className="min-h-[80vh] flex items-center px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-6">
            <span className="text-accent font-bold tracking-widest text-sm uppercase">Workout Library</span>
            <h1 className="text-6xl md:text-8xl font-display uppercase leading-tight">
              TRAIN WITH INTENT.<br />LOG EVERY SET.
            </h1>
            <p className="text-slate-400 text-lg max-w-md">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
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
        <Library initialWorkouts={workouts} />
      </section>
    </main>
  );
}
