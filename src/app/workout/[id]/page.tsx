import { notFound } from "next/navigation";
import { Workout } from "@/types";
import { Clock, Flame, Star, Settings, LayoutList, Trophy } from "lucide-react";

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
  if (!res.ok) {
    if (res.status === 404) return notFound();
    throw new Error("Failed to fetch workout");
  }
  
  const workout: Workout = await res.json();

  return (
    <main className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 h-[600px]">
          <img 
            src={workout.image} 
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-5xl font-display uppercase font-bold mb-4">{workout.name}</h1>
            <p className="text-xl text-slate-400">{workout.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups.map(mg => (
              <span key={mg} className="bg-accent/10 text-accent font-bold px-4 py-1.5 rounded-full border border-accent/20">
                {mg}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <Settings size={20} className="text-accent mb-2" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Equipment</span>
              <span className="font-bold">{workout.equipment}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <Trophy size={20} className="text-accent mb-2" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Difficulty</span>
              <span className="font-bold">{workout.difficulty}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <LayoutList size={20} className="text-accent mb-2" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Sets x Reps</span>
              <span className="font-bold">{workout.sets} x {workout.reps}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <Clock size={20} className="text-accent mb-2" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Duration</span>
              <span className="font-bold">{workout.duration}m</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <Flame size={20} className="text-accent mb-2" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Calories</span>
              <span className="font-bold">{workout.caloriesBurned}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <Star size={20} className="text-accent mb-2" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Rating</span>
              <span className="font-bold">{workout.rating}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display uppercase font-bold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-3 text-slate-300">
              {workout.instructions.map((inst, i) => (
                <li key={i} className="pl-2">{inst}</li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </main>
  );
}
