import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ActivityData } from '../types/tracking';

interface ActivityChartProps {
  activities: ActivityData[];
}

export default function ActivityChart({ activities }: ActivityChartProps) {
  const processData = () => {
    const timeWindows = activities.reduce((acc: any[], activity) => {
      const minute = Math.floor(activity.timestamp / (1000 * 60)) * 1000 * 60;
      const existing = acc.find(item => item.timestamp === minute);
      
      if (existing) {
        if (activity.type === 'mouse') existing.mouseEvents++;
        if (activity.type === 'keyboard') existing.keyEvents++;
      } else {
        acc.push({
          timestamp: minute,
          mouseEvents: activity.type === 'mouse' ? 1 : 0,
          keyEvents: activity.type === 'keyboard' ? 1 : 0,
        });
      }
      return acc;
    }, []);

    return timeWindows.map(window => ({
      ...window,
      time: new Date(window.timestamp).toLocaleTimeString(),
    }));
  };

  const data = processData();

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Activity Timeline</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mouseEvents" stroke="#8884d8" name="Mouse Events" />
          <Line type="monotone" dataKey="keyEvents" stroke="#82ca9d" name="Keyboard Events" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}