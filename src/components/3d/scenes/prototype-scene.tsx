"use client";

import { useEffect } from "react";
import { useControls } from "leva";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";
import { SceneLighting } from "../scene-lighting";
import { Pins } from "@/components/3d/assets/pins";
import { BALL_RADIUS_METERS } from "@/lib/constants";
import { useScene } from "@/lib/scene-context";

export function PrototypeScene() {
  const { sceneParams } = useScene();

  const [{ showStrikePath, highlightRow, ballColor }, set] = useControls(
    "Prototype",
    () => ({
      showStrikePath: {
        value: false,
        label: "Ball's Strike Path",
      },
      highlightRow: {
        value: "None",
        options: ["None", "Row 1", "Row 2", "Row 3", "Row 4"],
        label: "Highlight Row",
      },
      ballColor: { value: "#2563eb", label: "Ball Color" },
    })
  );

  // Sync SceneCue context params into Leva
  useEffect(() => {
    const updates: Record<string, number | boolean | string> = {};
    if (sceneParams.showStrikePath !== undefined)
      updates.showStrikePath = sceneParams.showStrikePath;
    if (sceneParams.highlightRow !== undefined)
      updates.highlightRow = sceneParams.highlightRow;
    if (sceneParams.ballColor !== undefined)
      updates.ballColor = sceneParams.ballColor;
    if (Object.keys(updates).length > 0) set(updates);
  }, [sceneParams, set]);

  // Pin numbers the ball directly contacts for a right-handed strike
  const strikePathPins = [1, 3, 5, 9];

  // Highlight map per row
  const rowPins: Record<string, number[]> = {
    None: [],
    "Row 1": [1],
    "Row 2": [2, 3],
    "Row 3": [4, 5, 6],
    "Row 4": [7, 8, 9, 10],
  };

  const highlight = showStrikePath ? strikePathPins : rowPins[highlightRow as string];
  const dim = showStrikePath ? [2, 4, 6, 7, 8, 10] : [];

  return (
    <>
      <SceneLighting accentColor={ballColor} />

      {/* Ball at foul line position, spinning gently */}
      <group position={[0, 0, 0]}>
        <BowlingBall rpm={300} color={ballColor} />
      </group>

      {/* Pin deck offset on -Z to simulate "down the lane".
          Not to scale — real 60ft lane would push pins out of frame.
          1.5m offset keeps both ball and pins in view. */}
      <group position={[0, -BALL_RADIUS_METERS, -1.5]}>
        <Pins highlight={highlight} dim={dim} />
      </group>

      {/* Ground shadow for the ball */}
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

      {/* Ground shadow for the pin deck */}
      <ContactShadows
        position={[0, -BALL_RADIUS_METERS, -1.5]}
        opacity={0.4}
        scale={2.5}
        blur={2.5}
        far={0.6}
        resolution={256}
        frames={1}
        color="#000000"
      />

      <OrbitControls
        enablePan={false}
        minDistance={0.5}
        maxDistance={3.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, -0.1, -0.7]}
      />
    </>
  );
}
