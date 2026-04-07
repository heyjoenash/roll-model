"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { SceneSwitcher } from "./scene-switcher";

export default function SceneCanvas() {
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
        camera={{ position: [0, 0.15, 0.45], fov: 45 }}
        gl={{ antialias: true }}
        style={{ background: "#09090b", width: "100%", height: "100%" }}
      >
        <SceneSwitcher />
      </Canvas>
    </>
  );
}
