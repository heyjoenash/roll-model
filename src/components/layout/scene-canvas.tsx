"use client";

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Leva } from "leva";
import { SceneSwitcher } from "./scene-switcher";
import { PostProcessing } from "@/components/3d/post-processing";

export default function SceneCanvas() {
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio, 2));

  const handleIncline = useCallback(() => {
    setDpr(Math.min(window.devicePixelRatio, 2));
  }, []);

  const handleDecline = useCallback(() => {
    setDpr(1);
  }, []);

  return (
    <>
      <Leva
        collapsed={false}
        flat
        titleBar={{ title: "Controls" }}
        theme={{
          sizes: { rootWidth: "280px" },
          colors: {
            elevation1: "#1a1a2e",
            elevation2: "#16213e",
            elevation3: "#0f3460",
          },
        }}
      />
      <Canvas
        camera={{ position: [0.2, 0.18, 0.38], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={dpr}
        style={{ background: "#09090b", width: "100%", height: "100%" }}
      >
        <PerformanceMonitor
          onIncline={handleIncline}
          onDecline={handleDecline}
          flipflops={3}
        >
          <SceneSwitcher />
          <PostProcessing />
        </PerformanceMonitor>
      </Canvas>
    </>
  );
}
