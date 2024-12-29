import { ActivityLevel } from './activityTypes';

export interface TabData {
  id: string;
  title: string;
  url: string;
  startTime: number;
  activityScore: number;
}

export interface ActivityData {
  timestamp: number;
  type: 'mouse' | 'keyboard';
  details: {
    x?: number;
    y?: number;
    keyCount?: number;
  };
}

export interface SessionData {
  startTime: number;
  endTime: number;
  mouseClicks: number;
  keystrokes: number;
  activeTime: number;
  pageTitle: string;
  url: string;
  activityScore: number;
  tabId: string;
}

export interface ExportData {
  sessions: SessionData[];
  activities: ActivityData[];
}

export type { ActivityLevel } from './activityTypes';