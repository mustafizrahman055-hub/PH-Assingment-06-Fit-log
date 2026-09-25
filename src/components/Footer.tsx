import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8 px-8 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-accent" size={20} />
          <span className="text-xl font-display uppercase tracking-wider font-bold text-slate-400">
            FitLog
          </span>
        </div>
        <p className="text-slate-500 text-sm text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
