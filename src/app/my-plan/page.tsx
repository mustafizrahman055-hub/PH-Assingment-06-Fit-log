"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import { Clock, Flame, Dumbbell } from "lucide-react";
import MyPlanCards from "@/components/MyPlanCards";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("duration");
  const { plan, saved, isMounted } = useWorkout();

  const activeList = activeTab === "plan" ? plan : saved;

  const totalExercises = activeList.length;
  const totalMinutes = activeList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = activeList.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  const sortedList = [...activeList].sort((a, b) => {
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.duration - b.duration;
  });

  if (!isMounted) return null;

  return (
    <main className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-display uppercase font-bold mb-4">My Plan</h1>
          <p className="text-slate-400 text-lg">
            Cap of five lifts for today's plan. Train hard, log honest.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <label htmlFor="sort" className="text-sm font-bold text-slate-400 uppercase tracking-wider">Sort by:</label>
          <select 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-slate-50 font-medium outline-none cursor-pointer"
          >
            <option value="duration" className="bg-slate-900">Duration</option>
            <option value="calories" className="bg-slate-900">Calories</option>
            <option value="rating" className="bg-slate-900">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-accent/10 p-4 rounded-xl text-accent">
            <Dumbbell size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-bold tracking-wider uppercase mb-1">Exercises</p>
            <p className="text-3xl font-display font-bold">{totalExercises}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-accent/10 p-4 rounded-xl text-accent">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-bold tracking-wider uppercase mb-1">Minutes</p>
            <p className="text-3xl font-display font-bold">{totalMinutes}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-accent/10 p-4 rounded-xl text-accent">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-bold tracking-wider uppercase mb-1">Calories</p>
            <p className="text-3xl font-display font-bold">{totalCalories}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-800 mb-8">
        <button
          className={`px-8 py-4 font-bold tracking-wide transition-colors border-b-2 ${
            activeTab === "plan" ? "border-accent text-accent" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
          onClick={() => setActiveTab("plan")}
        >
          TODAY'S PLAN ({plan.length})
        </button>
        <button
          className={`px-8 py-4 font-bold tracking-wide transition-colors border-b-2 ${
            activeTab === "saved" ? "border-accent text-accent" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          SAVED ({saved.length})
        </button>
      </div>

      {sortedList.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
          <h2 className="text-3xl font-display uppercase font-bold mb-4">Nothing here yet</h2>
          <p className="text-slate-400 mb-8">Start browsing the library to build your perfect routine.</p>
          <Link href="/" className="bg-accent text-slate-950 font-bold px-8 py-4 rounded-full hover:bg-accent/90 transition-colors inline-block">
            BROWSE WORKOUTS
          </Link>
        </div>
      ) : (
        <MyPlanCards list={sortedList} tab={activeTab} />
      )}
    </main>
  );
}
