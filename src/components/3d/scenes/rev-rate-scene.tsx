"use client";

import { useEffect } from "react";
import { useControls } from "leva";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { BALL_RADIUS_METERS } from "@/lib/constants";
import { BowlingBall } from "../bowling-ball";
import { SceneLighting } from "../scene-lighting";
import { useScene } from "@/lib/scene-context";

export function RevRateScene() {
  const { sceneParams } = useScene();

  const [{ rpm, showAxis, ballColor }, set] = useControls("Rev Rate", () => ({
    rpm: { value: 400, min: 150, max: 650, step: 10, label: "RPM" },
    showAxis: { value: false, label: "Show Axis" },
    ballColor: { value: "#2563eb", label: "Ball Color" },
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
      <SceneLighting accentColor={ballColor} />
      <BowlingBall rpm={rpm} showAxis={showAxis} color={ballColor} />
      <ContactShadows
        position={[0, -BALL_RADIUS_METERS, 0]}
        opacity={0.5}
        scale={0.8}
        blur={2.5}
        far={0.5}
        resolution={256}
        frames={1}
        color="#000000"
      />
      <OrbitControls
        enablePan={false}
        minDistance={0.2}
        maxDistance={1.0}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}
