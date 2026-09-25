import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <LoaderCircle size={42} className="text-accent animate-spin" />
      <p className="text-slate-400 font-medium">Loading workouts...</p>
    </main>
  );
}
