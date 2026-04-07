import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

export function rpmToRadsPerSecond(rpm: number): number {
  return (rpm / 60) * Math.PI * 2
}
