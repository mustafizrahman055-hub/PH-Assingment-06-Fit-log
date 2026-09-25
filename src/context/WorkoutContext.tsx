"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types";

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  isMounted: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const localPlan = localStorage.getItem("fitlog-plan");
    const localSaved = localStorage.getItem("fitlog-saved");
    
    if (localPlan) setPlan(JSON.parse(localPlan));
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, isMounted]);

  const addToPlan = (workout: Workout) => {
    setPlan((prev) => {
      if (prev.find((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const addToSaved = (workout: Workout) => {
    setSaved((prev) => {
      if (prev.find((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <WorkoutContext.Provider value={{ plan, saved, addToPlan, removeFromPlan, addToSaved, removeFromSaved, isMounted }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
