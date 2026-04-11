"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Float } from "@react-three/drei";
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
  color = "#2563eb",
  showAxis = false,
  radius = BALL_RADIUS_METERS,
}: BowlingBallProps) {
  const spinGroupRef = useRef<THREE.Group>(null);
  const axisLength = radius * 1.8;
  const tiltRad = degreesToRadians(axisTilt);

  useFrame((_, delta) => {
    if (!spinGroupRef.current) return;
    // Visual speed is scaled so the difference between 150 and 600 RPM
    // is clearly visible without 600 becoming an unreadable blur.
    // Maps ~150 RPM to ~0.5 rev/s and ~650 RPM to ~3 rev/s visually.
    const visualRevsPerSec = 0.3 + (rpm / 650) * 2.7;
    const visualRadsPerSec = visualRevsPerSec * Math.PI * 2;
    spinGroupRef.current.rotation.z += visualRadsPerSec * delta;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.15}
      floatingRange={[-0.005, 0.005]}
    >
      <group rotation={[tiltRad, 0, 0]}>
        {/* Everything inside this group spins together */}
        <group ref={spinGroupRef}>
          {/* Ball surface */}
          <mesh castShadow>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhysicalMaterial
              color={color}
              roughness={0.15}
              metalness={0.08}
              clearcoat={1.0}
              clearcoatRoughness={0.12}
              envMapIntensity={1.2}
            />
          </mesh>

          {/* Finger holes — rotate WITH the ball */}
          <FingerHoles radius={radius} />

          {/* Equator stripe — makes rotation visible at any speed */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius * 1.001, radius * 0.008, 8, 64]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.3}
              metalness={0.0}
              opacity={0.35}
              transparent
              clearcoat={0.5}
              clearcoatRoughness={0.2}
            />
          </mesh>

          {/* Weight block marker (pin dot) — bright dot visible during spin */}
          <mesh position={[0, radius * 0.7, -radius * 0.71]}>
            <sphereGeometry args={[radius * 0.035, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
        </group>

        {/* Axis line — does NOT spin (shows fixed rotation axis) */}
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
    </Float>
  );
}

function FingerHoles({ radius }: { radius: number }) {
  const holeRadius = radius * 0.07;
  const holeDepth = radius * 0.15;
  const holeOffset = radius * 0.35;

  return (
    <group position={[0, radius * 0.15, -radius * 0.85]}>
      <mesh position={[-holeOffset * 0.5, holeOffset * 0.3, 0]}>
        <cylinderGeometry args={[holeRadius, holeRadius, holeDepth, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      <mesh position={[holeOffset * 0.5, holeOffset * 0.3, 0]}>
        <cylinderGeometry args={[holeRadius, holeRadius, holeDepth, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      <mesh position={[0, -holeOffset * 0.4, 0]}>
        <cylinderGeometry args={[holeRadius * 1.2, holeRadius * 1.2, holeDepth, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
    </group>
  );
}
