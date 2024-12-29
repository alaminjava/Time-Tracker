import React, { useState, useEffect } from 'react';
import { Timer, Mouse, Keyboard, Download, Sun, Moon } from 'lucide-react';
import { tracker } from '../utils/activityTracker';
import { tabManager } from '../utils/tabManager';
import { downloadData } from '../utils/exportUtils';
import { SessionData } from '../types/tracking';
import { useTheme } from '../context/ThemeContext';
import { getActivityLevel } from '../utils/activityScoreCalculator';
import ActivityChart from './ActivityChart';
import HistoryTable from './HistoryTable';
import UserProfile from './UserProfile';
import ActivityLevelIndicator from './ActivityLevelIndicator';
import TabTracker from './TabTracker';

export default function Dashboard() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [previousSessions, setPreviousSessions] = useState<SessionData[]>([]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const currentSession = tracker.getSessionData();
      setSessionData(currentSession);
      
      // Update previous sessions
      const savedSessions = JSON.parse(localStorage.getItem('previousSessions') || '[]');
      setPreviousSessions(savedSessions);

      // Update tab activity score
      tabManager.updateCurrentTab({ activityScore: currentSession.activityScore });
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  const handleExport = () => {
    if (sessionData) {
      const allSessions = [...previousSessions, sessionData];
      downloadData({
        sessions: allSessions,
        activities: tracker.getActivities()
      }, 'json');
    }
  };

  if (!sessionData) return null;

  const activityLevel = getActivityLevel(sessionData.activityScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Activity Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-md"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ActivityLevelIndicator 
            score={sessionData.activityScore}
            level={activityLevel}
          />
          <StatCard 
            icon={<Timer className="w-6 h-6 text-blue-500" />}
            title="Active Time"
            value={`${Math.floor(sessionData.activeTime / 1000)}s`}
          />
          <StatCard 
            icon={<Mouse className="w-6 h-6 text-green-500" />}
            title="Mouse Clicks"
            value={sessionData.mouseClicks.toString()}
          />
          <StatCard 
            icon={<Keyboard className="w-6 h-6 text-purple-500" />}
            title="Keystrokes"
            value={sessionData.keystrokes.toString()}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ActivityChart activities={tracker.getActivities()} />
          </div>
          <div className="space-y-6">
            <UserProfile />
            <TabTracker 
              tabs={tabManager.getAllTabs()}
              currentTabId={tabManager.getCurrentTabId()}
            />
          </div>
        </div>

        <div className="mb-8">
          <HistoryTable sessions={[...previousSessions, sessionData]} />
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}