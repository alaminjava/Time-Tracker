import React from 'react';
import { SessionData } from '../types/tracking';

interface HistoryTableProps {
  sessions: SessionData[];
}

export default function HistoryTable({ sessions }: HistoryTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Session History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Keystrokes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Page</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sessions.map((session, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {new Date(session.startTime).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {Math.floor((session.endTime - session.startTime) / 1000)}s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {session.mouseClicks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {session.keystrokes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {session.pageTitle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}