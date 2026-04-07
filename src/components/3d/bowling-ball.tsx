"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { BALL_RADIUS_METERS } from "@/lib/constants";
import { degreesToRadians, rpmToRadsPerSecond } from "@/lib/utils";

interface BowlingBallProps {
  rpm?: number;
  axisTilt?: number;
  color?: string;
  showAxis?: boolean;
  radius?: number;
}

export function BowlingBall({
  rpm = 400,
  axisTilt = 15,
  color = "#1a1a2e",
  showAxis = false,
  radius = BALL_RADIUS_METERS,
}: BowlingBallProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ballRef.current) return;
    const radsPerSec = rpmToRadsPerSecond(rpm);
    ballRef.current.rotation.z += radsPerSec * delta;
  });

  const tiltRad = degreesToRadians(axisTilt);
  const axisLength = radius * 1.8;

  return (
    <group ref={groupRef} rotation={[tiltRad, 0, 0]}>
      {/* Main ball — meshPhysicalMaterial for realistic reactive resin look */}
      <mesh ref={ballRef} castShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Finger holes */}
      <FingerHoles radius={radius} />

      {/* Axis line (conditional) */}
      {showAxis && (
        <Line
          points={[
            [0, -axisLength, 0],
            [0, axisLength, 0],
          ]}
          color="#ef4444"
          lineWidth={2}
        />
      )}
    </group>
  );
}

function FingerHoles({ radius }: { radius: number }) {
  const holeRadius = radius * 0.07;
  const holeDepth = radius * 0.15;
  const holeOffset = radius * 0.35;

  return (
    <group position={[0, radius * 0.15, -radius * 0.85]}>
      {/* Middle finger */}
      <mesh position={[-holeOffset * 0.5, holeOffset * 0.3, 0]}>
        <cylinderGeometry args={[holeRadius, holeRadius, holeDepth, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      {/* Ring finger */}
      <mesh position={[holeOffset * 0.5, holeOffset * 0.3, 0]}>
        <cylinderGeometry args={[holeRadius, holeRadius, holeDepth, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      {/* Thumb */}
      <mesh position={[0, -holeOffset * 0.4, 0]}>
        <cylinderGeometry
          args={[holeRadius * 1.2, holeRadius * 1.2, holeDepth, 16]}
        />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
    </group>
  );
}
