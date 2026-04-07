import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center px-6 text-center gap-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Roll Model
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            The interactive 3D bowling encyclopedia. Learn bowling science with
            manipulable visualizations.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/learn/the-release/rev-rate"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium transition-all hover:gap-3"
        >
          Start Learning
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground/60">
          12 chapters of bowling science paired with interactive 3D scenes
        </p>
      </main>
    </div>
  );
}
