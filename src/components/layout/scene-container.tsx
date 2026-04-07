"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const SceneCanvas = dynamic(() => import("./scene-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-background">
      <div className="animate-pulse text-muted-foreground text-sm">
        Loading 3D scene...
      </div>
    </div>
  ),
});

export function SceneContainer() {
  return (
    <div className="relative h-[50vh] lg:h-[55vh] bg-background border-b border-border">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-muted-foreground text-sm">
              Loading...
            </div>
          </div>
        }
      >
        <SceneCanvas />
      </Suspense>
    </div>
  );
}
