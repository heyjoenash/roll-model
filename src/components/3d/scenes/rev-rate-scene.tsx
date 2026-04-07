"use client";

import { useEffect } from "react";
import { useControls } from "leva";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";
import { useScene } from "@/lib/scene-context";

export function RevRateScene() {
  const { sceneParams } = useScene();

  const [{ rpm, showAxis, ballColor }, set] = useControls("Rev Rate", () => ({
    rpm: { value: 400, min: 150, max: 650, step: 10, label: "RPM" },
    showAxis: { value: false, label: "Show Axis" },
    ballColor: { value: "#1a1a2e", label: "Ball Color" },
  }));

  // Sync context params into Leva when SceneCue fires
  useEffect(() => {
    const updates: Record<string, number | boolean | string> = {};
    if (sceneParams.rpm !== undefined) updates.rpm = sceneParams.rpm;
    if (sceneParams.showAxis !== undefined)
      updates.showAxis = sceneParams.showAxis;
    if (sceneParams.ballColor !== undefined)
      updates.ballColor = sceneParams.ballColor;
    if (Object.keys(updates).length > 0) {
      set(updates);
    }
  }, [sceneParams, set]);

  return (
    <>
      <BowlingBall rpm={rpm} showAxis={showAxis} color={ballColor} />
      <ContactShadows
        position={[0, -0.108, 0]}
        opacity={0.35}
        scale={0.8}
        blur={2.5}
      />
      <OrbitControls
        enablePan={false}
        minDistance={0.2}
        maxDistance={1.0}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
      <Environment preset="studio" />
    </>
  );
}
