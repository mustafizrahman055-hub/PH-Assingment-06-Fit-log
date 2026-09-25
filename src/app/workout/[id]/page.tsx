export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="p-8">
      <h1 className="text-4xl font-display uppercase">Workout {id}</h1>
    </main>
  );
}
