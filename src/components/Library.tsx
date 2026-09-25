"use client";

import { useState } from "react";
import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

interface LibraryProps {
  initialWorkouts: Workout[];
}

export default function Library({ initialWorkouts }: LibraryProps) {
  const [sortBy, setSortBy] = useState("duration");

  const sortedWorkouts = [...initialWorkouts].sort((a, b) => {
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.duration - b.duration;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-display uppercase font-bold mb-4">
            The Library
          </h2>
          <p className="text-slate-400 text-lg">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <label
            htmlFor="sort"
            className="text-sm font-bold text-slate-400 uppercase tracking-wider"
          >
            Sort by:
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-slate-50 font-medium outline-none cursor-pointer"
          >
            <option value="duration" className="bg-slate-900">
              Duration
            </option>
            <option value="calories" className="bg-slate-900">
              Calories
            </option>
            <option value="rating" className="bg-slate-900">
              Rating
            </option>
          </select>
        </div>
      </div>

      {sortedWorkouts.length === 0 ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-slate-400 text-lg">
            No workouts found. Please refresh the page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}
