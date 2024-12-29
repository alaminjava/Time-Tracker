import { ActivityLevel } from '../types/tracking';

const WEIGHTS = {
  mouse: 0.5,
  keyboard: 0.5,
  idle: 0.2
} as const;

export function calculateActivityScore(
  mouseEvents: number,
  keyboardEvents: number,
  idleTime: number
): number {
  const score = (WEIGHTS.mouse * mouseEvents) +
                (WEIGHTS.keyboard * keyboardEvents) -
                (WEIGHTS.idle * idleTime);
                
  return Math.max(0, Math.min(10, score));
}

export function getActivityLevel(score: number): ActivityLevel {
  if (score <= 2) return 'inactive';
  if (score <= 5) return 'low';
  if (score <= 8) return 'moderate';
  return 'high';
}