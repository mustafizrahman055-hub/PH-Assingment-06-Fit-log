import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="group relative block bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-accent transition-colors">
      <div className="h-48 overflow-hidden bg-slate-800 relative">
        <img 
          src={workout.image} 
          alt={workout.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {workout.muscleGroups.map(mg => (
            <span key={mg} className="bg-slate-900/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-200">
              {mg}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-display uppercase font-bold mb-2">{workout.name}</h3>
        <p className="text-slate-400 text-sm mb-6">{workout.equipment}</p>
        
        <div className="flex items-center justify-between text-sm font-medium border-t border-slate-800 pt-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock size={16} className="text-accent" />
            <span>{workout.duration}m</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Flame size={16} className="text-accent" />
            <span>{workout.caloriesBurned} cal</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Star size={16} className="text-accent" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
