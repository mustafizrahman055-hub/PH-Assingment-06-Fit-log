import { Workout } from "@/types";

interface MyPlanCardsProps {
  list: Workout[];
  tab: "plan" | "saved";
}

export default function MyPlanCards({ list, tab }: MyPlanCardsProps) {
  return (
    <div>
      {/* Cards will be implemented in step 9 */}
    </div>
  );
}
