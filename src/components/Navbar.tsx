"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isMounted } = useWorkout();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <Dumbbell className="text-accent" />
        <Link href="/" className="text-2xl font-display uppercase tracking-wider font-bold">
          FitLog
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link 
          href="/" 
          className={`hover:text-accent transition-colors ${pathname === "/" ? "text-accent" : "text-slate-300"}`}
        >
          Workout
        </Link>
        <Link 
          href="/my-plan" 
          className={`hover:text-accent transition-colors ${pathname === "/my-plan" ? "text-accent" : "text-slate-300"}`}
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/my-plan" className="flex items-center gap-2 border border-slate-700 rounded-full px-4 py-1.5 text-sm hover:border-slate-500 transition-colors">
          <span>Saved</span>
          <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">
            {isMounted ? saved.length : 0}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 bg-accent text-slate-950 font-medium rounded-full px-4 py-1.5 text-sm hover:bg-accent/90 transition-colors">
          <span>Plan</span>
          <span className="bg-slate-950 text-accent text-xs px-2 py-0.5 rounded-full">
            {isMounted ? plan.length : 0}
          </span>
        </Link>
      </div>
    </nav>
  );
}
