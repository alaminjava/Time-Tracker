import React from 'react';
import { TabData } from '../types/tracking';
import { getActivityLevel } from '../utils/activityScoreCalculator';
import { Layout } from 'lucide-react'; // Changed to Layout icon which represents pages/layouts

interface TabTrackerProps {
  tabs: TabData[];
  currentTabId: string;
}

export default function TabTracker({ tabs, currentTabId }: TabTrackerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Active Pages</h3>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`p-4 ${tab.id === currentTabId ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {tab.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {new URL(tab.url).pathname}
                </p>
              </div>
              <div className="ml-4">
                <ActivityScore score={tab.activityScore} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityScore({ score }: { score: number }) {
  const level = getActivityLevel(score);
  const colors = {
    high: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    moderate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level]}`}>
      {score.toFixed(1)}
    </span>
  );
}