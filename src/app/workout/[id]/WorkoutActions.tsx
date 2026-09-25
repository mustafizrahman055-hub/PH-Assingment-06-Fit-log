"use client";

import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types";
import toast from "react-hot-toast";
import { Check, Plus, Bookmark } from "lucide-react";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { plan, saved, addToPlan, addToSaved } = useWorkout();

  const isPlanFull = plan.length >= 5;
  const isInPlan = plan.some(w => w.id === workout.id);
  const isInSaved = saved.some(w => w.id === workout.id);

  const handleAddPlan = () => {
    if (isInPlan) {
      toast.error("Already in today's plan!");
      return;
    }
    if (isPlanFull) {
      toast.error("You can only add up to 5 lifts for today's plan.");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan!");
  };

  const handleSave = () => {
    if (isInSaved) {
      toast.error("Already saved for later!");
      return;
    }
    addToSaved(workout);
    toast.success("Saved for later!");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={handleAddPlan}
        disabled={isPlanFull && !isInPlan}
        className="flex-1 flex items-center justify-center gap-2 bg-accent text-slate-950 font-bold px-8 py-4 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isInPlan ? <Check size={20} /> : <Plus size={20} />}
        {isInPlan ? "ADDED TO PLAN" : "ADD TO TODAY'S PLAN"}
      </button>

      <button
        onClick={handleSave}
        className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-slate-700 text-slate-50 font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors"
      >
        {isInSaved ? <Check size={20} /> : <Bookmark size={20} />}
        {isInSaved ? "SAVED" : "SAVE FOR LATER"}
      </button>
    </div>
  );
}
