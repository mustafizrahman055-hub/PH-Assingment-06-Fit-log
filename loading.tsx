import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="text-slate-400 text-lg font-medium">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}
