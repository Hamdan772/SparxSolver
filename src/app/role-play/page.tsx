import RolePlayForm from "./role-play-form";

export default function RolePlayPage() {
  return (
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Practice conversations in a safe space. Describe a scenario and your persona to run a simulation and build your confidence.
            </p>
          </div>
          <RolePlayForm />
        </div>
      </main>
  );
}
