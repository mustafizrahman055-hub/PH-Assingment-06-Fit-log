"use client";

import { useState } from "react";
import Link from "next/link";
import { Workout } from "@/types";
import { Clock, Flame, Star, Check, X, ArrowRight } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import toast from "react-hot-toast";

interface MyPlanCardsProps {
  list: Workout[];
  tab: "plan" | "saved";
}

export default function MyPlanCards({ list, tab }: MyPlanCardsProps) {
  const { removeFromPlan, removeFromSaved } = useWorkout();
  const [doneItems, setDoneItems] = useState<Set<number>>(new Set());

  const handleRemove = (id: number, name: string) => {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    toast.success(`${name} removed from ${tab === "plan" ? "plan" : "saved"}.`);
  };

  const handleMarkDone = (id: number, name: string) => {
    setDoneItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        toast.success(`Great job! ${name} marked as done.`);
      }
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {list.map((workout) => {
        const isDone = doneItems.has(workout.id);
        return (
          <div 
            key={workout.id} 
            className={`bg-slate-900 border ${isDone ? 'border-green-500/50' : 'border-slate-800'} rounded-3xl overflow-hidden flex flex-col transition-colors relative group`}
          >
            {isDone && (
              <div className="absolute top-4 left-4 z-10 bg-green-500 text-slate-950 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <Check size={14} /> DONE
              </div>
            )}
            <button 
              onClick={() => handleRemove(workout.id, workout.name)}
              className="absolute top-4 right-4 z-10 bg-slate-950/80 text-slate-400 p-2 rounded-full hover:text-red-500 hover:bg-slate-900 transition-colors backdrop-blur opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <X size={16} />
            </button>

            <div className="h-48 relative overflow-hidden bg-slate-800">
              <img 
                src={workout.image} 
                alt={workout.name} 
                className={`w-full h-full object-cover transition-transform duration-500 ${isDone ? 'opacity-50 grayscale' : ''}`}
              />
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <h3 className={`text-2xl font-display uppercase font-bold mb-2 ${isDone ? 'text-slate-400' : ''}`}>{workout.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{workout.equipment}</p>
              
              <div className="flex items-center justify-between text-sm font-medium border-t border-slate-800 pt-4 mb-6">
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

              <div className="flex gap-2 mt-auto">
                <Link 
                  href={`/workout/${workout.id}`}
                  className="flex-1 bg-slate-800 text-slate-200 font-bold py-2.5 rounded-xl flex items-center justify-center text-sm hover:bg-slate-700 transition-colors"
                >
                  DETAILS
                </Link>
                {tab === "plan" && (
                  <button 
                    onClick={() => handleMarkDone(workout.id, workout.name)}
                    className={`flex-1 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-sm transition-colors ${
                      isDone 
                        ? 'bg-transparent border border-green-500/30 text-green-500 hover:bg-green-500/10' 
                        : 'bg-accent text-slate-950 hover:bg-accent/90'
                    }`}
                  >
                    <Check size={16} />
                    {isDone ? 'COMPLETED' : 'MARK DONE'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
