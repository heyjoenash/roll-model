import * as THREE from "three";

// USBC bowling pin silhouette, normalized to ~0.38m tall.
// Real pin: 15" tall, 4.766" max body diameter, 1.797" min neck, 2.031" base.
// Profile traces from base (y=0) to top along the Y axis; Lathe revolves around Y.
export const PIN_PROFILE: THREE.Vector2[] = [
  new THREE.Vector2(0, 0),             // base center
  new THREE.Vector2(0.026, 0),         // base edge
  new THREE.Vector2(0.028, 0.01),
  new THREE.Vector2(0.032, 0.04),      // slight taper up
  new THREE.Vector2(0.052, 0.11),      // belly start widening
  new THREE.Vector2(0.060, 0.155),     // max belly (~4.77" diameter)
  new THREE.Vector2(0.055, 0.19),
  new THREE.Vector2(0.042, 0.22),
  new THREE.Vector2(0.030, 0.255),
  new THREE.Vector2(0.023, 0.28),      // neck minimum (~1.8" diameter)
  new THREE.Vector2(0.028, 0.30),      // transition to head
  new THREE.Vector2(0.036, 0.325),
  new THREE.Vector2(0.038, 0.35),      // head peak
  new THREE.Vector2(0.032, 0.375),
  new THREE.Vector2(0.012, 0.382),     // rounded top
  new THREE.Vector2(0, 0.382),         // top center
];

// 10-pin triangle positions, centered on origin.
// Pin 1 at front, rows back toward +Z.
// Real spacing: 12 inches center-to-center (0.3048m).
const SPACING = 0.3048;
const ROW_OFFSET = (SPACING * Math.sqrt(3)) / 2;

export const PIN_POSITIONS: [number, number, number][] = [
  // Row 1 (front)
  [0, 0, 0],                                    // Pin 1
  // Row 2
  [-SPACING / 2, 0, ROW_OFFSET],                // Pin 2
  [SPACING / 2, 0, ROW_OFFSET],                 // Pin 3
  // Row 3
  [-SPACING, 0, ROW_OFFSET * 2],                // Pin 4
  [0, 0, ROW_OFFSET * 2],                       // Pin 5
  [SPACING, 0, ROW_OFFSET * 2],                 // Pin 6
  // Row 4
  [-SPACING * 1.5, 0, ROW_OFFSET * 3],          // Pin 7
  [-SPACING / 2, 0, ROW_OFFSET * 3],            // Pin 8
  [SPACING / 2, 0, ROW_OFFSET * 3],             // Pin 9
  [SPACING * 1.5, 0, ROW_OFFSET * 3],           // Pin 10
];

export const PIN_HEIGHT = 0.382;
