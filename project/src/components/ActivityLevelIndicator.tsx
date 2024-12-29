import React from 'react';
import { Activity } from 'lucide-react';
import { ActivityLevel } from '../types/tracking';

const levelColors: Record<ActivityLevel, string> = {
  inactive: 'text-gray-400 dark:text-gray-500',
  low: 'text-yellow-500 dark:text-yellow-600',
  moderate: 'text-blue-500 dark:text-blue-400',
  high: 'text-green-500 dark:text-green-400'
};

const levelDescriptions: Record<ActivityLevel, string> = {
  inactive: 'Minimal interaction',
  low: 'Some engagement',
  moderate: 'Active and productive',
  high: 'Highly engaged'
};

interface ActivityLevelIndicatorProps {
  score: number;
  level: ActivityLevel;
}

export default function ActivityLevelIndicator({ score, level }: ActivityLevelIndicatorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-opacity-20 ${levelColors[level]} bg-current`}>
          <Activity className={`w-6 h-6 ${levelColors[level]}`} />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {score.toFixed(1)}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">/10</span>
          </div>
          <p className={`text-sm font-medium ${levelColors[level]}`}>
            {levelDescriptions[level]}
          </p>
        </div>
      </div>
    </div>
  );
}